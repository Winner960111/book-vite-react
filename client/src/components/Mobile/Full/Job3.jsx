import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setJobSalary,
  setJobstatus,
  setJobYear,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Job3 = () => {
  const {
    step,
    history,
    jobSalary,
    jobstatus,
    jobYear,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [date, setDate] = useState('');
  const [pay, setPay] = useState('');
  const [jobKind, setJobKind] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setDate('');
    setPay('');
    setJobKind('');
  }, []);

  useEffect(() => {
    console.log("this is job kind===>", jobKind)
  }, [jobKind])

  const handleEDate = (value) => {
    setError('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 2000 || Number(year) > 2100) {
      setError('*Invalid Date');
    }
    setDate(year + '-' + String(month) + '-' + date);
  };

  const handlePay = (e) => {
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setPay(e.target.value)
    }
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!pay) {
      setError('*Salary field is Required');
    } else if (!/^[+-]?\d+(\.\d*)?$/.test(pay)) {
      setError('*Not supported format in Salary');
    }
    if (!jobKind) {
      setError('*Job kind is required');
    }
    if (!date) {
      setError('*Date is required');
    }
    if (error == '') {
      dispatch(addHistory(true));
      dispatch(setJobstatus(jobKind));
      dispatch(setJobYear(date));
      dispatch(setJobSalary(pay));
    }
  };
  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 23 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          What is your current job information?
        </p>
        <div
          className="my-2 flex flex-col items-center"
          style={step >= 23 ? { display: 'none' } : { display: 'block' }}
        >
          <div className="w-[95%] mx-2">
            <TextField
              variant="standard"
              defaultValue="Normal"
              margin="dense"
              label="Salary"
              fullWidth
              autoComplete="off"
              value={pay}
              onChange={handlePay}
              InputProps={{
                style: {
                  fontSize: '25px',
                  height: '50px',
                },
              }}
              InputLabelProps={{
                style: {
                  paddingTop: '10px',
                  fontSize: '16px',
                },
              }}
            />
            <FormControl
              variant="filled"
              sx={{ marginTop: '10px', width: '100%', marginBottom: '10px' }}
            >
              <InputLabel
                id="demo-simple-select-standard-label"
                style={{ fontSize: '15px', paddingRight:'10px' }}
              >
                Are you full time or part time?
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                onChange={(e) => {
                  setJobKind(e.target.value);
                }}
              >
                <MenuItem value={'Full Time'}>Full time</MenuItem>
                <MenuItem value={'Part Time'}>Part time</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker']}
                minDate="2000-01-01"
              >
                <DatePicker
                  label="Start Date"
                  onChange={(newValue) => handleEDate(newValue)}
                  className="w-full"
                />
              </DemoContainer>
            </LocalizationProvider>
            <p className="bg-gray-50 rounded-3xl p-4 mt-2">
              Approximately, when did you start working here?
            </p>
          </div>

          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 23 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );
  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        Salary:{jobSalary}
        <br />
        Job kind:{jobstatus}
        <br />
        Start working date: {jobYear}
      </div>
    </div>
  );
  return (
    <>
      {step > 21 ? (
        <>
          {history[22] == true ? (
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
export default Job3;
