import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkVerification, usersStatus } from '../../../api/index';
import { addHistory, setIntentID } from '../../../store/reducers/checker';
import OtpInput from 'react-otp-input';
import verify from '../../../assets/verify.png';

const CheckVerifyCode = () => {
  const [verifyCode, setVerifyCode] = useState('');
  const {
    checkerMobileNumber,
    step,
    history,
    dealerId,
    deviceIP,
    deviceOS,
    deviceCity,
    deviceCountry,
    deviceState,
    deviceDate,
    deviceLat,
    deviceLon,
    deviceBrowser,
    type,
  } = useSelector((state) => state.checker);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setError(null);
  }, [step]);

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
        const data = {
          dealer_id: dealerId,
          device_ip_address: deviceIP,
          device_operating_system: deviceOS,
          device_browser: deviceBrowser,
          device_type: type,
          device_state: deviceState,
          device_city: deviceCity,
          device_country: deviceCountry,
          device_date_time: deviceDate,
          device_lat: deviceLat,
          device_lon: deviceLon,
          status: 'Started',
          lang: 'EN',
          phone: checkerMobileNumber,
          page: 'Trade In',
          last_question: '0',
        };
        const intentRes = await usersStatus(data);
        dispatch(setIntentID(intentRes.data.id));
        'this is intent ID===>', intentRes.data.id;
        dispatch(addHistory(true));
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="w-3/6 text-4xl my-3 mt-10 font-medium">
        <b>Check your verify code</b>
      </p>
      <form
        onSubmit={handleSubmit}
        className={
          ' w-3/6 text-justify bg-white rounded-3xl px-8 pt-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
        }
      >
        <div className="py-2 flex flex-col items-center">
          <img className=" w-52" src={verify} alt="verify icon" />
          <OtpInput
            value={verifyCode}
            onChange={setVerifyCode}
            numInputs={6}
            renderSeparator={<span>&nbsp; - &nbsp;</span>}
            shouldAutoFocus
            renderInput={(props) => (
              <input
                {...props}
                style={{
                  border: '1px solid black',
                  width: '45px',
                  height: '60px',
                  borderRadius: '10px',
                  fontSize: '30px',
                  textAlign: 'center',
                }}
              />
            )}
          />
          {error !== '' ? (
            <p className="text-red-500 pl-2 text-sm">{error}</p>
          ) : null}
        </div>
        <p className=" bg-gray-50 rounded-3xl p-4">
          We Call or Text a one-time access code to the mobile number you
          provided.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
        >
          VERIFY
        </button>
      </form>
    </div>
  );
};
export default CheckVerifyCode;
