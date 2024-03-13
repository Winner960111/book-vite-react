'use client';
import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setDriverNumber,
  setDriverDate,
  setDriverState,
  setIDate,
  setIIsuer,
  setIType,
  setUSCitizen,
  setProgress,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SecondPage = () => {
  const {
    step,
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
    type,
    checkerMobileNumber,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errordriverNumber, setErrordriverNumber] = useState('');
  const [errordriverDate, setErrordriverDate] = useState('');
  const [errordriverState, setErrordriverState] = useState('');
  const [erroreDate, setErroreDate] = useState('');
  const [driverNumber, setdriverNumber] = useState('');
  const [driverDate, setdriverDate] = useState('');
  const [driverState, setdriverState] = useState('');
  const [eDate, seteDate] = useState('');
  const [focusdriverNumber, setFocusDriverNumber] = useState(Boolean);
  const [focusdriverDate, setFocusDriverDate] = useState(Boolean);
  const [focusdriverState, setFocusDriverState] = useState(Boolean);
  const [focuseDate, setFocusEDate] = useState(Boolean);
  const [citizen, setCitizen] = useState('Yes')
  const [payType, setPayType] = useState('')
  const [isuer, setIsuer] = useState('')
  const [errorIsuer, setErrorIsuer] = useState('')
  const [errorPayType, setErrorPayType] = useState('')

  // const handlePre = () => {
  //   removeHistory(true)
  // }
  const handleDriverNumber = (e) => {
    setdriverNumber(e.target.value);
    setErrordriverNumber('');
  };
  const handleDriverDate = (e) => {
    setdriverDate(e.target.value);
    setErrordriverDate('');
  };
  const handleDriverState = (e) => {
    setdriverState(e.target.value);
    setErrordriverState('');
  };

  const handleEDate = (e) => {
    seteDate(e.target.value);
    setErroreDate('');
  };
  const handlePayType = (e) => {
    setPayType(e.target.value)
    setErrorPayType('')
  }
  const handleIsuer = (e) => {
    setIsuer(e.target.value)
    setErrorIsuer('')
  }
  useEffect(() => {
    setErrordriverNumber('');
    setErrordriverDate('');
    setErrordriverState('');
    setErroreDate('');
    setCitizen('');
    seteDate('');
    setPayType('');
    setIsuer('');
    setErrorIsuer('');
    setErrorPayType('');
    setErroreDate('');
  }, [step]);

  const handlesubmit = async () => {
    let pass = 0;
    if (!driverNumber) {
      setErrordriverNumber('*field is required');
    } else {
      pass += 1;
    }
    if (!driverDate) {
      setErrordriverDate('*field is required');
    } else {
      pass += 1;
    }
    if (!driverState) {
      setErrordriverState('*field is required');
    } else if (!/^[A-Za-z]+$/.test(driverState)) {
      setErrordriverState('*contains only characters');
    } else {
      pass += 1;
    }
    if (!eDate) {
      setErroreDate('*input your expiration date');
    } else {
      pass += 1;
    }
    if (!payType) {
      setErrorPayType('*Select option')
    } else {
      pass += 1;
    }
    if (payType != 'other' && !isuer) {
      setErrorIsuer('*select option')
    } else {
      pass += 1
    }
    if (pass == 6) {
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
        last_question: '2',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setProgress());
      dispatch(setDriverNumber(driverNumber));
      dispatch(setDriverDate(driverDate));
      dispatch(setDriverState(driverState));
      dispatch(setIDate(eDate));
      dispatch(setIIsuer(isuer));
      dispatch(setIType(payType))
      dispatch(setUSCitizen(citizen))
    }

  }
  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-20 mx-20 z-0">
          <p className="w-full text-4xl my-3 font-medium">
            We need to driver licese and other information.
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-[50%] my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusDriverNumber(true)}
                  onBlur={() => setFocusDriverNumber(false)} // onBlur is triggered when the input loses focus
                  value={driverNumber}
                  onChange={handleDriverNumber}
                  fullWidth
                  autoFocus
                  label="Driver license number"
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px'
                    },
                  }}
                />

                {errordriverNumber !== '' && (
                  <p className="text-red-500 pl-2">{errordriverNumber}</p>
                )}
                {focusdriverNumber && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    please enter as show on your driver licensed.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full md:w-[30%] my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusDriverDate(true)}
                  onBlur={() => setFocusDriverDate(false)} // onBlur is triggered when the input loses focus
                  value={driverDate}
                  onChange={handleDriverDate}
                  fullWidth
                  label=" "
                  type='date'
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px'
                    },
                  }}
                />
                {errordriverDate !== '' && (
                  <p className="text-red-500 pl-2">{errordriverDate}</p>
                )}
                {focusdriverDate && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter driver expieration date.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full md:w-[20%] my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusDriverState(true)}
                  onBlur={() => setFocusDriverState(false)} // onBlur is triggered when the input loses focus
                  value={driverState}
                  onChange={handleDriverState}
                  fullWidth
                  label="State"
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px'
                    },
                  }}
                />
                {errordriverState !== '' && (
                  <p className="text-red-500 pl-2">{errordriverState}</p>
                )}
                {focusdriverState && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter driver license state.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex p-5 justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <FormControl variant="filled" sx={{ m: 1, minwidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '15px' }}>Type</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={payType}
                    onChange={handlePayType}
                  >
                    <MenuItem value={'credit'}>Credit Card</MenuItem>
                    <MenuItem value={'other'}>Other</MenuItem>
                  </Select>
                </FormControl>
                {errorPayType !== '' && (
                  <p className="text-red-500 pl-2">{errorPayType}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
                  <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '15px' }}>isuer</InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={isuer}
                    onChange={handleIsuer}
                  >
                    <MenuItem value=" " style={{ height: '40px' }}>
                      <em>{' '}</em>
                    </MenuItem>
                    <MenuItem value={'visa'}>VISA</MenuItem>
                    <MenuItem value={'mastercard'}>MasterCard</MenuItem>
                    <MenuItem value={'amex'}>AMEX</MenuItem>
                    <MenuItem value={'discover'}>Discover</MenuItem>
                  </Select>
                </FormControl>
                {errorIsuer !== '' && (
                  <p className="text-red-500 pl-2">{errorIsuer}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusEDate(true)}
                  onBlur={() => setFocusEDate(false)} // onBlur is triggered when the input loses focus
                  type="date"
                  value={eDate}
                  onChange={handleEDate}
                  fullWidth
                  label="   "
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px'
                    },
                  }}
                />
                {erroreDate !== '' && (
                  <p className="text-red-500 pl-2">{erroreDate}</p>
                )}
                {focuseDate && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please input Expiration Date.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-[30%] h-16 mx-4 rounded-lg text-white text-xl  hover:bg-purple-800"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};
export default SecondPage;
