import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setIncomeAmount,
  setSourceIncome,
  setIncomeFrequency
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';

const Confirm = () => {
  const {
    incomeAmount,
    sourceIncome,
    step,
    history,
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
  const [error, setError] = useState('');
  const [amountIncome, setAmountIncome] = useState('');
  const [howIncome, setHowIncome] = useState('');
  const [frequency, setFrequency] = useState('');

  const handleAmountIncome = (e) => {
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setAmountIncome(e.target.value);
    }
    setError('');
  };

  const handleHowIncome = (e) => {
    if (/^[a-zA-Z]+$/.test(e.target.value) || !e.target.value.trim()) {
      setHowIncome(e.target.value);
    }
    setError('');
  };

  const handleFrequency = (e) => {
    setFrequency(e.target.value);
  };

  useEffect(() => {
    setError('');
    setAmountIncome('');
    setHowIncome('');
  }, [step]);

  const handlesubmit = async () => {
    let pass = 0;
    if (!amountIncome.trim()) {
      setError('*Amount field is required');
    } else {
      pass += 1;
    }
    if (!howIncome.trim()) {
      setError('*Source field is required');
    } else {
      pass += 1;
    }
    if (!frequency) {
      setError('*Choose the right option');
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
      //   last_question: '18',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setIncomeAmount(amountIncome));
      dispatch(setSourceIncome(howIncome));
      dispatch(setIncomeFrequency(frequency));
    }
  };
  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 28 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          What is the annually additional income amount you earn?
        </p>
        <div
          className="flex p-2"
          style={step >= 28 ? { display: 'none' } : { display: 'block' }}
        >
          <FormControl variant="filled" sx={{ minWidth: 120, width:"100%" }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ fontSize: '20px' }}
            >
              Extra income frequency
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={frequency}
              onChange={handleFrequency}
            >
              <MenuItem value={'weekly'}>Weekly</MenuItem>
              <MenuItem value={'biweekly'}>Bi-Weekly</MenuItem>
              <MenuItem value={'monthly'}>Monthly</MenuItem>
              <MenuItem value={'Year'}>Year</MenuItem>
            </Select>
          </FormControl>
          <TextField
            value={amountIncome}
            onChange={handleAmountIncome}
            fullWidth
            label="Amount of Income"
            autoComplete="off"
            variant="standard"
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
          />
          <TextField
            value={howIncome}
            onChange={handleHowIncome}
            fullWidth
            label="Source of Income"
            autoComplete="off"
            variant="standard"
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
          />

          {error !== '' && <p className="text-red-500 pl-2">{error}</p>}
        </div>
        <button
          type="button"
          onClick={handlesubmit}
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 28 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );
  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        Amount of income:{incomeAmount}
        <br />
        Source of income: {sourceIncome}
      </div>
    </div>
  );
  return (
    <>
      {step > 26 ? (
        <>
          {history[27] == true ? (
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
export default Confirm;
