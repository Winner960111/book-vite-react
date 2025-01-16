import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setIDate,
  setIIsuer,
  setIType,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const Paymethod = () => {
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

  const [eDate, seteDate] = useState('');
  const [payType, setPayType] = useState('');
  const [isuer, setIsuer] = useState('');
  const [error, setError] = useState('');

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
    seteDate(year + '-' + String(month) + '-' + date);
  };

  const handlePayType = (e) => {
    setPayType(e.target.value);
    setError('');
  };
  const handleIsuer = (e) => {
    setIsuer(e.target.value);
    setError('');
  };

  useEffect(() => {
    setError(null);
    setPayType('');
    setIsuer('');
    seteDate('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pass = 0;
    if (!eDate) {
      setError('*input your expiration date');
    } else {
      pass += 1;
    }
    if (!payType) {
      setError('*Select option in Type');
    } else {
      pass += 1;
    }
    if (payType != 'other' && !isuer) {
      setError('*select option in Isuer');
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
      //   last_question: '8',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
      dispatch(setIDate(eDate));
      dispatch(setIIsuer(isuer));
      dispatch(setIType(payType));
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
          step >= 12 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="my-2 flex flex-col items-center">
          <FormControl
            variant="filled"
            sx={{ m: 1, minwidth: 120, width: '100%' }}
          >
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ fontSize: '15px' }}
            >
              Select a second proof of identity
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={payType}
              onChange={handlePayType}
              disabled={step >= 12 ? true : false}
            >
              <MenuItem value={'credit'}>Credit Card</MenuItem>
              <MenuItem value={'other'}>Other</MenuItem>
            </Select>
          </FormControl>
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 120, width: '100%' }}
          >
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ fontSize: '15px' }}
            >
              issuer
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={isuer}
              onChange={handleIsuer}
              disabled={step >= 12 ? true : false}
            >
              {/* <MenuItem value=" " style={{ height: '40px' }}>
                <em> </em>
              </MenuItem> */}
              <MenuItem value={'visa'}>VISA</MenuItem>
              <MenuItem value={'mastercard'}>MasterCard</MenuItem>
              <MenuItem value={'amex'}>AMEX</MenuItem>
              <MenuItem value={'discover'}>Discover</MenuItem>
            </Select>
          </FormControl>
          <div className="flex flex-col w-[95%] my-3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={['DatePicker']}
                minDate="2000-01-01"
              >
                <DatePicker
                  label="Expiration Date"
                  onChange={(newValue) => handleEDate(newValue)}
                  className="w-full"
                />
              </DemoContainer>
            </LocalizationProvider>
            <p className="bg-gray-50 rounded-3xl p-4 mt-2">
              Please input expieration date.
            </p>
          </div>
          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 12 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 10 ? renderDescription() : null}</>;
};
export default Paymethod;
