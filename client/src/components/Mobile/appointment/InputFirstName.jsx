import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerFirstName,
  removeHistory,
} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import { MdModeEditOutline } from "react-icons/md";

const InputFirstName = () => {
  const dispatch = useDispatch();
  const {
    step,
    history,
    checkerFirstName,
  } = useSelector((state) => state.checker);

  const [firstName, setFirstName] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const editFunction = () => {
    dispatch(removeHistory())
  }

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
      dispatch(setCheckerFirstName(firstName));
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
          step >= 5 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="First name"
            fullWidth
            value={firstName}
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
          Please enter your first name.
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        {checkerFirstName}
<MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );

  return (
    <>
      {step > 3 ? (
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
export default InputFirstName;
