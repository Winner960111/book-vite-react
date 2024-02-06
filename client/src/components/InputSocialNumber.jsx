import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHistory, setCheckerSocialNumber } from '../store/reducers/checker';
import BotIcon from './BotIcon';
import { classNames } from '../utils';

const InputSocialNumber = () => {
  const { step, history, checkerSocialNumber } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [socialNumber, setSocialNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const hideCheckerSocialNumber = () => {
    return `xxx-xx-${checkerSocialNumber.slice(-4)}`;
  }

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

  const handleSubmit = (e) => {
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
        <input
          type="text"
          className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
          placeholder="Social security number"
          autoFocus
          value={socialNumber}
          onChange={handleChangeInputSocialNumber}
          style={
            history[7] == true ? { display: 'none' } : { display: 'block' }
          }
        />
        {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        <p className="bg-gray-100 rounded-3xl p-4 mt-2">
          We will not hurt your credit report. This is not an application for
          credit. Authorization is solely for prequalification only.
        </p>

        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        <p>{hideCheckerSocialNumber(checkerSocialNumber)}</p>
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
