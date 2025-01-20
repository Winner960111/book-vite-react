import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerIsSkipMiddleName,
  setQuoteInterest,
removeHistory,

} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import { MdModeEditOutline } from "react-icons/md";

const Vehicle = () => {
  const {
    step,
    history,
    checkerIsSkipMiddleName,
    quoteInterest,
    vehicleMake,
    vehicleModel,
    vehicleYear,
  } = useSelector((state) => state.checker);

  const dispatch = useDispatch();
  const [year, setYear] = useState(vehicleYear);
  const [make, setMake] = useState(vehicleMake);
  const [model, setModel] = useState(vehicleModel);

  const handleYearChange = (e) => {
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      if (e.target.value.length <= 4) {
        setYear(e.target.value);
      }
    }
  };
  const handleMake = (e) => {
    setMake(e.target.value);
  };
  const handleModel = (e) => {
    setModel(e.target.value);
  };

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (year && make && model) {
      let interest = year + ' ' + make + ' ' + ' ' + model;
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
      //   page: 'Get Quote',
      //   last_question: '5',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setQuoteInterest(interest));
      setYear('');
      setMake('');
      setModel('');
    }
  };
  const skipThisStep = () => {
    dispatch(setCheckerIsSkipMiddleName(true));
    dispatch(addHistory(true));
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 8 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="margin-dense"
            margin="dense"
            label="Year"
            fullWidth
            value={year}
            onChange={handleYearChange}
            autoComplete='off'
            type="text"
            InputProps={{
              style: {
                height: '70px', // Set the height of the TextField
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
            id="margin-dense"
            margin="dense"
            label="Make"
            fullWidth
            value={make}
            onChange={handleMake}
            autoComplete='off'
            type="text"
            InputProps={{
              style: {
                height: '70px', // Set the height of the TextField
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
            label="Model"
            fullWidth
            id="margin-dense"
            margin="dense"
            value={model}
            onChange={handleModel}
            autoComplete='off'
            type="text"
            InputProps={{
              style: {
                height: '70px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '25px',
              },
            }}
          />
        </div>
        <p className="bg-gray-50 rounded-3xl p-4">
          What option are you considering for your purchase?
        </p>
        <button
          onClick={skipThisStep}
          type="button"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          SKIP
        </button>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        {quoteInterest}
<MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );

  return (
    <>
      {step > 6 && checkerIsSkipMiddleName == false ? (
        <>
          {history[7] == true ? (
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
export default Vehicle;
