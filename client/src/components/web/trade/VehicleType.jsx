import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setVehicleType,
  setProgress,
} from '../../../store/reducers/checker';
import { usersUpdate, vehicleList } from '../../../api/index';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';

const VehicleType = () => {
  const { dealer_id } = useParams();
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
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [vehicles, setVehicles] = useState([]);
  const [select, setSelect] = useState('');
  const [errorVehicle, setErrorVehicle] = useState('');

  const vehicleListGet = async () => {
    const vehicleLists = await vehicleList(dealer_id);
    setVehicles(vehicleLists.data?.sold_by_dealer);
  };
  useEffect(() => {
    setErrorVehicle('');
    setSelect('');
  }, [step]);

  useEffect(() => {
    vehicleListGet();
  }, []);

  const handleSubmit = async () => {
    if (!select) {
      setErrorVehicle('*Required');
    } else {
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
        page: 'Trade In',
        last_question: '3',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setProgress());
    }
  };

  console.log('this is vehicles===>', vehicles);
  return (
    <div className="flex flex-col bg-gray-50 w-full justify-center items-center min-w-[600px]">
      <p className="w-2/3 text-4xl mt-20 font-medium">
        What vehicle are you interested in?
      </p>
      <div className="w-2/3 flex flex-col text-justify bg-white rounded-3xl p-5 pb-10 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="w-full flex flex-col justify-between items-center rounded-2xl pl-5 pt-4">
          <div className="w-full flex justify-between bg-gray-50 items-center py-5 px-2 rounded-xl">
            <FormControl>
              <FormLabel
                id="demo-row-radio-buttons-group-label"
                style={{ padding: '0 5px', fontSize: '18px', margin: '0 15px' }}
              >
                What type of vehicle are you interested in?
              </FormLabel>
              <div className="overflow-y-auto">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  style={{
                    margin: '10px 30px',
                    display: 'flex',
                    flexWrap: 'wrap',
                  }}
                  onChange={(e) => {
                    setSelect(e.target.value);
                  }}
                >
                  {vehicles.map((item, key) => {
                    return (
                      <FormControlLabel
                        key={key}
                        value={item['name']}
                        control={<Radio />}
                        label={item['name']}
                        className="hover:bg-violet-200 w-[180px] border-[1px] border-gray-300 border-solid rounded-xl p-1 m-1 "
                      />
                    );
                  })}
                </RadioGroup>
              </div>
            </FormControl>
          </div>
          {errorVehicle !== '' ? (
            <p className="text-red-500 pt-2">{errorVehicle}</p>
          ) : null}
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#854fff] w-full lg:w-[40%] h-16 px-2 py-1 mt-10 rounded-2xl text-white text-sm lg:text-lg hover:bg-purple-800"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleType;
