import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setDriverNumber,
  setDriverDate,
  setDriverState,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';

const License = () => {
  const {
    step,
    intentID,
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
    checkerMobileNumber,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [driverNumber, setdriverNumber] = useState('');
  const[driverDate, setdriverDate] = useState('');
  const [driverState, setdriverState] = useState('');
  const [error, setError] = useState('')

  const handleDriverNumber = (e) => {
    setdriverNumber(e.target.value);
    setError('');
  };
  const handleDriverDate = (e) => {
    setdriverDate(e.target.value);
    setError('');
  };
  const handleDriverState = (e) => {
    setdriverState(e.target.value);
    setError('');
  };

  useEffect(() => {
    setError(null);
  }, [step]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    let pass = 0;
    if (!driverNumber) {
      setError('*Driver License is required');
    } else {
      pass += 1;
    }
    if (!driverDate) {
      setError('*Date is required');
    } else {
      pass += 1;
    }
    if (!driverState) {
      setError('*State is required');
    } else if (!/^[A-Za-z]+$/.test(driverState)) {
      setError('*Contains only characters in State');
    } else {
      pass += 1;
    }
    if (pass == 3) {
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
        last_question: '7',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(setDriverNumber(driverNumber));
      dispatch(setDriverDate(driverDate));
      dispatch(setDriverState(driverState));
      dispatch(addHistory(true));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 11 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="my-2 flex flex-col md:flex-row md:items-center">
          <TextField
            value={driverNumber}
            onChange={handleDriverNumber}
            fullWidth
            label="Driver license number"
            variant="standard"
            autoComplete="off"
            InputProps={{
              style: {
                height: '50px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '25px',
              },
            }}
            disabled={step >= 11 ? true : false}
          />
          <TextField
            value={driverState}
            onChange={handleDriverState}
            fullWidth
            label="State"
            variant="standard"
            autoComplete="off"
            InputProps={{
              style: {
                height: '50px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '25px',
              },
            }}
            disabled={step >= 11 ? true : false}
          />
          <TextField
            value={driverDate}
            onChange={handleDriverDate}
            fullWidth
            label=" "
            type="date"
            variant="standard"
            autoComplete="off"
            InputProps={{
              style: {
                height: '50px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '25px',
              },
            }}
            disabled={step >= 11 ? true : false}
          />
          <p className="bg-gray-50 rounded-3xl p-4 mt-2">
            Please input expieration date.
          </p>

          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        {/* <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please input correct info.
        </p> */}
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 11 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

return (
  <>
    {step > 9 ? (
          renderDescription()
    ) : null}
  </>
);
};
export default License;
