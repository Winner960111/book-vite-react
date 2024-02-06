import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setCheckerBirthday,
} from '../../../store/reducers/checker';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';

const InputBirthday = () => {
  const { step, history, checkerBirthday } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInputBirthday = (e) => {
    setError(null);
    setBirthday(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!birthday.trim()) {
      setError('You should input your birthday');
    } else {
      dispatch(addHistory(true));
      dispatch(setCheckerBirthday(birthday));
      setBirthday('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 9 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <input
          type="date"
          className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
          autoFocus
          value={birthday}
          onChange={handleChangeInputBirthday}
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        />
        {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        <p
          className="bg-gray-100 rounded-3xl p-4 mt-2"
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        >
          Please input your date of birth.
        </p>
        <p className="bg-gray-100 rounded-3xl p-4 mt-2">
          Your Privacy Matters: Rest assured, the information you provide is
          strictly confidential. We take your privacy seriously and only use
          your details to enhance your experience with us.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-sm md:text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        <p>{checkerBirthday}</p>
      </div>
    </div>
  );

  return (
    <>
      {step > 7 ? (
        <>
          {history[8] == true ? (
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
export default InputBirthday;
