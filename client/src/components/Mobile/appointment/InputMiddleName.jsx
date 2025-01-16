import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerMiddleName,
  setCheckerIsSkipMiddleName,
} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';

const InputMiddleName = () => {
  const dispatch = useDispatch();
  const {
    step,
    history,
    checkerMiddleName,
    checkerIsSkipMiddleName,
  } = useSelector((state) => state.checker);

  const [middleName, setMiddleName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const skipMiddleName = () => {
      dispatch(setCheckerIsSkipMiddleName(true));
      dispatch(addHistory(true));
    };
  const handleChangeInput = (e) => {
    setMiddleName(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!middleName.trim()) {
      setError('The middle name field is required');
    } else if (!/^[A-Za-z]+$/.test(middleName)) {
      setError('The middle name contains only characters');
    } else {
      
      dispatch(addHistory(true));
      dispatch(setCheckerMiddleName(middleName));
      setMiddleName('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />

      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 6 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 6 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Middle name"
            fullWidth
            value={middleName}
            onChange={handleChangeInput}
            type="text"
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
        <p className="bg-gray-50 rounded-3xl p-4">
          Please enter your middle name.
        </p>
        <button
          onClick={skipMiddleName}
          type="button"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 6 ? { display: 'none' } : { display: 'block' }}
        >
          SKIP
        </button>

        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 6 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        {checkerMiddleName}
      </div>
    </div>
  );

  return (
    <>
     
      {step > 4 && checkerIsSkipMiddleName == false ? (
        <>
          {history[5] == true ? (
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
export default InputMiddleName;
