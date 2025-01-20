import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerLastName,
  removeHistory,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
import { MdModeEditOutline } from "react-icons/md";

const InputLastName = () => {
  const { step, history, checkerLastName, } = useSelector(
      (state) => state.checker
    );
  const dispatch = useDispatch();

  const [lastName, setLastName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInput = (e) => {
    setLastName(e.target.value);
    setError(null);
  };

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (lastName.length === 0) {
      setError('The last name field is required');
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setError('The last name contains only characters');
    } else {
      dispatch(addHistory(true));
      dispatch(setCheckerLastName(lastName));
      setLastName('');
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
          className="my-2 flex flex-col md:flex-row md:items-center"
          style={step >= 6 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Last name"
            fullWidth
            autoComplete='off'
            value={lastName}
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
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please enter your last name.
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md px-16 py-4 text-black hover:bg-black hover:text-white font-medium text-lg mt-2"
          style={step >= 6 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        {checkerLastName}
       <MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />
      </div>
    </div>
  );

  return (
    <>
      {step > 4 ? (
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
export default InputLastName;
