import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setUSCitizen,
  setBankrupcy,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const InputRelation = () => {
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

  const [citizen, setCitizen] = useState('');
  const [bank, setBank] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setCitizen('');
    setBank('');
  }, []);

  const handleCitizen = (e) => {
    setCitizen(e.target.value);
    setError(null);
  };
  const handleBank = (e) => {
    setBank(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (citizen && bank) {
      if (citizen === 'Yes') {
        dispatch(setUSCitizen(true));
      } else {
        dispatch(setUSCitizen(false));
      }
      if (bank === 'Yes') {
        dispatch(setBankrupcy(true));
      } else {
        dispatch(setBankrupcy(false));
      }
      dispatch(addHistory(true));
    } else {
      setError('Select the essential fields');
    }
  };

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
        <div className="my-2 flex flex-col md:flex-row md:items-center">
          <FormControl variant="filled" sx={{ my: 1, width: '100%' }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ fontSize: '15px' }}
            >
              Are you a U.S citizen?
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={citizen}
              onChange={handleCitizen}
              disabled={step >= 10 ? true : false}
            >
              <MenuItem value={'Yes'}>Yes</MenuItem>
              <MenuItem value={'No'}>No</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ my: 1, width: '100%' }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ fontSize: '15px' }}
            >
              Do you have any bankrupcy?
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={bank}
              onChange={handleBank}
              disabled={step >= 10 ? true : false}
            >
              <MenuItem value={'Yes'}>Yes</MenuItem>
              <MenuItem value={'No'}>No</MenuItem>
            </Select>
          </FormControl>
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please select an option for the questions above.
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 8 ? renderDescription() : null}</>;
};
export default InputRelation;
