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
  setProgress,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

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
  const [driverNumber, setdriverNumbers] = useState('');
  const [driverDate, setdriverDates] = useState('');
  const [driverState, setdriverStates] = useState('');
  const [eDate, seteDate] = useState('');
  const [payType, setPayType] = useState('');
  const [isuer, setIsuer] = useState('');
  const [errorIsuer, setErrorIsuer] = useState('');
  const [errorPayType, setErrorPayType] = useState('');
  const [license, setlicense] = useState(null);
  const [state, setstate] = useState(null);
  const handleDriverNumber = (e) => {
    if (/^[0-9a-zA-Z-]+$/.test(e.target.value) || !e.target.value.trim()) {
      setdriverNumbers(e.target.value);
      setErrordriverNumber('');
    }
  };
  const handleDriverDate = (value) => {
    setErrordriverDate('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 2000 || Number(year) > 2100) {
      setErrordriverDate('*Invalid Date');
    }
    setdriverDates(year + '-' + String(month) + '-' + date);
  };
  const handleDriverState = (e) => {
    setdriverStates(e.target.value);
    setErrordriverState('');
  };

  const handleEDate = (value) => {
    setErroreDate('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 2000 || Number(year) > 2100) {
      setErroreDate('*Invalid Date');
    }
    seteDate(year + '-' + String(month) + '-' + date);
  };
  const handlePayType = (e) => {
    setPayType(e.target.value);
    setErrorPayType('');
  };
  const handleIsuer = (e) => {
    setIsuer(e.target.value);
    setErrorIsuer('');
  };
  useEffect(() => {
    setErrordriverNumber('');
    setErrordriverDate('');
    setErrordriverState('');
    setErroreDate('');
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
      setErrorPayType('*Select option');
    } else {
      pass += 1;
    }
    if (payType != 'other' && !isuer) {
      setErrorIsuer('*select option');
    } else {
      pass += 1;
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
      dispatch(setIType(payType));
    }
  };
  return (
    <>
      <p className="text-2xl  text-gray-500 mt-2 ml-2">
        <b>We need driver licese and other information.</b>
      </p>
      <div className="text-center gap-2 py-3 border border-gray-300 rounded-xl w-full flex flex-col">
        <div className="w-full flex justify-between  gap-2 flex-col md:flex-row">
          <div className="flex flex-col w-full md:w-[50%]  md:mx-5">
            <TextField
              aria-owns={license ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setlicense(event.currentTarget)}
              onMouseLeave={() => setlicense(null)}
              onMouseDown={() => setlicense(null)}
              value={driverNumber}
              onChange={handleDriverNumber}
              fullWidth
              autoFocus
              autoComplete="off"
              label="Driver license number"
              variant="standard"
              InputProps={{
                style: {
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(license)}
              anchorEl={license}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setlicense(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }}>
                please enter as show on your driver licensed.
              </Typography>
            </Popover>
            {errordriverNumber !== '' && (
              <p className="text-red-500 pl-2">{errordriverNumber}</p>
            )}
          </div>
          <div className="flex flex-col w-full md:w-[30%]  md:mx-5">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} minDate="2000-01-01">
                <DatePicker
                  label="driver expieration date"
                  onChange={(newValue) => handleDriverDate(newValue)}
                  className="w-full "
                />
              </DemoContainer>
            </LocalizationProvider>
            {errordriverDate !== '' && (
              <p className="text-red-500 pl-2">{errordriverDate}</p>
            )}
          </div>
          <div className="flex flex-col w-full md:w-[20%]  md:mx-5">
            <TextField
              aria-owns={state ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setstate(event.currentTarget)}
              onMouseLeave={() => setstate(null)}
              onMouseDown={() => setstate(null)}
              value={driverState}
              onChange={handleDriverState}
              fullWidth
              label="State"
              autoComplete="off"
              variant="standard"
              InputProps={{
                style: {
                  //height: '50px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(state)}
              anchorEl={state}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setstate(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }} style={{ width: '220px' }}>
                Please enter driver license state.
              </Typography>
            </Popover>
            {errordriverState !== '' && (
              <p className="text-red-500 pl-2">{errordriverState}</p>
            )}
          </div>
        </div>
        <div className="w-full flex p-2 justify-between flex-col md:flex-row">
          <div className="flex flex-col w-full  md:mx-2">
            <FormControl variant="filled" sx={{ m: 1, minwidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{ fontSize: '20px' }}
              >
                Type
              </InputLabel>
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
          <div className="flex flex-col w-full  md:mx-5">
            <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{ fontSize: '20px' }}
              >
                isuer
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={isuer}
                onChange={handleIsuer}
              >
                <MenuItem value=" " style={{ height: '40px' }}>
                  <em> </em>
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
          <div className="flex flex-col w-full  md:mx-4">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} minDate="2000-01-01">
                <DatePicker
                  label="Expiration Date"
                  onChange={(newValue) => handleEDate(newValue)}
                  className="w-full"
                />
              </DemoContainer>
            </LocalizationProvider>
            {erroreDate !== '' && (
              <p className="text-red-500 pl-2">{erroreDate}</p>
            )}
          </div>
        </div>
        {/* <div className="w-full pb-2 pr-4 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff]  px-5 p-1 rounded-lg text-white text-2xl  hover:bg-purple-800"
              >
                CONTINUE
              </button>
            </div> */}
      </div>
    </>
  );
};
export default SecondPage;
