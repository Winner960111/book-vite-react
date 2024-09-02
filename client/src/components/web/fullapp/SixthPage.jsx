'use client';
import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIncomeAmount,
  setSourceIncome,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const SecondPage = () => {
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
  const [errorAmountIncome, setErrorAmountIncome] = useState('');
  const [errorHowIncome, setErrorHowIncome] = useState('');
  const [amountIncome, setAmountIncome] = useState('');
  const [howIncome, setHowIncome] = useState('');
  const [focusAmountIncome, setFocusAmountIncome] = useState('');
  const [focusHowIncome, setFocusHowIncome] = useState('');

  const handleAmountIncome = (e) => {
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setAmountIncome(e.target.value);
    }
    setErrorAmountIncome('');
  };
  const handleHowIncome = (e) => {
    if (/^[a-zA-Z]+$/.test(e.target.value) || !e.target.value.trim()) {
      setHowIncome(e.target.value);
    }
    setErrorHowIncome('');
  };

  useEffect(() => {
    setErrorAmountIncome('');
    setErrorHowIncome('');
    setAmountIncome('');
    setHowIncome('');
  }, [step]);

  const handlesubmit = async () => {
    let pass = 0;
    if (!amountIncome.trim()) {
      setErrorAmountIncome('*field is required');
    } else if (!/^\d+$/.test(amountIncome)) {
      setErrorAmountIncome('*Incorrect format');
    } else {
      pass += 1;
    }
    if (!howIncome.trim()) {
      setErrorHowIncome('*field is required');
    } else if (!/^[A-Za-z]+$/.test(howIncome)) {
      setErrorHowIncome('*Not character');
    } else {
      pass += 1;
    }
    if (pass == 2) {
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
      dispatch(addHistory(true));
      dispatch(setIncomeAmount(amountIncome));
      dispatch(setSourceIncome(howIncome));
    }
  };
  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-20 mx-20 items-center">
          <p className="w-[60%] text-4xl my-3 font-medium">Amount and Source</p>
          <div className="w-[60%] text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="flex flex-col w-full my-3 md:mx-5 p-5">
              <TextField
                aria-owns={focus ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={(event) =>
                  setFocusAmountIncome(event.currentTarget)
                }
                onMouseLeave={() => setFocusAmountIncome(null)}
                onMouseDown={() => setFocusAmountIncome(null)}
                value={amountIncome}
                onChange={handleAmountIncome}
                fullWidth
                autoFocus
                label="Amount of Income"
                autoComplete="off"
                variant="standard"
                InputProps={{
                  style: {
                    height: '50px', // Set the height of the TextField
                    fontSize: '25px',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '25px',
                  },
                }}
              />
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={Boolean(focusAmountIncome)}
                anchorEl={focusAmountIncome}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => setFocusAmountIncome(null)}
                disableRestoreFocus
              >
                <Typography sx={{ p: 2 }}>
                  What is the annually additional income amount you earn?
                </Typography>
              </Popover>
              {errorAmountIncome !== '' && (
                <p className="text-red-500 pl-2">{errorAmountIncome}</p>
              )}
            </div>
            <div className="flex flex-col w-full my-3 md:mx-5 p-5">
              <TextField
                aria-owns={focus ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={(event) => setFocusHowIncome(event.currentTarget)}
                onMouseLeave={() => setFocusHowIncome(null)}
                onMouseDown={() => setFocusHowIncome(null)}
                value={howIncome}
                onChange={handleHowIncome}
                fullWidth
                label="Source"
                variant="standard"
                autoComplete="off"
                InputProps={{
                  style: {
                    height: '50px', // Set the height of the TextField
                    fontSize: '25px',
                  },
                }}
                InputLabelProps={{
                  style: {
                    fontSize: '25px',
                  },
                }}
              />
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={Boolean(focusHowIncome)}
                anchorEl={focusHowIncome}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={() => setFocusHowIncome(null)}
                disableRestoreFocus
              >
                <Typography sx={{ p: 2 }}>
                  Where do you earn this income?
                </Typography>
              </Popover>
              {errorHowIncome !== '' && (
                <p className="text-red-500 pl-2">{errorHowIncome}</p>
              )}
            </div>

            <div className="w-full p-5 flex">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-full h-16 rounded-lg text-white text-xl  hover:bg-purple-800"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SecondPage;
