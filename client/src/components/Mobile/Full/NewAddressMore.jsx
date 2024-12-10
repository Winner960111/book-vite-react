import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setResidentalYears,
  setResidentalMonths,
  setResidentalStatus,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const NewInterestMore = () => {
  const {
    step,
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
    setError('')
    if (
      (/^[0-9]+$/.test(e.target.value) && String(e.target.value).length <= 2) ||
      !e.target.value.trim()
    ) {
      setResidentalYear(e.target.value);
    }
  };

  const handleMonth = (e) => {
    setError('')
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
    if (!residentalYear.trim()) {
      setError('*Year is required')
    } else if (residentalYear > 100 || residentalYear < 1) {
      setError('*Invalid Year');
    } else {
      pass += 1;
    }
    if (!residentalMonth) {
      setError('*Month is required');
    } else if (residentalMonth > 12 || residentalMonth < 1) {
      setError('*Invalid Month');
    } else {
      pass += 1;
    }
    if (pass == 3) {
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
      //   last_question: '12',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setResidentalMonths(residentalMonth));
      dispatch(setResidentalYears(residentalYear));
      dispatch(setResidentalStatus(residental));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 16 ? 'text-slate-400' : 'text-slate-800'
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
              disabled={step >= 16 ? true : false}
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
            label="Year"
            autoComplete='off'
            value={residentalYear}
            style={{ margin: '0 10px 0 10px', width: '95%' }}
            onChange={(e) => {
              handleYear(e);
            }}
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
            disabled={step >= 16 ? true : false}
          />

          <TextField
            variant="standard"
            defaultValue="Normal"
            margin="dense"
            label="Month"
            autoComplete='off'
            value={residentalMonth}
            style={{ margin: '0 10px 0 10px', width: '95%' }}
            onChange={(e) => {
              handleMonth(e);
            }}
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
            disabled={step >= 16 ? true : false}
          />
          <p className="bg-gray-50 rounded-3xl p-4 mt-2">
            How long have you lived at your current address?
          </p>
          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 16 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 14 ? renderDescription() : null}</>;
};
export default NewInterestMore;
