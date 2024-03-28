import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setMileageHour,

} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { usersUpdate } from '../../../api/index';
import TextField from '@mui/material/TextField';

const Mileage = () => {
  const { step, history, intentID,
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

  const [year, setYear] = useState('');
  const [error, setError] = useState('')
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setError("")
  };

  useEffect(() => {
    setError('')
    setYear('')
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();

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
      last_question: '7',
    };
    const res = await usersUpdate(data, intentID);
    console.log('this is update results ====>', res);
    if (!year) {
      setError("Required")
    } else if (!/^[0-9]+$/.test(year)) {
      setError("*only number")
    } else {
      dispatch(addHistory(true));
      dispatch(setMileageHour(year))
    }
  }

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 10 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="margin-dense"
            margin="dense"
            label="Mileage hour"
            fullWidth
            autoFocus
            value={year}
            onChange={handleYearChange}
            type="text"
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
        </div>
        {error !== '' ? (
          <p className="text-red-500 pl-2 text-sm">{error}</p>
        ) : null}
        <p className="bg-gray-50 rounded-3xl p-4">
          How much mileage hour?
        </p>

        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {year}
      </div>
    </div>
  );

  return (
    <>
      {step > 8 ? (
        <>
          {history[9] == true ? (
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
export default Mileage;
