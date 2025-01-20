import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import { addHistory, setCheckerEmail, removeHistory, } from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { MdModeEditOutline } from "react-icons/md";

const InputEmail = () => {
  const {
    step,
    history,
    dealerName,
    checkerEmail,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInputEmail = (e) => {
    setError(null);
    setEmail(e.target.value);
  };

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('You should input your email');
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setError('Invalid email type');
    } else {
      dispatch(addHistory(true));
      dispatch(setCheckerEmail(email));
      setEmail('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 7 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="py-2 flex flex-col md:flex-row md:items-center"
          style={step >= 7 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Email address"
            fullWidth
            autoComplete="off"
            value={email.toLowerCase()}
            onChange={handleChangeInputEmail}
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
          By providing your email you agree to receive notification messages
          from <b>{dealerName}</b> to the provided email address.
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 7 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        <p>{checkerEmail}</p>
<MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );

  return (
    <>
      {step > 5 ? (
        <>
          {history[6] == true ? (
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
export default InputEmail;
