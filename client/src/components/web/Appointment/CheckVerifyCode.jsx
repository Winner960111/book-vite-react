import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkVerification, usersStatus } from '../../../api/index';
import { addHistory, setIntentID, setProgress } from '../../../store/reducers/checker';
import { TextField } from '@mui/material';

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
          page: 'Full',
          last_question: '0',
        };
        const intentRes = await usersStatus(data);
        dispatch(setIntentID(intentRes.data.id));
        console.log('this is intent ID===>', intentRes.data.id);
        dispatch(addHistory(true));
        dispatch(setProgress());
      } else {
        setError('Invalid verification code. Please try again.');
      }
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="w-2/6 text-4xl my-3 mt-36 font-medium">
        <b>Check your verify code</b>
      </p>
      <form
        onSubmit={handleSubmit}
        className={
          ' w-2/6 text-justify bg-white rounded-3xl px-8 pt-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
        }
      >
        <div className="py-2 flex flex-col items-center">
          <TextField
            helperText=" "
            id="demo-helper-text-aligned-no-helper"
            label="Verify Code"
            autoFocus
            value={verifyCode}
            onChange={handleChangeInput}
            fullWidth
            type="text"
            InputProps={{
              style: {
                height: '70px', // Set the height of the TextField
                fontSize: '25px',
                textAlign: 'center'
              },
            }}
            InputLabelProps={{
              style: {
                textAlign: 'center',
                fontSize: '25px'
              },
            }}
          />
          {error !== '' ? (
            <p className="text-red-500 pl-2 text-sm">{error}</p>
          ) : null}
        </div>
        <p className=" bg-gray-50 rounded-3xl p-4">
          We sent a verification code to the mobile number you provided, please
          enter the code.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
        >
          CONFIRM
        </button>
      </form>
    </div>
  );
};
export default CheckVerifyCode;
