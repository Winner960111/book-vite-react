import BotIcon from './BotIcon';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkVerification, usersStatus } from '../../../api/index';
import { addHistory, setIntentID } from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import verify from '../../../assets/verify.png';
import OtpInput from 'react-otp-input';

const CheckPhoneVerificationCode = () => {
  const [verifyCode, setVerifyCode] = useState('');
  const [temp, setTemp] = useState('');
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
          page: 'Get Quote',
          last_question: '0',
        };
        const intentRes = await usersStatus(data);
        dispatch(setIntentID(intentRes.data.id));
        console.log('this is intent ID===>', intentRes.data.id);
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
          className="w-full flex flex-col justify-center items-center py-2"
          style={step >= 3 ? { display: 'none' } : { display: 'block' }}
        >
          <div className='flex justify-center'>
            <img className="w-40" src={verify} alt="verify icon" />
          </div>
          <div className="flex justify-center">

            <OtpInput
              value={verifyCode}
              onChange={setVerifyCode}
              numInputs={6}
              renderSeparator={<span>&nbsp; - &nbsp;</span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    border: '1px solid black',
                    width: '40px',
                    height: '55px',
                    borderRadius: '10px',
                    fontSize: '30px',
                    textAlign: 'center',
                  }}
                />
              )}
            />
          </div>
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4">
          We Call or Text a one-time access code to the mobile number you
          provided.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 3 ? { display: 'none' } : { display: 'block' }}
        >
          VERIFY
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
