import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setInstantYear,
  setInstantMake,
  setInstantModel,
  setVehicleCondition,
  setVehicleType,
  setPayDown,
} from '../../../store/reducers/checker';
import { usersUpdate, vehicleList } from '../../../api/index';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';

const ThirdPage = () => {

  const { dealer_id } = useParams()
  const {
    step,
    type,
    intentID,
    dealerId,
    deviceIP,
    deviceOS,
    deviceCity,
    deviceCountry,
    deviceState,
    deviceDate,
    deviceLat,
    deviceLon,
    deviceBrowser,
    checkerMobileNumber,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = useState([])
  const [select, setSelect] = useState('')
  const [condition, setCondition] = useState('');
  const [errorVehicle, setErrorVehicle] = useState('');
  const [errorPay, setErrorPay] = useState('');
  const [errorCondition, setErrorCondition] = useState('');
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [pay, setPay] = useState('');
  const [focusPay, setFocusPay] = useState(false);

  const vehicleListGet = async () => {
    const vehicleLists = await vehicleList(dealer_id)
    setVehicles(vehicleLists.data.sold_by_dealer)
  }
  useEffect(() => {
    setErrorPay('');
    setErrorCondition('');
    setErrorVehicle('');
    setCondition('');
    setSelect('');
    setYear('');
    setMake('');
    setModel('');
  }, [step]);

  useEffect(() => {
    vehicleListGet()
  }, [])

  const handleSubmit = async () => {
    let pass = 0;
    if (!select) {
      setErrorVehicle('*Required')
    }
    else {
      pass += 1
    }
    if (!condition) {
      setErrorCondition('*Required')
    } else {
      pass += 1
    }
    if (!pay) {
      setErrorPay('*Required');
    } else if (!/^\d+$/.test(pay)) {
      setErrorPay('*Not supported format');
    } else {
      pass += 1;
    }
    if (pass == 3) {
      dispatch(setInstantYear(year))
      dispatch(setInstantMake(make))
      dispatch(setInstantModel(model))
      dispatch(setPayDown(pay))
      dispatch(setVehicleCondition(condition))
      dispatch(setVehicleType(select))
      const data = {
        dealer_id: dealerId,
        device_ip_address: deviceIP,
        device_operating_system: deviceOS,
        device_browser: deviceBrowser,
        device_type: type,
        device_state: deviceState,
        device_city: deviceCity,
        device_country: deviceCountry,
        device_date_time: deviceDate,
        device_lat: deviceLat,
        device_lon: deviceLon,
        status: 'Started',
        lang: 'EN',
        phone: checkerMobileNumber,
        page: 'Full',
        last_question: '3',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
    }
  }

  console.log("this is vehicles===>", vehicles)
  return (
    <div className="flex flex-col bg-gray-50 w-full justify-center items-center min-w-[600px]">
      <p className="w-2/3 text-4xl mt-44 font-medium">
        What vehicle are you interested in?
      </p>
      <div className="w-2/3 flex flex-col lg:flex-row text-justify bg-white rounded-3xl p-5 pb-10 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="w-full flex flex-col justify-between lg:w-[65%] items-center rounded-2xl pl-5 pt-4">
          <div className='w-full flex justify-between bg-gray-50 items-center py-5 px-2 rounded-xl'>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding: '0 5px', fontSize: '18px', margin: '0 15px' }}>What type of vehicle are you interested in?</FormLabel>
              <div className='h-[30vh] overflow-y-scroll'>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  style={{ margin: '10px 0', display: 'flex', justifyContent: 'center' }}
                  onChange={(e) => { setSelect(e.target.value) }}
                >
                  {vehicles.map((item, key) => {
                    return <FormControlLabel key={key} value={item['name']} control={<Radio />} label={item['name']} className='hover:bg-violet-200 w-[40%] xl:w-[30%] border-[1px] border-gray-300 border-solid rounded-xl p-1 m-1 ' />
                  })}
                </RadioGroup>
              </div>
            </FormControl>
          </div>
          {errorVehicle !== '' ? (
            <p className="text-red-500 pt-2">{errorVehicle}</p>
          ) : null}
          <div className="w-full flex flex-col justify-betweenrounded-3xl">
            <TextField
              onFocus={() => { setFocusPay(true) }}
              onBlur={() => { setFocusPay(false) }}
              id="standard-basic"
              variant="standard"
              margin="dense"
              label="What will you down payment be?"
              fullWidth
              value={pay}
              onChange={(e) => { setPay(e.target.value) }}
              InputProps={{
                style: {
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            {focusPay && <p className='bg-gray-50 pt-2 rounded-xl'>If no down payment, please type 0.</p>}
            {errorPay !== '' ? (
              <p className="text-red-500 pl-6 pt-2">{errorPay}</p>
            ) : null}
          </div>
        </div>
        <div className="w-full flex flex-col justify-between lg:w-[35%] items-center pl-5 pt-4">
          <div className="flex w-full flex-col">
            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              label="Year"
              fullWidth
              value={year}
              onChange={(e) => setYear(e.target.value)}
              InputProps={{
                style: {
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              margin="dense"
              label="Make"
              fullWidth
              value={make}
              onChange={(e) => setMake(e.target.value)}
              InputProps={{
                style: {
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Model"
              fullWidth
              margin="dense"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              type="text"
              InputProps={{
                style: {
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
          </div>
          <div className="w-full flex flex-col justify-between">
            <div className="flex flex-col justify-between bg-gray-50 rounded-3xl mt-4">
              <div className="flex flex-col lg:flex-row lg:justify-between items-center px-5">
                <FormControl>
                  <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding: '0 5px', fontSize: '18px' }}>Is this vehicle new or used?</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => { setCondition(e.target.value) }}
                    style={{ margin: '10px 0', display: 'flex', justifyContent: 'around' }}
                  >
                    <FormControlLabel value="New" control={<Radio />} label="New" style={{ width: '40%' }} />
                    <FormControlLabel value="Used" control={<Radio />} label="Used" style={{ width: '40%' }} />
                  </RadioGroup>
                </FormControl>
              </div>
              {errorCondition !== '' ? (
                <p className="text-red-500 pl-6 pt-2">{errorCondition}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm lg:text-lg mt-4 hover:bg-purple-800"
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
