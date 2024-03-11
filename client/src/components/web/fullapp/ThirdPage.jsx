import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setDealType,
  setQuoteInterest,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const DealType = () => {
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

  const [dealClick, setDealClick] = useState('');
  const [error, setError] = useState(null);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [focusPay, setFocusPay] = useState(false);
  useEffect(() => {
    setError(null);
    setDealClick('');
  }, [step]);

  const handleSubmit = async () => {
    if (dealClick) {
      let interest = year + ' ' + make + ' ' + ' ' + model;
      setYear('');
      setMake('');
      setModel('');
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
      dispatch(setDealType(dealClick));
      dispatch(setQuoteInterest(interest));
    } else {
      setError('You must select one of above methodes.');
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 w-full justify-center items-center">
      <p className="w-2/3 text-4xl mt-44 font-medium">
        What vehicle are you interested in?
      </p>
      <div className="w-2/3 flex flex-col md:flex-row text-justify bg-white rounded-3xl p-5 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="w-full flex flex-col justify-between md:w-[60%] items-center rounded-2xl pl-5">
          <div className='w-full flex justify-between bg-gray-50 items-center p-5 rounded-xl'>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding: '0 5px', fontSize: '18px' }}>What type of vehicle are you interested in?</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={''}
                style={{ margin: '10px 0', display: 'flex', justifyContent: 'around' }}
              >
                <FormControlLabel value="1" control={<Radio />} label="ATV/UTV" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="2" control={<Radio />} label="DirtBike" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="3" control={<Radio />} label="Motocycle" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="4" control={<Radio />} label="Scooter" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="5" control={<Radio />} label="SidebySide" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="6" control={<Radio />} label="WaterCraft" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="7" control={<Radio />} label="Boat" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="8" control={<Radio />} label="RV" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="9" control={<Radio />} label="Tralier" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="10" control={<Radio />} label="Car" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="11" control={<Radio />} label="Truck" style={{ width: '30%', margin: '10px 0' }} />
                <FormControlLabel value="12" control={<Radio />} label="Other" style={{ width: '30%', margin: '10px 0' }} />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="w-full flex flex-col justify-betweenrounded-3xl">
            <TextField
              onFocus={() => { setFocusPay(true) }}
              onBlur={() => { setFocusPay(false) }}
              id="standard-basic"
              variant="standard"
              margin="dense"
              label="What will you down payment be?"
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
            {focusPay && <p className='bg-gray-50 pt-2 rounded-xl'>If no down payment, please type 0.</p>}
            {error !== '' ? (
              <p className="text-red-500 pl-6 pt-2">{error}</p>
            ) : null}
          </div>
        </div>
        <div className="w-full md:w-[40%] flex-col md:mx-10">
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
              <div className="flex flex-col md:flex-row md:justify-between items-center">
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={''}
                    style={{ margin: '10px 0', display: 'flex', justifyContent: 'around' }}
                  >
                    <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding: '0 5px', fontSize: '18px' }}>Is this vehicle new or used?</FormLabel>

                    <FormControlLabel value="1" control={<Radio />} label="New" style={{ width: '30%' }} />
                    <FormControlLabel value="2" control={<Radio />} label="Used" style={{ width: '30%' }} />
                  </RadioGroup>

                </FormControl>
                {/* <label
                htmlFor="radio1"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Finance');
                }}
              >
                <input
                  type="radio"
                  id="radio1"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Finance
              </label>
              <label
                htmlFor="radio2"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Cash');
                }}
              >
                <input
                  type="radio"
                  id="radio2"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Cash
              </label>
              <label
                htmlFor="radio3"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Lease');
                }}
              >
                <input
                  type="radio"
                  id="radio3"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Lease
              </label> */}
              </div>
              {error !== '' ? (
                <p className="text-red-500 pl-6 pt-2">{error}</p>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealType;
