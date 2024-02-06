import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerFirstName,
} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';

const InputFirstName = () => {
  
  const dispatch = useDispatch();
  const { step, history, checkerFirstName } = useSelector(
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

  const handleSubmit = (e) => {
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
          step >= 4 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          <p className="bg-gray-100 rounded-3xl p-4 text-left">
            <b>🎊 Congratulation! you successfully verified.</b>
          </p>
          <input
            type="text"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            autoFocus
            placeholder="first name"
            value={firstName}
            onChange={handleChangeInput}
          />
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-100 rounded-3xl p-4">
          Please enter your first name.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {checkerFirstName}
      </div>
    </div>
  );

  return (
    <>
      {step > 2 ? (
        <>
          {history[3] == true ? (
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
