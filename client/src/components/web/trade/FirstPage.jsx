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
import { usersUpdate } from '../../../api/index';

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
    checkerMobileNumber,
    type,
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
        page: 'Trade In',
        last_question: '1',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
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
      <div className="flex bg-gray-100 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-2/3 text-4xl text-black my-3 font-medium">
            We need to your some information
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <input
                  onFocus={() => setFocusFirstName(true)}
                  onBlur={() => setFocusFirstName(false)} // onBlur is triggered when the input loses focus
                  className="w-full h-20 border-2 text-center rounded-md text-2xl"
                  id="autocomplete"
                  autoFocus
                  placeholder="First Name"
                  type="text"
                  value={firstName}
                  onChange={handleFirstName}
                />
                {errorFirstName !== '' && (
                  <p className="text-red-500 pl-2">{errorFirstName}</p>
                )}
                {focusFirstName && (
                  <b className="bg-gray-100 rounded-3xl p-4 mt-2">
                    Please enter your first name.
                  </b>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <input
                  onFocus={() => setFocusLastName(true)}
                  onBlur={() => setFocusLastName(false)} // onBlur is triggered when the input loses focus
                  className="w-full h-20 border-2 text-center rounded-md text-2xl"
                  id="autocomplete"
                  placeholder="Last Name"
                  type="text"
                  value={lastName}
                  onChange={handleLastName}
                />
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
                {focusLastName && (
                  <b className="bg-gray-100 rounded-3xl p-4 mt-2">
                    Please enter your last name.
                  </b>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <input
                  onFocus={() => setFocusEmailAddress(true)}
                  onBlur={() => setFocusEmailAddress(false)} // onBlur is triggered when the input loses focus
                  className="w-full h-20 border-2 text-center rounded-md text-2xl"
                  id="autocomplete"
                  placeholder="Email Address"
                  type="text"
                  value={emailAddress}
                  onChange={handleEmailAddress}
                />
                {errorEmailAddress !== '' && (
                  <p className="text-red-500 pl-2">{errorEmailAddress}</p>
                )}
                {focusEmailAddress && (
                  <p className="bg-gray-100 rounded-3xl p-4 mt-2">
                    By providing your email you agree to receive notification
                    messages from <b>{dealerName}</b> to the provided email
                    address.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-between flex-col md:flex-row -my-8">
              <div className="flex flex-col w-full md:w-[66%] md:px-5">
                <div className="flex flex-col justify-between bg-gray-100 rounded-3xl px-4">
                  <div className="flex flex-col md:flex-row justify-between">
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

                  <p className="px-6">
                    <b>Please select vehicle condition</b>
                  </p>
                  {errorCondition !== '' ? (
                    <p className="text-red-500 pl-6 pt-2">{errorCondition}</p>
                  ) : null}
                </div>
              </div>
              <input
                className="w-full md:w-[29%] h-20 border-2 text-center rounded-md text-2xl md:mx-5 my-5 md:my-0"
                id="autocomplete"
                placeholder="Mileage Hour"
                type="text"
                value={mileage}
                onChange={(e) => {
                  setMileage(e.target.value);
                }}
              />
            </div>

            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-1/4 h-20 p-2 mx-5 rounded-lg text-white text-xl  hover:bg-purple-800"
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
