import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerMiddleName,
  setCheckerIsSkipMiddleName,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';

const InputMiddleName = () => {
  const { step, history, checkerMiddleName, checkerIsSkipMiddleName,  
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [middleName, setMiddleName] = useState('');
  const [error, setError] = useState(null);

  const handleChangeInput = (e) => {
    setMiddleName(e.target.value);
    setError(null);
  };

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!middleName.trim()) {
      setError('The middle name filed is required');
    } else if (!/^[A-Za-z]+$/.test(middleName)) {
      setError('The middle name contains only characters');
    } else {
     
      dispatch(addHistory(true));
      dispatch(setCheckerMiddleName(middleName));
      setMiddleName('');
    }
  };

  const skipMiddleName = () => {
    dispatch(setCheckerIsSkipMiddleName(true));
    dispatch(addHistory(true));
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 5 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="middle name"
            fullWidth
            value={middleName}
            autoComplete='off'
            onChange={handleChangeInput}
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
        <p className="bg-gray-50 rounded-3xl p-4">
          In the case you have a middle name on your credit report please enter
          here.
        </p>
        <button
          onClick={skipMiddleName}
          type="button"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          SKIP
        </button>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
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
      {step > 3 && checkerIsSkipMiddleName == false ? (
        <>
          {history[4] == true ? (
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
