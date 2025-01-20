import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setDriverNumber,
  setDriverDate,
  setDriverState,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const License = () => {
  const { step } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [driverNumber, setdriverNumber] = useState('');
  const [driverDate, setdriverDate] = useState('');
  const [driverState, setdriverState] = useState('');
  const [error, setError] = useState('');

  const handleDriverNumber = (e) => {
    if (/^[0-9a-zA-Z-]+$/.test(e.target.value) || !e.target.value.trim()) {
      setdriverNumber(e.target.value);
      setError('');
    }
  };

  const handleDriverDate = (value) => {
    setError('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 2000 || Number(year) > 2100) {
      setError('*Invalid Date');
    }
    setdriverDate(year + '-' + String(month) + '-' + date);
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
                paddingTop: '10px',
                fontSize: '16px',
              },
            }}
            disabled={step >= 11 ? true : false}
          />
          <TextField
            style={{ marginBottom: '10px' }}
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
                paddingTop: '10px',
                fontSize: '16px',
              },
            }}
            disabled={step >= 11 ? true : false}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker']} minDate="2000-01-01">
              <DatePicker
                label="driver expieration date"
                onChange={(newValue) => handleDriverDate(newValue)}
                className="w-full"
              />
            </DemoContainer>
          </LocalizationProvider>

          <p className="bg-gray-50 rounded-3xl p-4 mt-2">
            Please input expieration date.
          </p>

          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 11 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 9 ? renderDescription() : null}</>;
};
export default License;
