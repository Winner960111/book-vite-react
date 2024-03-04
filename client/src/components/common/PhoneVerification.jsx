import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkPhoneNumber } from '../../api';
import {
  setCheckerMobileNumber,
  addHistory,
} from '../../store/reducers/checker';
import { TextField } from '@mui/material';
const PhoneVerification = () => {
  const { dealerName, dealerId, checkerMobileNumber } = useSelector(
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

  const handleSubmit = async (e) => {
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
        setPhoneNumber('');
      } else {
        setError('Invalid phone number. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <p className="w-4/5 md:w-[600px] text-4xl text-[#854fff] my-3 mt-36 font-medium">
          <b>Verify your mobile number</b>
        </p>
        <form
          onSubmit={handleSubmit}
          className={
            'w-4/5 md:w-[600px] text-justify bg-white rounded-3xl px-8 pt-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
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
              type="text"
              InputProps={{
                style: {
                  color: 'blue', // Change text color
                  height: '70px', // Set the height of the TextField
                  fontSize: '25px',
                  textAlign: 'center'
                },
              }}
              InputLabelProps={{
                style: {
                  color: '#854fff', // Change label color
                  textAlign: 'center',
                  fontSize: '25px'
                },
              }}
            />
            {error !== '' ? (
              <p className="text-red-500 pl-2 text-sm">{error}</p>
            ) : null}
          </div>
          <p className=" bg-gray-50 rounded-3xl p-4">
            by providing your mobile number you agree to receive recurring
            messages from <b>{dealerName}</b> to the provided mobile number and
            agree to <b>{dealerName}</b>. terms and privacy policy. Message &
            data rates may apply.
          </p>
          <button
            type="submit"
            className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
          >
            CONTINUE
          </button>
        </form>
      </div>
    </>
  );
};

export default PhoneVerification;
