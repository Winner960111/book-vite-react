import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setCheckerSocialNumber,
} from '../../../store/reducers/checker';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
const InputSocialNumber = () => {
  const {
    step,
    history,
    checkerSocialNumber,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [socialNumber, setSocialNumber] = useState('');
  const [error, setError] = useState(null);
  const [security, setSecurity] = useState(true);

  useEffect(() => {
    setError(null);
  }, [step]);

  const hideCheckerSocialNumber = () => {
    return `xxx-xx-${checkerSocialNumber.slice(-4)}`;
  };

  const handleChangeInputSocialNumber = (e) => {
    setError(null);
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 5) +
      (inputValue.length > 5 ? '-' : '') +
      inputValue.substring(5, 9);
    setSocialNumber(formattedInputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (socialNumber.length === 0) {
      setError('You should input your social security number');
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(socialNumber)) {
      setError('Invalid social security number');
    } else {
      dispatch(addHistory(true));
      dispatch(setCheckerSocialNumber(socialNumber));
      setSocialNumber('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 8 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Social security number"
            fullWidth
            value={socialNumber}
            autoComplete="off"
            onChange={handleChangeInputSocialNumber}
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
          {
            'We collect your Social Security Number (SSN) to verify your identity and ensure the security and integrity of our services.'
          }
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white" onClick={()=>setSecurity(!security)}>
        <p>{security?hideCheckerSocialNumber(checkerSocialNumber):checkerSocialNumber}</p>
        </div>
    </div>
  );

  return (
    <>
      {step > 6 ? (
        <>
          {history[7] == true ? (
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
export default InputSocialNumber;
