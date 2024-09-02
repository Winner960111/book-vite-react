import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setUSCitizen,
  setBankrupcy,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const InputRelation = () => {
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
        last_question: '6',
      };
      const res = await usersUpdate(data, intentID);
      'this is update results ====>', res;
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
      setError('The last name field is required');
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
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
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
