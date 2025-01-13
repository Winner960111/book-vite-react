import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setInstantYear,
  setInstantMake,
  setInstantModel,
  setPayDown,
  setProgress,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const ThirdPage = () => {
  const {
    step,
    // type,
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
    // checkerMobileNumber,
    vehicleYear,
    vehicleMake,
    vehicleModel,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorPay, setErrorPay] = useState('');
  const [year, setYear] = useState(vehicleYear);
  const [make, setMake] = useState(vehicleMake);
  const [model, setModel] = useState(vehicleModel);
  const [pay, setPay] = useState('');
  const [errorYear, setErrorYear] = useState('');
  const [first, setFirst] = useState(null);

  useEffect(() => {
    setErrorPay('');
    setErrorYear('');
  }, [step]);

  const handleYear = (e) => {
    setErrorYear('')
    if (
      (/^[0-9]+$/.test(e.target.value) && String(e.target.value).length <= 4) ||
      !e.target.value.trim()
    ) {
      setYear(e.target.value);
    }
  };

  const handlePay = (e) => {
    setErrorPay('');
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setPay(e.target.value);
    }

  };
  const handleSubmit = async () => {
    let pass = 0;

    if (!pay) {
      setErrorPay('*Required');
    } else if (!/^[+-]?\d+(\.\d*)?$/.test(pay)) {
      setErrorPay('*Not supported format');
    } else {
      pass += 1;
    }
    if (!year.trim()) {
      setErrorYear('*Required')
    } else if (year > 2100 || year < 1900) {
      setErrorYear('*Invalid Date');
    } else {
      pass += 1;
    }
    if (pass == 2) {
      dispatch(setInstantYear(year));
      dispatch(setInstantMake(make));
      dispatch(setInstantModel(model));
      dispatch(setPayDown(pay));
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
      //   last_question: '3',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setProgress());
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 w-full justify-center items-center min-w-[600px]">
      <p className="w-2/3 text-4xl mt-44 font-medium">
        What vehicle are you interested in?
      </p>
      <div className="w-2/3 flex flex-col text-justify bg-white rounded-3xl p-10 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="flex md:w-full w-[95%] flex-col md:flex-row">
          <div className="flex flex-col w-full mr-5">
            <TextField
              variant="standard"
              margin="dense"
              label="Year"
              fullWidth
              style={{ margin: '10px' }}
              value={year}
              autoComplete="off"
              onChange={(e) => handleYear(e)}
              InputProps={{
                style: {
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            {errorYear ? (
              <p className="w-full text-red-600 flex justify-start ml-2">
                {errorYear}
              </p>
            ) : null}
          </div>
          <TextField
            variant="standard"
            margin="dense"
            label="Make"
            autoComplete="off"
            fullWidth
            style={{ margin: '10px' }}
            value={make}
            onChange={(e) => setMake(e.target.value)}
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '20px',
              },
            }}
          />
          <TextField
            variant="standard"
            label="Model"
            autoComplete="off"
            fullWidth
            style={{ margin: '10px' }}
            margin="dense"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            type="text"
            InputProps={{
              style: {
                fontSize: '20px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '20px',
              },
            }}
          />
        </div>
        <div className="w-full flex flex-col justify-between md:flex-row pt-10 px-2">
          <div className="md:w-[32%] w-full flex flex-col justify-between items-center">
            <div className="w-full flex flex-col justify-betweenrounded-3xl">
              <TextField
                aria-owns={first ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={(event) => setFirst(event.currentTarget)}
                onMouseLeave={() => setFirst(null)}
                onMouseDown={() => setFirst(null)}
                id="standard-basic"
                variant="standard"
                margin="dense"
                label="What will you down payment be?"
                autoComplete="off"
                fullWidth
                value={pay}
                onChange={handlePay}
                InputProps={{
                  style: {
                    fontSize: '20px',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '20px',
                  },
                }}
              />
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={Boolean(first)}
                anchorEl={first}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => setFirst(null)}
                disableRestoreFocus
              >
                <Typography sx={{ p: 2 }}>
                  If no down payment, please type 0.
                </Typography>
              </Popover>
              {errorPay !== '' ? (
                <p className="text-red-500 flex justify-start pt-2">
                  {errorPay}
                </p>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full lg:min-w-[200px] lg:w-[30%] border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
