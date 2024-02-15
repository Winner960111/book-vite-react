import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckerFirstName,
  setCheckerLastName,
  setCheckerEmail,
} from '../../../store/reducers/checker';

const FirstPage = () => {
  const { step, dealerName } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmailAddress, setErrorEmailAddress] = useState('');
  // const [errorCondition, setErrorCondition] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [focusFirstName, setFocusFirstName] = useState(Boolean);
  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusEmailAddress, setFocusEmailAddress] = useState(Boolean);
  const [condition, setCondition] = useState('');


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

  const handlesubmit = () => {
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
    if (pass == 3) {
      dispatch(addHistory(true));
      dispatch(setCheckerFirstName(firstName));
      dispatch(setCheckerLastName(lastName));
      dispatch(setCheckerEmail(emailAddress));
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
            <div className="flex flex-col w-full px-5 md:px-10">
              <div className="flex flex-col justify-between bg-gray-100 rounded-3xl p-4">
                <div className="flex flex-col md:flex-row justify-between">
                  <label
                    htmlFor="radio1"
                    className="text-2xl m-2 p-2 cursor-pointer"
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
                    className="text-2xl m-2 p-2 cursor-pointer"
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
                    className="text-2xl m-2 p-2 cursor-pointer"
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

                <p className=" px-6">
                  <b>Please select deal type.</b>
                </p>
                {/* {error !== '' ? (
                  <p className="text-red-500 pl-6 pt-2">{error}</p>
                ) : null} */}
              </div>
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
