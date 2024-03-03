import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { checkPhoneNumber } from '../../../api';
import {
  addHistory,
  setCheckerMobileNumber,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
const SendPhoneVerificationCode = () => {
  const { history, step, dealerName, dealerId, checkerMobileNumber } =
    useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

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
        dispatch(addHistory(true));
        dispatch(setCheckerMobileNumber(phoneNumber));
        setPhoneNumber('');
      } else {
        setError('Invalid phone number. Please try again.');
      }
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 2 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="py-2 flex flex-col md:flex-row md:items-center"
          style={step >= 2 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Phone number"
            fullWidth
            value={phoneNumber}
            onChange={handleChangeInput}
            type="tel"
            autoFocus
            InputProps={{
              style: {
                color: 'blue', // Change text color
                height: '70px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                color: '#854fff', // Change label color
                fontSize: '25px',
              },
            }}
          />
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className=" bg-gray-50 rounded-3xl p-4">
          <b>We need to verify your mobile number</b>
          <br />
          by providing your mobile number you agree to receive recurring
          messages from <b>{dealerName}</b> to the provided mobile number and
          agree to <b>{dealerName}</b>. terms and privacy policy. Message & data
          rates may apply.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 2 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-sm md:text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {checkerMobileNumber}
      </div>
    </div>
  );

  return (
    <>
      {step > 0 ? (
        <>
          {/* Check if history at index 1 is true */}
          {history[1] === true ? (
            <>
              {/* Render description and reply if history[1] is true */}
              {renderDescription()}
              {renderReply()}
            </>
          ) : (
            <>
              {/* Otherwise, render only description */}
              {renderDescription()}
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default SendPhoneVerificationCode;
