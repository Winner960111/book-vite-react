import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setInstantMake,
  setInstantModel,
  setInstantYear,
  removeHistory,
} from '../../../store/reducers/checker';
import { usersStatus } from '../../../api/index';
import { TextField } from '@mui/material'
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { MdModeEditOutline } from "react-icons/md";

const Instant = () => {

  const {
    dealerId,
    checkerMobileNumber,
    step,
    instantYear,
    instantMake,
    instantModel,
    history,
    vehicleYear,
    vehicleMake,
    vehicleModel,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [vinState, setVinState] = useState(false);
  const [makeState, setMakeState] = useState(true);
  // const [vinValue, setVinValue] = useState('');
  const [year, setYear] = useState(vehicleYear);
  const [make, setMake] = useState(vehicleMake);
  const [model, setModel] = useState(vehicleModel);

  console.log("this is=========>", vehicleMake, vehicleModel, vehicleYear)

  const [error, setError] = useState(null);

  useEffect(() => {
    setError('');
  }, []);

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vinState) {
      // if (!vinValue) {
      //   setError('Please fill in the input field');
      // } else {
      //   const data = {
      //     dealer_id: dealerId,
      //     vin: vinValue,
      //   };
      //   const res = await instantInfo(data);
      //   console.log('response is =>', res);
      //   if (res.status === 201) {
      //     dispatch(setInstantMake(res.data.make));
      //     dispatch(setInstantModel(res.data.model));
      //     dispatch(setInstantYear(res.data.year));
      //     dispatch(setVehicleType(res.data.type));
      //     dispatch(setVin(vinValue));
      //     dispatch(addHistory(true));
      //   } else res;
      // }
    } else if (makeState) {
      if (make && year && model) {
        dispatch(setInstantMake(make));
        dispatch(setInstantModel(model));
        dispatch(setInstantYear(year));
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
        //   page: 'Trade In',
        //   last_question: '1',
        // };
        const data = {
          dealer_id: dealerId,
          mobile_phone: checkerMobileNumber,
          source: 'Dropout',
        };
        const res = await usersStatus(data);
        console.log('this is update results ====>', res);
        dispatch(addHistory(true));
      } else {
        setError('Please fill in the input field');
      }
    }
  };
  const handleInputYear = (e) => {
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      if (e.target.value.length <= 4) {
        setYear(e.target.value);
      }
    }
    setError('')
  }

  // const handleInputVin = (e) => {
  //   setVinValue(e.target.value);
  //   setError('');
  // };

  // const changeVin = () => {
  //   setVinState(true);
  //   setMakeState(false);
  // };

  // const changeMake = () => {
  //   setVinState(false);
  //   setMakeState(true);
  // };

  const handleInputMake = (e) => {
    setMake(e.target.value);
    setError('');
  };

  const handleInputModel = (e) => {
    setModel(e.target.value);
    setError('');
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 4 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4 text-left mb-5">
          <b>🎊 Congratulation! you successfully verified.</b>
        </p>
      </div>
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 4 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="flex flex-col md:flex-row md:items-center">
          {/* <div className="flex w-full mt-10 justify-center">
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
          </div> */}

          {vinState && (
            <>
              {/* <div
                className="py-2 flex flex-col items-center"
                style={step >= 4 ? { display: 'none' } : { display: 'block' }}
              >
                <TextField
                  helperText=" "
                  id="demo-helper-text-aligned-no-helper"
                  label="VIN"
                  value={vinValue}
                  onChange={(e) => {
                    handleInputVin(e);
                  }}
                  fullWidth
                  autoComplete='off'
                  type="text"
                  InputProps={{
                    style: {
                      height: '70px', // Set the height of the TextField
                      fontSize: '25px',
                      textAlign: 'center',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      textAlign: 'center',
                      fontSize: '25px',
                    },
                  }}
                />
                {error !== '' ? (
                  <p className="text-red-500 pl-2 text-sm">{error}</p>
                ) : null}
              </div>
              <p className="bg-gray-50 rounded-3xl p-4">
                Get an instant offer in minute
              </p>
              <button
                type="submit"
                className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-lg my-4 hover:bg-purple-800"
                style={step >= 4 ? { display: 'none' } : { display: 'block' }}
              >
                Save Vehicle
              </button> */}
            </>
          )}
          {makeState && (
            <>
              <div style={step >= 4 ? { display: 'none' } : { display: 'block' }}>
                <TextField
                  id="margin-dense"
                  margin="dense"
                  label="Year"
                  fullWidth
                  value={year}
                  onChange={(e) => {
                    handleInputYear(e);
                  }}
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
                  autoComplete='off'
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
                  autoComplete='off'
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
              </div>
              {error !== '' ? (
                <p className="text-red-500 pl-2 text-sm">{error}</p>
              ) : null}
              <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                Get an instant offer in minute
              </p>
              <button
                type="submit"
                className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
                style={step >= 4 ? { display: 'none' } : { display: 'block' }}
              >
                Save Vehicle
              </button>
            </>
          )}
        </div>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        Year: {instantYear}<br />
        Make: {instantMake}<br />
        Model: {instantModel}
<MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );

  return (
    <>
      {step > 2 ? (
        <>
          {history[3] == true ? (
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
export default Instant;
