import BotIcon from './BotIcon';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkVerification } from '../../../api';
import { addHistory } from '../../../store/reducers/checker';
import { classNames } from '../../../utils';

const CheckPhoneVerificationCode = () => {
  const [verifyCode, setVerifyCode] = useState('');
  const [temp, setTemp] = useState('');
  const { checkerMobileNumber, step, history, dealerId } = useSelector(
    (state) => state.checker
  );
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInput = (e) => {
    setVerifyCode(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!verifyCode.trim()) {
      setError('You should input verification code');
    } else if (!/^[0-9]+$/.test(verifyCode)) {
      setError('The verification code contains only numbers');
    } else {
      // const res = await checkVerification(
      //   checkerMobileNumber,
      //   dealerId,
      //   verifyCode
      // );
      const res = { status: 201 };

      if (res.status === 201) {
        dispatch(addHistory(true));
        setTemp(verifyCode);
        setVerifyCode('');
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 3 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="py-2 flex flex-col md:flex-row md:items-center"
          style={step >= 3 ? { display: 'none' } : { display: 'block' }}
        >
          <input
            type="tel"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            autoFocus
            placeholder="Verify Code"
            value={verifyCode}
            onChange={handleChangeInput}
          />
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-100 rounded-3xl p-4">
          <b>
            We sent a verification code to the mobile number you provided,
            please enter the code below.
          </b>
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 3 ? { display: 'none' } : { display: 'block' }}
        >
          CONFIRM
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {temp}
      </div>
    </div>
  );

  return (
    <>
      {step > 1 ? (
        <>
          <>
            {renderDescription()}
            {history[2] == true ? renderReply() : null}
          </>
        </>
      ) : null}
    </>
  );
};
export default CheckPhoneVerificationCode;
