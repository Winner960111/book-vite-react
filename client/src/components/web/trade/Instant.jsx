import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setInstantMake,
  setInstantModel,
  setInstantYear,
  setVin,
  setVehicleType,
} from '../../../store/reducers/checker';
import { instantInfo, usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material'
  ;
const Instant = () => {

  const {
    dealerId,
    intentID,
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
    type,
    vehicleYear,
    vehicleMake,
    vehicleModel,
  } = useSelector((state) => state.checker);
  const [vinState, setVinState] = useState(true);
  const [makeState, setMakeState] = useState(false);
  const [vinValue, setVinValue] = useState('');
  const [year, setYear] = useState(vehicleYear);
  const [make, setMake] = useState(vehicleMake);
  const [model, setModel] = useState(vehicleModel);

  console.log("this is=========>", vehicleMake, vehicleModel, vehicleYear)

  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vinState) {
      if (!vinValue) {
        setError('Please fill in the input field');
      } else {
        const data = {
          dealer_id: dealerId,
          vin: vinValue,
        };
        const res = await instantInfo(data);
        console.log('response is =>', res);
        if (res.status === 201) {
          dispatch(setInstantMake(res.data.make));
          dispatch(setInstantModel(res.data.model));
          dispatch(setInstantYear(res.data.year));
          dispatch(setVehicleType(res.data.type));
          dispatch(setVin(vinValue));
          dispatch(addHistory(true));
        } else res;
      }
    } else if (makeState) {
      if (make && year && model) {

        if (!error) {
          console.log("this is yDate===>", year, make, model)
          dispatch(setInstantMake(make));
          dispatch(setInstantModel(model));
          dispatch(setInstantYear(year));
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
      } else {
        setError('Please fill in the input field');
      }
    }
  };
  const handleInputVin = (e) => {
    setVinValue(e.target.value);
    setError('');
  };

  const changeVin = () => {
    setVinState(true);
    setMakeState(false);
  };

  const changeMake = () => {
    setVinState(false);
    setMakeState(true);
  };

  const handleInputYear = (e) => {
    if (/^[0-9]+$/.test(e.target.value) && e.target.value.length <= 4 || !e.target.value.trim()) {
      setYear(e.target.value)
    }
    setError('')
  };
  const handleInputMake = (e) => {
    setMake(e.target.value);
    setError('');
  };

  const handleInputModel = (e) => {
    setModel(e.target.value);
    setError('');
  };

  useEffect(() => {
    setError('')
    if (year.length >= 4) {
      if (parseInt(year) < 1900 || parseInt(year) > 2100) {
        console.log("this is invalid")
        setError('*Invalid Year info')
      }
    }
  }, [year, make, model])
  return (
    <>
      <div className="w-full flex flex-col items-center">
        <p className="w-2/6 text-4xl my-3 mt-10 font-medium">
          <b>Get an instant offer in minute</b>
        </p>
        <form
          onSubmit={handleSubmit}
          className={
            'w-2/6 text-justify bg-white rounded-3xl px-8 pt-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
          }
        >
          <div className="flex w-full mt-10 justify-center">
            <button
              type="button"
              onClick={() => {
                changeVin();
              }}
              className={
                vinState
                  ? 'bg-gray-50 mx-5 px-6 py-2 border-b-4 border-[#854fff] border-solid'
                  : 'bg-gray-50 mx-5 px-6 py-2'
              }
            >
              By VIN
            </button>
            <button
              type="button"
              onClick={() => {
                changeMake();
              }}
              className={
                makeState
                  ? 'bg-gray-50 mx-5 px-6 py-2 border-b-4 border-[#854fff] border-solid'
                  : 'bg-gray-50 mx-5 px-6 py-2'
              }
            >
              By MAKE
            </button>
          </div>

          {vinState && (
            <>
              <div className="py-2 flex flex-col items-center">
                <TextField
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="VIN"
                  autoFocus
                  value={vinValue}
                  onChange={(e) => {
                    handleInputVin(e);
                  }}
                  fullWidth
                  type="text"
                  InputProps={{
                    style: {
                      height: '70px', // Set the height of the TextField
                      fontSize: '25px',
                      textAlign: 'center'
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      textAlign: 'center',
                      fontSize: '25px'
                    },
                  }}
                />
                {error !== '' ? (
                  <p className="text-red-500 pl-2 text-sm">{error}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
              >
                Save Vehicle
              </button>
            </>
          )}
          {makeState && (
            <>
              <TextField
                id="margin-dense"
                margin="dense"
                label="Year"
                fullWidth
                autoFocus
                value={year}
                onChange={(e) => {
                  handleInputYear(e);
                }}
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
                onChange={(e) => {
                  handleInputMake(e);
                }}
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
                onChange={(e) => {
                  handleInputModel(e);
                }}
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
              {error !== '' ? (
                <p className="text-red-500 pl-2 text-sm">{error}</p>
              ) : null}
              <button
                type="submit"
                className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
              >
                Save Vehicle
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Instant;
