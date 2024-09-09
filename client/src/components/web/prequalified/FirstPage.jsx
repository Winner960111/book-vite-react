import { useState, useEffect, useCallback } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckerFirstName,
  setCheckerMiddleName,
  setCheckerLastName,
  setCheckerBirthday,
  setCheckerEmail,
  setCheckerMobileNumber,
  setCheckerSocialNumber,
  setSubmit,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const FirstPage = () => {
  const {
    step,
    dealerName,
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
    checkerFirstName,
    checkerLastName,
    checkerEmail,
    type,
    checkerMobileNumber,
    submit,
  } = useSelector((state) => state.checker);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmailAddress, setErrorEmailAddress] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');
  const [errorSocialNumber, setErrorSocialNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [socialNumber, setSocialNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailHover, setHoverEmail] = useState(null);
  const [first, setFirst] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [last, setLast] = useState(null);
  const [social, setSocial] = useState(null);
  const [phone, setPhone] = useState(null);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrorFirstName('');
    console.log('Firstname====>', checkerFirstName);
  };
  const handleMiddleName = (e) => {
    setMiddleName(e.target.value);
    setErrorMiddleName('');
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
    console.log('Lastname===>', checkerLastName);
  };
  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
    setErrorEmailAddress('');
  };
  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setPhoneNumber(formattedInputValue);
    dispatch(setCheckerMobileNumber(phoneNumber));
    setErrorPhoneNumber(null);
  };
  const handleSocialNumber = (e) => {
    setErrorSocialNumber('');
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 5) +
      (inputValue.length > 5 ? '-' : '') +
      inputValue.substring(5, 9);
    setSocialNumber(formattedInputValue);
  };
  const handleBirthday = (value) => {
    setErrorBirthday('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 1900 || Number(year) > 2100) {
      setErrorBirthday('*Invalid Date');
    }
    setBirthday(year + '-' + String(month) + '-' + date);
  };
  console.log(birthday);
  useEffect(() => {
    setErrorFirstName('');
    setErrorMiddleName('');
    setErrorLastName('');
    setErrorEmailAddress('');
    setErrorBirthday('');
    setErrorSocialNumber('');
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
    if (!/^[A-Za-z]+$/.test(middleName) && middleName) {
      setErrorMiddleName('*contains only character');
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
    if (!birthday) {
      setErrorBirthday('*input your correct birthday');
    } else {
      pass += 1;
    }
    if (!socialNumber) {
      setErrorSocialNumber('input your social security number');
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(socialNumber)) {
      setErrorSocialNumber('Invalid social security number');
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
        page: 'Short',
        last_question: '1',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setCheckerFirstName(firstName));
      dispatch(setCheckerMiddleName(middleName));
      dispatch(setCheckerLastName(lastName));
      dispatch(setCheckerEmail(emailAddress));
      dispatch(setCheckerSocialNumber(socialNumber));
      dispatch(setCheckerBirthday(birthday));
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-2/3 text-4xl my-3 font-medium">
            We need your some information
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={first ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFirst(event.currentTarget)}
                  onMouseLeave={() => setFirst(null)}
                  onMouseDown={() => setFirst(null)}
                  value={firstName}
                  onChange={handleFirstName}
                  fullWidth
                  type="text"
                  autoComplete="off"
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
                      fontSize: '25px',
                    },
                  }}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(first)}
                  anchorEl={first}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFirst(null)}
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
                  aria-owns={middle ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setMiddle(event.currentTarget)}
                  onMouseLeave={() => setMiddle(null)}
                  onMouseDown={() => setMiddle(null)}
                  value={middleName}
                  onChange={handleMiddleName}
                  fullWidth
                  type="text"
                  autoComplete="off"
                  defaultValue="Normal"
                  label="Middle Initial(optional)"
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
                  open={Boolean(middle)}
                  anchorEl={middle}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setMiddle(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }} style={{ width: '300px' }}>
                    In the case you have a middle name on your credit report
                    please enter here.
                  </Typography>
                </Popover>
                {errorMiddleName !== '' && (
                  <p className="text-red-500 pl-2">{errorMiddleName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={last ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setLast(event.currentTarget)}
                  onMouseLeave={() => setLast(null)}
                  onMouseDown={() => setLast(null)}
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  type="text"
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
                  open={Boolean(last)}
                  anchorEl={last}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setLast(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please enter your last name.
                  </Typography>
                </Popover>
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
              </div>
            </div>
            <div className="w-full flex p-5 justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={social ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setSocial(event.currentTarget)}
                  onMouseLeave={() => setSocial(null)}
                  onMouseDown={() => setSocial(null)}
                  value={socialNumber}
                  onChange={handleSocialNumber}
                  fullWidth
                  type="text"
                  autoComplete="off"
                  defaultValue="Normal"
                  label="Social security number"
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
                  open={Boolean(social)}
                  anchorEl={social}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setSocial(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }} style={{ width: '300px' }}>
                    {
                      'We collect your Social Security Number (SSN) to verify your identity and ensure the security and integrity of our services.'
                    }
                  </Typography>
                </Popover>
                {errorSocialNumber !== '' && (
                  <p className="text-red-500 pl-2">{errorSocialNumber}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={emailHover ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setHoverEmail(event.currentTarget)}
                  onMouseLeave={() => setHoverEmail(null)}
                  onMouseDown={() => setHoverEmail(null)}
                  value={emailAddress}
                  onChange={handleEmailAddress}
                  type="text"
                  fullWidth
                  autoComplete="off"
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
                      fontSize: '25px',
                    },
                  }}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(emailHover)}
                  anchorEl={emailHover}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setHoverEmail(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }} style={{ width: '30vw' }}>
                    By providing your email you agree to receive notification
                    messages from <b>{dealerName}</b> to the provided email
                    address.
                  </Typography>
                </Popover>
                {errorEmailAddress !== '' && (
                  <p className="text-red-500 pl-2">{errorEmailAddress}</p>
                )}
              </div>

              <div className="flex flex-col w-full my-3 md:mx-5">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={['DatePicker']}
                    minDate="1900-01-01"
                    maxDate="2100-01-01"
                  >
                    <DatePicker
                      label="Birthday"
                      onChange={(newValue) => handleBirthday(newValue)}
                      className="w-full"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errorBirthday !== '' && (
                  <p className="text-red-500 pl-2">{errorBirthday}</p>
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
export default FirstPage;
