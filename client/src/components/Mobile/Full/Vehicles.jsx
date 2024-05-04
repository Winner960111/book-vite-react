import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setVehicleCondition,
  setVehicleType,
} from '../../../store/reducers/checker';
import { usersUpdate, vehicleList } from '../../../api/index';
import { classNames } from '../../../utils';
import { useParams } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Vehicle = () => {
  const { dealer_id } = useParams();
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

  const [vehicles, setVehicles] = useState([]);
  const [select, setSelect] = useState('');
  const [condition, setCondition] = useState('');
  const [error, setError] = useState('');

    const vehicleListGet = async () => {
      const vehicleLists = await vehicleList(dealer_id);
      setVehicles(vehicleLists.data.sold_by_dealer);
  };
    useEffect(() => {
      setError('');
      setCondition('');
      setSelect('');
      vehicleListGet();
    }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pass = 0;
    if (!select) {
      setError('*Please select vehicle type');
    } else {
      pass += 1;
    }
    if (!condition) {
      setError('*Please select vehicle condition');
    } else {
      pass += 1;
    }
    if (pass == 2) {
      dispatch(setVehicleCondition(condition));
      dispatch(setVehicleType(select));
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
        last_question: '9',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
    }
  };
console.log("vehicles===>", vehicles)
  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >=   13 ? 'text-slate-400' : 'text-slate-800'
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
              What vehicle are you interested in?
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={select}
              onChange={(e) => {
                setSelect(e.target.value);
              }}
              disabled={step >=   13 ? true : false}
            >
              {vehicles.map((item, key) => (
                <MenuItem value={item.name} key={key}>
                  {item.name}
                </MenuItem>
              ))}
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
              isuer
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={condition}
              onChange={(e) => {
                setCondition(e.target.value);
              }}
              disabled={step >=   13 ? true : false}
            >
              <MenuItem value={'New'}>New</MenuItem>
              <MenuItem value={'Used'}>Used</MenuItem>
            </Select>
          </FormControl>
          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please input correct info.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >=   13 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 11 ? renderDescription() : null}</>;
};
export default Vehicle;
