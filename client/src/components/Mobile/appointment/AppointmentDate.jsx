import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setAppointDate,
  setAppointTime,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { usersStatus } from '../../../api/index';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

const AppointmentDate = () => {
  const {
    history,
    step,
    appointDate,
    appointTime,
    dealerId,
    checkerMobileNumber,
  } = useSelector((state) => state.checker);
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

  const handleDate = (value) => {
    const currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let wrong = false;
    setErrorDate('');
    let year, month, date, temp;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;

    if (Number(year) < Number(currentYear)) {
      wrong = true;
      setErrorDate('*Invalid Date');
      console.log('Year is wrong');
    } else if (
      Number(year) == Number(currentYear) &&
      Number(month - 1) < Number(currentMonth)
    ) {
      wrong = true;
      console.log('Month is wrong');
    } else if (
      Number(year) == Number(currentYear) &&
      Number(month - 1) == Number(currentMonth) &&
      Number(date) < Number(currentDay)
    ) {
      wrong = true;
    }
    if (wrong == false) {
      if (month < 10) {
        temp = '0' + String(month);
      } else {
        temp = String(month);
      }
      setAppointmentDate(temp + '/' + date + '/' + year);
    } else {
      setErrorDate('*Invalid Date');
    }
  };

  const handleTime = (value) => {
    if (!appointmentDate) {
      setErrorTime('*Input Date first');
    } else {
      setErrorTime('');
      let hour = value.$H;
      let min = value.$m;
      console.log('this is timepicker===>', hour, min);
      if (Number(hour) < 9 || Number(hour) > 18) {
        setErrorTime('*invalid Time');
      } else {
        setAppointmentTime(hour + ':' + min);
      }
    }
  };

  useEffect(() => {
    console.log('this is appointment==>', appointmentDate, appointmentTime);
  }, [appointmentDate, appointmentTime]);

  const handleSubmit = async (e) => {
    let pass = 0;
    e.preventDefault();

    if (!appointmentDate) {
      setErrorDate('*Required');
    } else {
      pass += 1;
    }
    if (!appointmentTime) {
      setErrorTime('*Required');
    } else {
      pass += 1;
    }

    console.log('this is date and time====>', appointmentDate, appointmentTime);
    if (pass == 2) {
      // const data = {
      //   dealer_id: dealerId,
      //   device_ip_address: deviceIP,
      //   device_operating_system: deviceOS,
      //   device_browser: deviceBrowser,
      //   device_type: type,
      //   device_state: deviceState,
      //   device_city: deviceCity,
      //   device_country: deviceCountry,
      //   device_date_time: deviceDate,
      //   device_lat: deviceLat,
      //   device_lon: deviceLon,
      //   status: 'Started',
      //   lang: 'EN',
      //   phone: checkerMobileNumber,
      //   page: 'Book Appointment',
      //   last_question: '1',
      // };
      const data = {
        dealer_id: dealerId,
        mobile_phone: checkerMobileNumber,
        source: 'Dropout',
      };
      const res = await usersStatus(data);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setAppointDate(appointmentDate));
      dispatch(setAppointTime(appointmentTime));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 4 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4 text-left mb-5">
          <b>🎊 Congratulation! you successfully verified.</b>
        </p>
      </div>
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker']}
              minDate="1900-01-01"
              maxDate="2100-01-01"
            >
              <DatePicker
                label="Appointment Date"
                onChange={(newValue) => handleDate(newValue)}
                className="w-full"
              />
            </DemoContainer>
          </LocalizationProvider>
          {errorDate !== '' ? (
            <p className="text-red-500 pl-2">{errorDate}</p>
          ) : null}
        </div>
        <div
          className="py-2 flex flex-col md:flex-row md:items-center"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['TimePicker']}>
              <TimePicker
                label="Appointment Time"
                onChange={(newValue) => handleTime(newValue)}
                className="w-full"
              />
            </DemoContainer>
          </LocalizationProvider>
          {errorTime !== '' ? (
            <p className="text-red-500 pl-2">{errorTime}</p>
          ) : null}
        </div>
        <b className="bg-gray-100 rounded-3xl p-4 w-full">
          When would you like to appointment?
        </b>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        {appointDate}
        <br />
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

export default AppointmentDate;
