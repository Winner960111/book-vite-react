import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPhoneNumber, checkPhoneNumberCall } from '../../api';
import {
  setCheckerMobileNumber,
  addHistory,
  setProgress,
} from '../../store/reducers/checker';
import { TextField } from '@mui/material';
const PhoneVerification = () => {
  const { dealerId, checkerMobileNumber } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [checkerMobileNumber]);

  const handleChangeInput = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setPhoneNumber(formattedInputValue);
    setError(null);
  };

  const handleTextCode = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError('You should input your phone number');
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
      setError('Invalid phone number type');
    } else {
      const res = await checkPhoneNumber(phoneNumber, dealerId);

      if (res.status === 201) {
        dispatch(setCheckerMobileNumber(phoneNumber));
        dispatch(addHistory(true));
        dispatch(setProgress());
        setPhoneNumber('');
      } else {
        setError('Invalid phone number. Please try again.');
      }
    }
  };

  const handleCallCode = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError('You should input your phone number');
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
      setError('Invalid phone number type');
    } else {
      const res = await checkPhoneNumberCall(phoneNumber, dealerId);

      if (res.status === 201) {
        dispatch(setCheckerMobileNumber(phoneNumber));
        dispatch(addHistory(true));
        dispatch(setProgress());
        setPhoneNumber('');
      } else {
        setError('Invalid phone number. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center p-2">
          <p className="w-2/3 text-4xl my-3 mt-5 font-medium">
            Verify your mobile number
          </p>
          <div
            className={
              'w-2/3 text-justify bg-white rounded-3xl px-8 pt-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
            }
          >
            <div className="py-2 flex flex-col items-center">
              <TextField
                helperText=" "
                id="demo-helper-text-aligned-no-helper"
                label="Phone Number"
                autoFocus
                value={phoneNumber}
                onChange={handleChangeInput}
                fullWidth
                autoComplete="off"
                type="text"
                InputProps={{
                  style: {
                    height: '70px', // Set the height of the TextField
                    fontSize: '25px',
                    textAlign: 'center',
                  },
                }}
                InputLabelProps={{
                  style: {
                    textAlign: 'center',
                    fontSize: '25px',
                  },
                }}
              />
              {error !== '' ? (
                <p className="text-red-500 pl-2 text-sm">{error}</p>
              ) : null}
            </div>
            <p className=" bg-gray-50 rounded-3xl p-4">
              To ensure the security of our platform, we&apos;ll send you a
              verification code via call or text. This step helps us confirm
              that you&apos;re a real person.{' '}
              <i>Don&apos;t include &apos;+&apos; or &lsquo;()&rsquo;</i>
            </p>
            <p className=" bg-gray-50 rounded-3xl p-4 mt-5">
              By agreeing, you authorize us to send future messages regarding
              your request, You&apos;re in control of your messaging. Reply
              &lsquo;Stop&rsquo; to unsubscribe at any time. Please review our
              privacy policy at{' '}
              <a href="https://www.credit-apps.com/privacy/" target="__blank">
                https://www.credit-apps.com/privacy/
              </a>{' '}
              for more details.
            </p>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleTextCode}
                className="bg-[#854fff] w-[30%] h-16 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
              >
                Text
              </button>

              <button
                type="button"
                onClick={handleCallCode}
                className="bg-[#854fff] w-[30%] h-16 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
              >
                Call
              </button>
            </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};

export default PhoneVerification;
