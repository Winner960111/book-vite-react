import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import {
  addHistory,
  setVehicleType,
} from '../../../store/reducers/checker';
import { usersUpdate, vehicleList } from '../../../api/index';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const VehicleType = () => {
  const { dealer_id } = useParams()
  const {
    step,
    type,
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
    checkerMobileNumber,
    vehicleType,
    history,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = useState([])
  const [select, setSelect] = useState('')
  const [error, setError] = useState('');

  const vehicleListGet = async () => {
    const vehicleLists = await vehicleList(dealer_id)
    setVehicles(vehicleLists.data.sold_by_dealer)
  }
  useEffect(() => {
    setError('');
    setSelect('');
  }, [step]);

  useEffect(() => {
    vehicleListGet()
  }, [])
  const handleSubmit = async () => {
    if (!select) {
      setError('*Required')
    }
    else {
      dispatch(setVehicleType(select))
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
        page: 'Trade In',
        last_question: '2',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
    }
  }
  const renderDescription = () => (
    <>
      <BotIcon />
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 5 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          <FormControl variant="filled" sx={{ minWidth: 120, width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '15px' }}>Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              {vehicles.map((item, index) => (
                <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4">
          What vehicle are you interested in?
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </div>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {vehicleType}
      </div>
    </div>
  );

  return (
    <>
      {step > 3 ? (
        <>
          {history[4] == true ? (
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
export default VehicleType;
