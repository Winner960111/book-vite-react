import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setIncomeAmount,
  setSourceIncome,
  setIncomeFrequency,
  removeHistory,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect } from 'react';
import { MdModeEditOutline } from "react-icons/md";

const Income = () => {
  const {
    incomeAmount,
    sourceIncome,
    step,
    history,
    confirm,
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

  const editFunction = () => {
    dispatch(removeHistory())
  }

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
              style={{ fontSize: '16px' }}
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
                fontSize: '16px',
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
                fontSize: '16px',
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
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        Amount of income:{incomeAmount}
        <br />
        Source of income: {sourceIncome}
        <MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />
      </div>
    </div>
  );
  return (
    <>
      {step > 26 ? (
        <>
          {history[27] == true ? (
            <>
            {confirm == "No"? null:
              (<>
                {renderDescription()}
              {renderReply()}
              </>
              )
            }
            </>
          ) : (
            renderDescription()
          )}
        </>
      ) : null}
    </>
  );
};
export default Income;
