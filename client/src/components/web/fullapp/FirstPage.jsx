import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckerFirstName,
  setCheckerMiddleName,
  setCheckerLastName,
  setCheckerBirthday,
  setCheckerEmail,
  setCheckerSocialNumber,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import TextField from '@mui/material/TextField';

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
    type,
    checkerMobileNumber,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmailAddress, setErrorEmailAddress] = useState('');
  const [errorBirthday, setErrorBirthday] = useState('');
  const [errorSocialNumber, setErrorSocialNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [socialNumber, setSocialNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [focusFirstName, setFocusFirstName] = useState(Boolean);
  const [focusMiddleName, setFocusMiddleName] = useState(Boolean);
  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusEmailAddress, setFocusEmailAddress] = useState(Boolean);
  const [focusSocialNumber, setFocusSocialNumber] = useState(Boolean);
  const [focusBirthday, setFocusBirthday] = useState(Boolean);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrorFirstName('');
  };
  const handleMiddleName = (e) => {
    setMiddleName(e.target.value);
    setErrorMiddleName('');
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
  };
  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
    setErrorEmailAddress('');
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
  const handleBirthday = (e) => {
    setBirthday(e.target.value);
    setErrorBirthday('');
  };

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
      setErrorLastName('*input your birthday');
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
      <div className="flex bg-gray-100 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-20 mx-20">
          <p className="w-2/3 text-4xl text-[#854fff] my-3 font-medium">
            We need to your personal information
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusFirstName(true)}
                  onBlur={() => setFocusFirstName(false)} // onBlur is triggered when the input loses focus
                  value={firstName}
                  onChange={handleFirstName}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  label="First Name"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: 'blue', // Change text color
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#854fff' // Change label color
                    },
                  }}
                />

                {errorFirstName !== '' && (
                  <p className="text-red-500 pl-2">{errorFirstName}</p>
                )}
                {focusFirstName && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter your first name.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusMiddleName(true)}
                  onBlur={() => setFocusMiddleName(false)} // onBlur is triggered when the input loses focus
                  value={middleName}
                  onChange={handleMiddleName}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  label="Middle Initial(optional)"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: 'blue', // Change text color
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#854fff' // Change label color
                    },
                  }}
                />
                {errorMiddleName !== '' && (
                  <p className="text-red-500 pl-2">{errorMiddleName}</p>
                )}
                {focusMiddleName && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    In the case you have a middle name on your credit report
                    please enter here.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusLastName(true)}
                  onBlur={() => setFocusLastName(false)} // onBlur is triggered when the input loses focus
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  label="Last Name"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: 'blue', // Change text color
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#854fff' // Change label color
                    },
                  }}
                />
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
                {focusLastName && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter your last name.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full flex p-5 justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusBirthday(true)}
                  onBlur={() => setFocusBirthday(false)} // onBlur is triggered when the input loses focus
                  type="date"
                  value={birthday}
                  onChange={handleBirthday}
                  fullWidth
                  defaultValue="Normal"
                  label="   "
                  variant="standard"
                  InputProps={{
                    style: {
                      color: 'blue', // Change text color
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#854fff' // Change label color
                    },
                  }}
                />
                {errorBirthday !== '' && (
                  <p className="text-red-500 pl-2">{errorBirthday}</p>
                )}
                {focusBirthday && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    <b className="text-justify ">Please input your birthday.</b>
                    <br />
                    Your Privacy Matters: Rest assured, the information you
                    provide is strictly confidential. We take your privacy
                    seriously and only use your details to enhance your
                    experience with us.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusSocialNumber(true)}
                  onBlur={() => setFocusSocialNumber(false)} // onBlur is triggered when the input loses focus
                  value={socialNumber}
                  onChange={handleSocialNumber}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  label="Social security number"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: 'blue', // Change text color
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#854fff' // Change label color
                    },
                  }}
                />
                {errorSocialNumber !== '' && (
                  <p className="text-red-500 pl-2">{errorSocialNumber}</p>
                )}
                {focusSocialNumber && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    We will not hurt your credit report. This is not an
                    application for credit. Authorization is solely for
                    prequalification only.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusEmailAddress(true)}
                  onBlur={() => setFocusEmailAddress(false)} // onBlur is triggered when the input loses focus
                  value={emailAddress}
                  onChange={handleEmailAddress}
                  type="text"
                  fullWidth
                  defaultValue="Normal"
                  label="Email Address"
                  variant="standard"
                  InputProps={{
                    style: {
                      color: 'blue', // Change text color
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: '#854fff' // Change label color
                    },
                  }}
                />
                {errorEmailAddress !== '' && (
                  <p className="text-red-500 pl-2">{errorEmailAddress}</p>
                )}
                {focusEmailAddress && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    By providing your email you agree to receive notification
                    messages from <b>{dealerName}</b> to the provided email
                    address.
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
export default FirstPage;
