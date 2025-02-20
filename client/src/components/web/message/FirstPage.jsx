import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { usersStatus } from '../../../api/index';
import {
  setCheckerFirstName,
  setCheckerLastName,
  setCheckerMiddleName,
} from '../../../store/reducers/checker';
import { TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const FirstPage = () => {
  const {
    step,
    dealerId,
    checkerMobileNumber,
    // type,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  // const [errorEmailAddress, setErrorEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [middleName, setMiddleName] = useState('');
  // const [emailAddress, setEmailAddress] = useState('');
  const [focusFirstName, setFocusFirstName] = useState(Boolean);
  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusMiddleName, setFocusMiddleName] = useState(Boolean);
  // const [focusEmailAddress, setFocusEmailAddress] = useState(Boolean);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrorFirstName('');
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
  }; 
  const handleMiddleName = (e) => {
    setMiddleName(e.target.value);
    setErrorMiddleName('');
  };
  // const handleEmailAddress = (e) => {
  //   setEmailAddress(e.target.value);
  //   setErrorEmailAddress('');
  // };
  useEffect(() => {
    setErrorFirstName('');
    setErrorLastName('');
    setErrorMiddleName('');
  }, [step]);
  const handlesubmit = async () => {
    let pass = 0;
    if (!firstName) {
      setErrorFirstName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setErrorFirstName('*contains only characters');
    } else {
      pass += 1;
    }
    if (!lastName) {
      setErrorLastName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setErrorLastName('*contains only characters');
    } else {
      pass += 1;
    }
    if (!middleName) {
      setErrorMiddleName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(middleName)) {
      setErrorMiddleName('*contains only characters');
    } else {
      pass += 1;
    }
    if (pass == 3) {
      // const data = {
      //   dealer_id: dealerId,
      //   device_ip_address: deviceIP,
      //   device_operating_system: deviceOS,
      //   device_browser: deviceBrowser,
      //   device_type: type,
      //   device_state: deviceState,
      //   device_city: deviceCity,
      //   device_country: deviceCountry,
      //   device_date_time: deviceDate,
      //   device_lat: deviceLat,
      //   device_lon: deviceLon,
      //   status: 'Started',
      //   lang: 'EN',
      //   phone: checkerMobileNumber,
      //   page: 'Get Quote',
      //   last_question: '1',
      // };

      const data = {
        dealer_id: dealerId,
        mobile_phone: checkerMobileNumber,
        source: 'Dropout',
      };
      const res = await usersStatus(data);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setCheckerFirstName(firstName));
      dispatch(setCheckerLastName(lastName));
      dispatch(setCheckerMiddleName(middleName));
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-2/3 text-4xl my-3 font-medium">
            We need to your some information
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusFirstName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusFirstName(event.currentTarget)}
                  onMouseLeave={() => setFocusFirstName(null)}
                  onMouseDown={() => setFocusFirstName(null)}
                  value={firstName}
                  onChange={handleFirstName}
                  fullWidth
                  autoFocus
                  autoComplete="off"
                  defaultValue="Normal"
                  variant="standard"
                  label="First name"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px',
                    },
                  }}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(focusFirstName)}
                  anchorEl={focusFirstName}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusFirstName(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please enter your first name.
                  </Typography>
                </Popover>
                {errorFirstName !== '' && (
                  <p className="text-red-500 pl-2">{errorFirstName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusMiddleName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusMiddleName(event.currentTarget)}
                  onMouseLeave={() => setFocusMiddleName(null)}
                  onMouseDown={() => setFocusMiddleName(null)}
                  value={middleName}
                  onChange={handleMiddleName}
                  fullWidth
                  // autoFocus
                  autoComplete="off"
                  defaultValue="Normal"
                  variant="standard"
                  label="Middle name"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px',
                    },
                  }}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(focusMiddleName)}
                  anchorEl={focusMiddleName}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusMiddleName(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please enter your middle name.
                  </Typography>
                </Popover>
                {errorMiddleName !== '' && (
                  <p className="text-red-500 pl-2">{errorMiddleName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusLastName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusLastName(event.currentTarget)}
                  onMouseLeave={() => setFocusLastName(null)}
                  onMouseDown={() => setFocusLastName(null)}
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  autoComplete="off"
                  defaultValue="Normal"
                  label="Last name"
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px',
                    },
                  }}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(focusLastName)}
                  anchorEl={focusLastName}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusLastName(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please enter your Last name.
                  </Typography>
                </Popover>
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
              </div>
            </div>

            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="w-full lg:min-w-[200px] lg:w-[30%] border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
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
export default FirstPage;
