import { useState, useEffect } from 'react';
import {
  addHistory,
  setAppDescription,
  setAppStatus,
} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { checkapp } from '../../../api/index';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const SubmitContent = () => {
  const { step, checkerMobileNumber, dealerId } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();
  const [errorLastName, setErrorLastName] = useState('');
  const [errorSocialNumber, setErrorSocialNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [socialNumber, setSocialNumber] = useState('');

  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusSocialNumber, setFocusSocialNumber] = useState(Boolean);

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
  };
  const handleSocialNumber = (e) => {
    setErrorSocialNumber('');
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue = inputValue.substring(0, 4);
    setSocialNumber(formattedInputValue);
  };

  useEffect(() => {
    setErrorLastName('');
    setErrorSocialNumber('');
  }, [step]);

  const handlesubmit = async () => {
    if (!lastName) {
      setErrorLastName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setErrorLastName('*contains only characters');
    } else {
      const data = {
        dealer_id: dealerId,
        last_name: lastName,
        ssn: socialNumber,
        mobile_phone: checkerMobileNumber,
      };
      const res = await checkapp(data);
      if (res.status == 201) {
        res.data;
        dispatch(setAppStatus(res.data.status));
        dispatch(setAppDescription(res.data.describe));
        dispatch(addHistory(true));
      } else {
        ('failed API calling.');
      }
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20 items-center">
          <p className="w-2/3 text-4xl my-3 font-medium">
            We need to your some information
          </p>
          <div className="w-2/3 text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="w-full p-5 flex flex-col md:flex-row items-start">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusLastName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) =>
                    setFocusLastName(event.currentTarget)
                  }
                  onMouseLeave={() => setFocusLastName(null)}
                  onMouseDown={() => setFocusLastName(null)}
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  label="Last name"
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
                  open={Boolean(focusLastName)}
                  anchorEl={focusLastName}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusLastName(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2, width: '300px' }}>
                    Please enter your last name.
                  </Typography>
                </Popover>
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={
                    focusSocialNumber ? 'mouse-over-popover' : undefined
                  }
                  aria-haspopup="true"
                  onMouseEnter={(event) =>
                    setFocusSocialNumber(event.currentTarget)
                  }
                  onMouseLeave={() => setFocusSocialNumber(null)}
                  onMouseDown={() => setFocusSocialNumber(null)}
                  value={socialNumber}
                  onChange={handleSocialNumber}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  autoComplete="off"
                  label="Social security number"
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
                  open={Boolean(focusSocialNumber)}
                  anchorEl={focusSocialNumber}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusSocialNumber(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2, width: '300px' }}>
                    *Input only last 4 digit
                    <br />
                    We will not hurt your credit report. This is not an
                    application for credit. Authorization is solely for
                    prequalification only.
                  </Typography>
                </Popover>
                {errorSocialNumber !== '' && (
                  <p className="text-red-500 pl-2">{errorSocialNumber}</p>
                )}
              </div>
            </div>

            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-full md:w-[40%] h-16 md:mx-4 rounded-lg text-white text-xl  hover:bg-purple-800"
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
export default SubmitContent;
