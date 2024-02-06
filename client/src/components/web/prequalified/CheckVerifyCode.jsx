import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkVerification } from '../../../api';
import { addHistory } from '../../../store/reducers/checker';

const CheckVerifyCode = () => {
  const [verifyCode, setVerifyCode] = useState('');
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
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }
  };

  return (
    <div className="w-full flex justify-center mt-44">
      <form
        onSubmit={handleSubmit}
        className={
          ' w-2/5 text-justify bg-white rounded-3xl p-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg'
        }
      >
        <div className="py-2 flex flex-col items-center">
          <input
            type="tel"
            className="w-full h-20 rounded-md text-center text-sm md:text-lg border my-5"
            autoFocus
            placeholder="Verify Code"
            value={verifyCode}
            onChange={handleChangeInput}
          />
          {error !== '' ? (
            <p className="text-red-500 pl-2 text-sm">{error}</p>
          ) : null}
        </div>
        <p className=" bg-gray-100 rounded-3xl p-4">
          <b>
            We sent a verification code to the mobile number you provided,
            please enter the code below.
          </b>
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
        >
          CONFIRM
        </button>
      </form>
    </div>
  );
};
export default CheckVerifyCode;
