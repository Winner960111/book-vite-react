import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setCheckerBirthday,
} from '../../../store/reducers/checker';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material';
const InputBirthday = () => {
  const { step, history, checkerBirthday, intentID,
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
    checkerMobileNumber, } = useSelector(
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!birthday.trim()) {
      setError('You should input your birthday');
    } else {
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
        page: 'Short',
        last_question: '6',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
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
          <TextField
            id="outlined-multiline-flexible"
            label=""
            fullWidth
            value={birthday}
            onChange={handleChangeInputBirthday}
            type="date"
            autoFocus
            InputProps={{
              style: {
                color: 'blue', // Change text color
                height: '70px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                color: '#854fff', // Change label color
                fontSize: '25px',
              },
            }}
          />
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
