import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setAppointDate,
  setAppointTime,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import { usersUpdate } from '../../../api/index';

const SendPhoneVerificationCode = () => {

  const { history, step, appointDate, appointTime, dealerId, deviceIP, deviceOS,
    deviceCity,
    deviceCountry,
    deviceState,
    deviceDate,
    deviceLat,
    deviceLon,
    deviceBrowser,
    type,
    checkerMobileNumber, intentID } =
    useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [errorDate, setErrorDate] = useState(null);
  const [errorTime, setErrorTime] = useState(null);

  useEffect(() => {
    setErrorDate(null);
    setErrorTime(null);
    setAppointmentDate(null);
    setAppointmentTime(null);
  }, [step]);

  const handleSubmit = async (e) => {
    let pass = 0
    e.preventDefault();

    if (!appointmentDate) {
      setErrorDate('*Required')
    } else {
      pass += 1
    }
    if (!appointmentTime) {
      setErrorTime('*Required')
    } else {
      pass += 1
    }

    console.log("this is date and time====>", appointmentDate, appointmentTime)
    if (pass == 2) {
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
        page: 'Book Appointment',
        last_question: '1',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setAppointDate(appointmentDate))
      dispatch(setAppointTime(appointmentTime))
    }
  }

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'flex flex-col text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 4 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="py-2 flex flex-col md:flex-row md:items-center"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label=""
            fullWidth
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            type="date"
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
          {errorDate !== '' ? <p className="text-red-500 pl-2">{errorDate}</p> : null}
        </div>
        <div
          className="py-2 flex flex-col md:flex-row md:items-center"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label=""
            fullWidth
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            type="datetime-local"
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
          {errorTime !== '' ? <p className="text-red-500 pl-2">{errorTime}</p> : null}
        </div>
        <b className="bg-gray-100 rounded-3xl p-4 w-full">
          When would you like to appointment?
        </b>
        <button
          type='submit'
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
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
        {appointDate}<br />
        {appointTime}
      </div>
    </div>
  );

  return (
    <>
      {step > 2 ? (
        <>
          {/* Check if history at index 1 is true */}
          {history[3] === true ? (
            <>
              {/* Render description and reply if history[1] is true */}
              {renderDescription()}
              {renderReply()}
            </>
          ) : (
            <>
              {/* Otherwise, render only description */}
              {renderDescription()}
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default SendPhoneVerificationCode;
