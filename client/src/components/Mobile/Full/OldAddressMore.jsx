import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setPreviousResidentalYears,
  setPreviousResidentalMonths,
  setPreviousResidentalStatus,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const OldAddressMore = () => {
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

  const [residental, setResidental] = useState('');
  const [residentalYear, setResidentalYear] = useState('');
  const [residentalMonth, setResidentalMonth] = useState('');

  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setResidental('');
    setResidentalMonth('');
    setResidentalYear('');
  }, []);

  const handleYear = (e) => {
    setError('');
    if (
      (/^[0-9]+$/.test(e.target.value) && String(e.target.value).length <= 2) ||
      !e.target.value.trim()
    ) {
      setResidentalYear(e.target.value);
    }
  };

  const handleMonth = (e) => {
    setError('');
    if (
      (/^[0-9]+$/.test(e.target.value) && String(e.target.value).length <= 2) ||
      !e.target.value.trim()
    ) {
      setResidentalMonth(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let pass = 0;
    if (!residental) {
      setError('*Status is required');
    } else {
      pass += 1;
    }
    if (!residentalYear) {
      setError('*Year is required');
    } else {
      pass += 1;
    }
    if (!residentalMonth) {
      setError('*Month is required');
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
        last_question: '15',
      };
      const res = await usersUpdate(data, intentID);
      'this is update results ====>', res;
      dispatch(addHistory(true));
      dispatch(setPreviousResidentalMonths(residentalMonth));
      dispatch(setPreviousResidentalYears(residentalYear));
      dispatch(setPreviousResidentalStatus(residental));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 19 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="my-2 flex flex-col items-center">
          <FormControl variant="filled" sx={{ my: 1, width: '100%' }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ fontSize: '15px' }}
            >
              Residental status
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={residental}
              onChange={(e) => {
                setResidental(e.target.value);
              }}
              disabled={step >= 19 ? true : false}
            >
              <MenuItem value={'Rent'}>Rent</MenuItem>
              <MenuItem value={'Own'}>Own</MenuItem>
              <MenuItem value={'Family'}>Family</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </FormControl>
          {/* <p className="bg-gray-50 rounded-3xl p-4 mt-2">
            What is your residental status in this address?
          </p> */}
          <TextField
            variant="standard"
            defaultValue="Normal"
            margin="dense"
            autoComplete="off"
            label="Year"
            value={residentalYear}
            style={{ margin: '0 10px 0 10px', width: '95%' }}
            onChange={handleYear}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '20px',
              },
            }}
            disabled={step >= 19 ? true : false}
          />
          <TextField
            variant="standard"
            defaultValue="Normal"
            margin="dense"
            autoComplete="off"
            label="Month"
            value={residentalMonth}
            style={{ margin: '0 10px 0 10px', width: '95%' }}
            onChange={handleMonth}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '20px',
              },
            }}
            disabled={step >= 19 ? true : false}
          />
          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          How long did you live at your previous address?
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 19 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 17 ? renderDescription() : null}</>;
};
export default OldAddressMore;
