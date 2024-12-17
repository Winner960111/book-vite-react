import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { checkPhoneNumber, checkPhoneNumberCall } from '../../api/index';
import {
  addHistory,
  setCheckerMobileNumber,
} from '../../store/reducers/checker';
import { classNames } from '../../utils';
import { TextField } from '@mui/material';
const SendPhoneVerificationCode = () => {
  const { history, step, dealerId, checkerMobileNumber } = useSelector(
    (state) => state.checker
  );
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

  const handleTextCode = async (e) => {
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
        setPhoneNumber('');
      } else {
        setError('Invalid phone number. Please try again.');
      }
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 2 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className=" bg-gray-50 rounded-3xl p-4">
          To ensure the security of our platform, we&apos;ll send you a
          verification code via call or text. This step helps us confirm that
          you&apos;re a real person.{' '}
          <i>Don&apos;t include &apos;+&apos; or &lsquo;()&rsquo;</i>
          <br />
          <br />
        </p>
      </div>
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 2 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className=" bg-gray-50 rounded-3xl p-4 mt-5">
          By agreeing, you authorize us to send future messages regarding your
          request, You&apos;re in control of your messaging. Reply
          &lsquo;Stop&rsquo; to unsubscribe at any time. Please review our
          privacy policy at{' '}
          <a href="https://www.riderflow.app/privacy/">
            https://www.riderflow.app/privacy/
          </a>{' '}
          for more details.
        </p>
      </div>
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 2 ? 'text-slate-400' : 'text-slate-800'
        )}
        style={step >= 2 ? { display: 'none' } : { display: 'block' }}
      >
        <div className="py-2 flex flex-col md:flex-row md:items-center">
          <TextField
            id="outlined-multiline-flexible"
            label="Phone number"
            fullWidth
            value={phoneNumber}
            onChange={handleChangeInput}
            type="tel"
            autoComplete="off"
            InputProps={{
              style: {
                height: '70px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '25px',
              },
            }}
          />
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>

        <button
          type="button"
          onClick={handleTextCode}
          className="w-full border-black border-2 rounded-md px-16 py-4 text-black hover:bg-black hover:text-white font-medium text-lg mt-2"
          style={step >= 2 ? { display: 'none' } : { display: 'block' }}
        >
          Text
        </button>
        <button
          type="button"
          onClick={handleCallCode}
          className="w-full border-black border-2 rounded-md px-16 py-4 text-black hover:bg-black hover:text-white font-medium text-lg mt-2"
          style={step >= 2 ? { display: 'none' } : { display: 'block' }}
        >
          Call
        </button>
      </div>
    </>
  );
  const renderReply = () => (
    <div className="mt-4 flex justify-end text-sm md:text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
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
