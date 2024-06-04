import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setRefPhoneNumber1,
} from '../../../store/reducers/checker';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';

const InputPhoneNumber = () => {

  const { step, history, refPhoneNumber1 } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInputPhoneNumber = (e) => {
    setError(null);
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setPhoneNumber(formattedInputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneNumber.length === 0) {
      setError('You should input your social security number');
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
      setError('Invalid social security number');
    } else {
      dispatch(addHistory(true));
      dispatch(setRefPhoneNumber1(phoneNumber));
      setPhoneNumber('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 12 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 12 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Phone number"
            fullWidth
            value={phoneNumber}
            onChange={handleChangeInputPhoneNumber}
            autoComplete='off'
            type="text"
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
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please input your reference person&apos;s phone number.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 12 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        <p>{refPhoneNumber1}</p>
      </div>
    </div>
  );

  return (
    <>
      {step > 10 ? (
        <>
          {history[11] == true ? (
            <>
              {renderDescription()}
              {renderReply()}
            </>
          ) : (
            renderDescription()
          )}
        </>
      ) : null}
    </>
  );
};
export default InputPhoneNumber;
