import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setDealType,
  setQuoteInterest,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material';
const DealType = () => {
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

  const [dealClick, setDealClick] = useState('Finance');
  const [error, setError] = useState(null);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');

  useEffect(() => {
    setError(null);
    if (year.length >= 4)
      if (parseInt(year) < 1900 || parseInt(year) > 2100) {
        setError('*Invalid Year info')
      }
  }, [step, year, make, model]);

  const handleYear = (e) => {
    if (/^[0-9]+$/.test(e.target.value) && e.target.value.length <= 4 || !e.target.value.trim()) {
      setYear(e.target.value)
    }
  }

  const handleSubmit = async () => {
    if (year && make && model && dealClick) {
      if (!error) {
        let interest = year + ' ' + make + ' ' + ' ' + model;
        setYear('');
        setMake('');
        setModel('');
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
          page: 'Get Quote',
          last_question: '2',
        };
        const res = await usersUpdate(data, intentID);
        console.log('this is update results ====>', res);
        dispatch(addHistory(true));
        dispatch(setDealType(dealClick));
        dispatch(setQuoteInterest(interest));
      }
    } else {
      setError('*You must input all information. ');
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 w-full justify-center items-center">
      <p className="w-2/3 text-4xl mt-10 font-medium">
        What option are you considering for your purchase?
      </p>
      <div className="w-2/3 flex flex-col md:flex-row text-justify bg-white rounded-3xl p-4 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="flex w-full md:w-[40%] flex-col md:mx-10">
          <div className="flex flex-col">
            <TextField
              id="margin-dense"
              margin="dense"
              label="Year"
              fullWidth
              autoFocus
              autoComplete='off'
              value={year}
              onChange={(e) => handleYear(e)}
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
              autoComplete='off'
              value={make}
              onChange={(e) => setMake(e.target.value)}
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
              autoComplete='off'
              value={model}
              onChange={(e) => setModel(e.target.value)}
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
            <p className="text-red-500 flex justify-start">{error}</p>
          ) : null}
        </div>
        <div className="w-full md:w-[60%] flex flex-col justify-between">
          <div className="flex flex-col justify-between bg-gray-50 rounded-3xl p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <label
                htmlFor="radio1"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Finance');
                }}
              >
                <input
                  type="radio"
                  id="radio1"
                  checked={dealClick == 'Finance' ? true : false}
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Finance
              </label>
              <label
                htmlFor="radio2"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Cash');
                }}
              >
                <input
                  type="radio"
                  id="radio2"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Cash
              </label>
              <label
                htmlFor="radio3"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Lease');
                }}
              >
                <input
                  type="radio"
                  id="radio3"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Lease
              </label>
            </div>

            <p className=" px-6">
              <p>What option are you considering for your purchase?</p>
            </p>

          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealType;
