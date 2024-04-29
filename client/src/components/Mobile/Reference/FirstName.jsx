import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import {
  addHistory,
  setRefFirstName1,
} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';

const InputFirstName = () => {
  const dispatch = useDispatch();
  const { step, history, refFirstName1} = useSelector(
    (state) => state.checker
  );

  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInput = (e) => {
    setFirstName(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      setError('The first name field is required');
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setError('The first name contains only characters');
    } else {
      dispatch(addHistory(true));
      dispatch(setRefFirstName1(firstName));
      setFirstName('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 10 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          <p className="bg-gray-50 rounded-3xl p-4 text-left">
            <b>🎊 We need one more reference information</b>
          </p>
          <TextField
            id="outlined-multiline-flexible"
            label="First name"
            fullWidth
            value={firstName}
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
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4">
          Please enter your reference first name.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {refFirstName1}
      </div>
    </div>
  );

  return (
    <>
      {step > 8 ? (
        <>
          {history[9] == true ? (
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
export default InputFirstName;
