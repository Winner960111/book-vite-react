import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckerFirstName,
  setCheckerLastName,
  setCheckerEmail,
  setVehicleCondition,
  setMileageHour,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const FirstPage = () => {
  const {
    step,
    dealerName,
    // intentID,
    // dealerId,
    // deviceIP,
    // deviceOS,
    // deviceCity,
    // deviceCountry,
    // deviceState,
    // deviceDate,
    // deviceLat,
    // deviceLon,
    // deviceBrowser,
    // checkerMobileNumber,
    // type,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmailAddress, setErrorEmailAddress] = useState('');
  const [errorCondition, setErrorCondition] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [focusFirstName, setFocusFirstName] = useState(Boolean);
  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusEmailAddress, setFocusEmailAddress] = useState(Boolean);
  const [condition, setCondition] = useState('');
  const [mileage, setMileage] = useState('');

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrorFirstName('');
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
  };

  const handleMileage = (e) => {

    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setMileage(e.target.value)
    }
  }

  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
    setErrorEmailAddress('');
  };
  useEffect(() => {
    setErrorFirstName('');
    setErrorLastName('');
    setErrorEmailAddress('');
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
    if (!emailAddress) {
      setErrorEmailAddress('input your email');
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)
    ) {
      setErrorEmailAddress('Invalid email type');
    } else {
      pass += 1;
    }
    if (!condition) {
      setErrorCondition('You must check your condition');
    } else {
      pass += 1;
    }
    if (pass == 4) {
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
      //   page: 'Trade In',
      //   last_question: '1',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setCheckerFirstName(firstName));
      dispatch(setCheckerLastName(lastName));
      dispatch(setCheckerEmail(emailAddress));
      dispatch(setVehicleCondition(condition));
      dispatch(setMileageHour(mileage));
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
                  aria-owns={focus ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusFirstName(event.currentTarget)}
                  onMouseLeave={() => setFocusFirstName(null)}
                  onMouseDown={() => setFocusFirstName(null)}
                  value={firstName}
                  onChange={handleFirstName}
                  fullWidth
                  autoFocus
                  autoComplete='off'
                  type="text"
                  defaultValue="Normal"
                  label="First name"
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
                  aria-owns={focus ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusLastName(event.currentTarget)}
                  onMouseLeave={() => setFocusLastName(null)}
                  onMouseDown={() => setFocusLastName(null)}
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  autoComplete='off'
                  type="text"
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
                      fontSize: '25px'
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
                  <p className="text-red-500 pl-2">{errorFirstName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusEmailAddress ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusEmailAddress(event.currentTarget)}
                  onMouseLeave={() => setFocusEmailAddress(null)}
                  onMouseDown={() => setFocusEmailAddress(null)}
                  value={emailAddress}
                  onChange={handleEmailAddress}
                  fullWidth
                  autoComplete='off'
                  type="text"
                  defaultValue="Normal"
                  label="Email address"
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
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(focusEmailAddress)}
                  anchorEl={focusEmailAddress}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusEmailAddress(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2, width: '300px' }}>
                    By providing your email you agree to receive notification
                    messages from <b>{dealerName}</b> to the provided email
                    address.
                  </Typography>
                </Popover>
                {errorEmailAddress !== '' && (
                  <p className="text-red-500 pl-2">{errorEmailAddress}</p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-between flex-col md:flex-row -my-8">
              <div className="flex flex-col w-full md:w-[66%] md:px-5">
                <div className="flex flex-col justify-between bg-gray-50 rounded-3xl px-4">

                  <p className="px-6 py-2">
                    <p>Please select vehicle condition</p>
                  </p>
                  <div className="flex flex-col md:flex-row justify-between font-bold">
                    <label
                      htmlFor="radio1"
                      className="m-2 p-2 cursor-pointer"
                      onClick={() => {
                        setCondition('Excellent');
                      }}
                    >
                      <input
                        type="radio"
                        id="radio1"
                        name="deal_type"
                        className="w-[17px] h-[17px] mx-2"
                      />
                      Excellent
                    </label>
                    <label
                      htmlFor="radio2"
                      className="m-2 p-2 cursor-pointer"
                      onClick={() => {
                        setCondition('Good');
                      }}
                    >
                      <input
                        type="radio"
                        id="radio2"
                        name="deal_type"
                        className="w-[17px] h-[17px] mx-2"
                      />
                      Good
                    </label>
                    <label
                      htmlFor="radio3"
                      className="m-2 p-2 cursor-pointer"
                      onClick={() => {
                        setCondition('Fair');
                      }}
                    >
                      <input
                        type="radio"
                        id="radio3"
                        name="deal_type"
                        className="w-[17px] h-[17px] mx-2"
                      />
                      Fair
                    </label>
                  </div>

                  {errorCondition !== '' ? (
                    <p className="text-red-500 pl-6 pt-2">{errorCondition}</p>
                  ) : null}
                </div>
              </div>
              <div className="w-full md:w-[30%] h-20 text-center rounded-md text-2xl md:mx-5 my-5 md:my-0">
                <TextField
                  value={mileage}
                  onChange={(e) => {
                    handleMileage(e);
                  }}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  autoComplete='off'
                  label="Mileage"
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
