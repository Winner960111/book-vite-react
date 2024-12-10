import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setCheckerBirthday,
} from '../../../store/reducers/checker';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
// import { usersUpdate } from '../../../api/index';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const InputBirthday = () => {
  const { 
    step,
    history,
    checkerBirthday,
    // intentID,
    // dealerId,
    // deviceIP,
    // deviceOS,
    // deviceCity,
    // deviceCountry,
    // deviceState,
    // deviceDate,
    // deviceLat,
    // deviceLon,
    // deviceBrowser,
    // type,
    // checkerMobileNumber,
   } = useSelector(
      (state) => state.checker
    );
  const dispatch = useDispatch();

  const [birthday, setBirthday] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleBirthday = (value) => {
    setError('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 1900 || Number(year) > 2100) {
      setError('*Invalid Date');
    }
    setBirthday(year + '-' + String(month) + '-' + date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!birthday.trim()) {
      setError('You should input your birthday');
    } else {
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
      //   page: 'Short',
      //   last_question: '6',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
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
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={['DatePicker']}
              minDate="1900-01-01"
              maxDate="2100-01-01"
            >
              <DatePicker
                label="Birthday"
                onChange={(newValue) => handleBirthday(newValue)}
                className="w-full"
              />
            </DemoContainer>
          </LocalizationProvider>
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p
          className="bg-gray-50 rounded-3xl p-4 mt-2"
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        >
          Please input your date of birth.
        </p>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Your Privacy Matters: Rest assured, the information you provide is
          strictly confidential. We take your privacy seriously and only use
          your details to enhance your experience with us.
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md px-16 py-4 text-black hover:bg-black hover:text-white font-medium text-lg mt-2"
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-sm md:text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
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
