import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setInstantYear,
  setInstantMake,
  setInstantModel,
  setPayDown,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';

const Interest = () => {
  const {
    step,
    vehicleYear,
    vehicleMake,
    vehicleModel,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [error, setError] = useState('');
  const [year, setYear] = useState(vehicleYear);
  const [make, setMake] = useState(vehicleMake);
  const [model, setModel] = useState(vehicleModel);
  console.log("this is ==========>", vehicleYear, vehicleMake, vehicleModel);
  const [pay, setPay] = useState('');

  useEffect(() => {
    setError('');
  }, []);

  const handleYear = (e) => {
    setError('')
    if (
      (/^[0-9]+$/.test(e.target.value) && String(e.target.value).length <= 4) ||
      !e.target.value.trim()
    ) {
      setYear(e.target.value);
    }
  };

  const handlePay = (e) => {
    setError('');
    setPay(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pass = 0;
    if (!pay) {
      setError('*Pay item is Required');
    } else if (!/^[+-]?\d+(\.\d*)?$/.test(pay)) {
      setError('*Not supported format in Pay item');
    } else {
      pass += 1;
    }
    if (!year.trim()) {
      setError('*Required Year')
    } else if (year > 2100 || year < 1900) {
      setError('*Invalid Year');
    } else {
      pass += 1;
    }
    if (pass == 2) {
      dispatch(setInstantYear(year));
      dispatch(setInstantMake(make));
      dispatch(setInstantModel(model));
      dispatch(setPayDown(pay));
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
      //   page: 'Full',
      //   last_question: '10',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
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
          step >= 14 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="my-2 flex flex-col items-center">
          <TextField
            variant="standard"
            margin="dense"
            label="Year"
            fullWidth
            style={{ margin: '10px' }}
            value={year}
            autoComplete="off"
            onChange={(e) => handleYear(e)}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '16px',
              },
            }}
            disabled={step >= 14 ? true : false}
          />
          <TextField
            variant="standard"
            margin="dense"
            label="Make"
            autoComplete="off"
            fullWidth
            style={{ margin: '10px' }}
            value={make}
            onChange={(e) => setMake(e.target.value)}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '16px',
              },
            }}
            disabled={step >= 14 ? true : false}
          />
          <TextField
            variant="standard"
            label="Model"
            autoComplete="off"
            fullWidth
            style={{ margin: '10px' }}
            margin="dense"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            type="text"
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '16px',
              },
            }}
            disabled={step >= 14 ? true : false}
          />
          <TextField
            id="standard-basic"
            variant="standard"
            margin="dense"
            label="What will you down payment be?"
            autoComplete="off"
            fullWidth
            value={pay}
            onChange={handlePay}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '16px',
              },
            }}
            disabled={step >= 14 ? true : false}
          />
          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          What vehicle are you interested in?
          <br />
          *If no down payment, please type 0.
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 14 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 12 ? renderDescription() : null}</>;
};
export default Interest;
