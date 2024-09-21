import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setVehicleCondition,
  setVehicleType,
  setProgress,
} from '../../../store/reducers/checker';
import { usersUpdate, vehicleList } from '../../../api/index';
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
  const [errorCondition, setErrorCondition] = useState('');

  const vehicleListGet = async () => {
    const vehicleLists = await vehicleList(dealer_id)
    setVehicles(vehicleLists.data.sold_by_dealer)
  }
  useEffect(() => {
    setErrorCondition('');
    setErrorVehicle('');
    setCondition('');
    setSelect('');
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
    if (pass == 2) {
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
      dispatch(setProgress());

    }
  }

  console.log("this is vehicles===>", vehicles)
  return (
    <div >
      <p className="text-2xl  text-gray-500 mt-2 ml-2">
      <b>  What vehicle are you interested in?</b>
      </p>
      <div className="flex flex-col gap-2 py-2 border border-gray-300 rounded-xl w-full ">
        <div className="w-full flex gap-2 flex-col md:flex-row">
          <div className='w-full flex  px-4 gap-2 rounded-xl'>
            <FormControl>
              {/* <FormLabel id="demo-row-radio-buttons-group-label" style={{ fontSize: '20px',}}>What type of vehicle are you interested in?</FormLabel> */}
              <div className='overflow-y-auto'>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  style={{ margin: '0px 20px', display: 'flex',flexWrap:"wrap" }}
                  onChange={(e) => { setSelect(e.target.value) }}
                >
                  {vehicles.map((item, key) => {
                    return <FormControlLabel key={key} value={item['name']} control={<Radio />} label={item['name']} className='hover:bg-violet-200 w-[180px] border-[1px] border-gray-300 border-solid rounded-xl p-1 m-1 ' />
                  })}
                </RadioGroup>
              </div>
            </FormControl>
          </div>
          {errorVehicle !== '' ? (
            <p className="text-red-500 pt-2">{errorVehicle}</p>
          ) : null}
        </div>
        <div className="w-full flex pl-5">
          <div className="w-full flex  rounded-3xl ">
            <div className="flex flex-col">
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label" style={{ fontSize: '20px' }}>Is this vehicle new or used?</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(e) => { setCondition(e.target.value) }}
                  style={{ margin: '5px 10px', display: 'flex', justifyContent: 'around' }}
                >
                  <FormControlLabel value="New" control={<Radio />} label="New" style={{ width: '40%' }} />
                  <FormControlLabel value="Used" control={<Radio />} label="Used" style={{ width: '40%' }} />
                </RadioGroup>
              </FormControl>
            </div>
            {errorCondition !== '' ? (
              <p className="text-red-500 pl-6 pt-2 ml-5">{errorCondition}</p>
            ) : null}
          </div>
          {/* <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#854fff]  px-5 p-1 rounded-lg text-white text-2xl  hover:bg-purple-800"
            >
            CONTINUE
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
