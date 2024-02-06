import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { addHistory, setCheckerLastName } from '../store/reducers/checker';
import { classNames } from '../utils';

const InputLastName = () => {
  const { step, history, checkerLastName } = useSelector(
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
          <input
            type="text"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            autoFocus
            placeholder="last name"
            value={lastName}
            onChange={handleChangeInput}
          />
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-100 rounded-3xl p-4 mt-2">
          Please enter your last name.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 6 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {checkerLastName}
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
