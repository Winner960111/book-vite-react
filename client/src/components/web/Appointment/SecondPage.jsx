import { useState, useEffect } from 'react';
import { addHistory, removeHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { appointment } from '../../../api/index';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FifthPage = () => {
  const {
    step,
    dealerName,
    dealerId,
    checkerMobileNumber,
    appointDate,
    appointTime,
    timezone,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorMiddleName, setErrorMiddleName] = useState('');
  const [errorEmailAddress, setErrorEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [focusFirstName, setFocusFirstName] = useState(Boolean);
  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusMiddleName, setFocusMiddleName] = useState(Boolean);
  const [focusEmailAddress, setFocusEmailAddress] = useState(Boolean);
  const vehicles = ['BOAT', 'CAR', 'TRUCK', 'ATV'];
  const [select, setSelect] = useState('');

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrorFirstName('');
  };
  const handleMiddleName = (e) => {
    setMiddleName(e.target.value);
    setErrorMiddleName('');
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
  };
  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
    setErrorEmailAddress('');
  };

  useEffect(() => {
    setErrorFirstName('');
    setErrorLastName('');
    setErrorEmailAddress('');
  }, [step]);

  const handleBack = () => {
    dispatch(removeHistory());
  };
  const handleSubmit = async () => {
    let pass = 0;
    if (!firstName) {
      setErrorFirstName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setErrorFirstName('*contains only characters');
    } else {
      pass += 1;
    }
    if (!middleName) {
      setErrorMiddleName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(middleName)) {
      setErrorMiddleName('*contains only characters');
    } else {
      pass += 1;
    }
    if (!lastName) {
      setErrorLastName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setErrorLastName('*contains only characters');
    } else {
      pass += 1;
    }

    if (!emailAddress) {
      setErrorEmailAddress('input your email');
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)
    ) {
      setErrorEmailAddress('Invalid email type');
    } else {
      pass += 1;
    }
    if (!select) {
      setErrorEmailAddress('Select the vehicle');
    } else {
      pass += 1;
    }
    if (pass == 5) {

      const appointData = {
        dealer_id: dealerId,
        first_name: firstName,
        last_name: lastName,
        middle_name: middleName,
        email: emailAddress,
        mobile_phone: checkerMobileNumber,
        appointment_date: appointDate,
        appointment_time: appointTime,
        appointment_type: 'S',
        appointment_status: 'Created',
        appointment_notes: 'S',
        appointment_reminder: false,
        appointment_reminder_time: appointTime,
        appointment_reminder_type: 'S',
        time_zone: timezone,
        interested_in: select,
        reason: ""
      };

      const appointRes = await appointment(appointData);

      if (appointRes.status == 201) {
        console.log('status ImageSend', appointRes);
        dispatch(addHistory(true));
      } else {
        console.log('Faild ImageSend');
      }
    }
  };
  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-20 mx-20">
          <p className="w-full text-4xl my-3 font-medium text-center">
            Please enter your contact information to schedule your appointment.
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center min-w-[600px]">
            <div className="w-full py-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusFirstName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) =>
                    setFocusFirstName(event.currentTarget)
                  }
                  onMouseLeave={() => setFocusFirstName(null)}
                  onMouseDown={() => setFocusFirstName(null)}
                  value={firstName}
                  onChange={handleFirstName}
                  fullWidth
                  autoFocus
                  label="First name"
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
                  open={Boolean(focusFirstName)}
                  anchorEl={focusFirstName}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusFirstName(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2, width: '300px' }}>
                    Please enter your first name.
                  </Typography>
                </Popover>
                {errorFirstName !== '' && (
                  <p className="text-red-500 pl-2">{errorFirstName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusMiddleName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) =>
                    setFocusMiddleName(event.currentTarget)
                  }
                  onMouseLeave={() => setFocusMiddleName(null)}
                  onMouseDown={() => setFocusMiddleName(null)}
                  value={middleName}
                  onChange={handleMiddleName}
                  fullWidth
                  label="Middle name"
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
                  open={Boolean(focusMiddleName)}
                  anchorEl={focusMiddleName}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusMiddleName(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2, width: '300px' }}>
                    Please enter your middle name.
                  </Typography>
                </Popover>
                {errorMiddleName !== '' && (
                  <p className="text-red-500 pl-2">{errorMiddleName}</p>
                )}
              </div>
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
            </div>
            <div className="w-full py-5 flex justify-between items-center flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={
                    focusEmailAddress ? 'mouse-over-popover' : undefined
                  }
                  aria-haspopup="true"
                  onMouseEnter={(event) =>
                    setFocusEmailAddress(event.currentTarget)
                  }
                  onMouseLeave={() => setFocusEmailAddress(null)}
                  onMouseDown={() => setFocusEmailAddress(null)}
                  value={emailAddress}
                  onChange={handleEmailAddress}
                  fullWidth
                  label="Email address"
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
                  open={Boolean(focusEmailAddress)}
                  anchorEl={focusEmailAddress}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusEmailAddress(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2, width: '300px' }}>
                    By providing your email you agree to receive notification
                    messages from <b>{dealerName}</b> to the provided email
                    address.
                  </Typography>
                </Popover>
                {errorEmailAddress !== '' && (
                  <p className="text-red-500 pl-2">{errorEmailAddress}</p>
                )}
              </div>
              <FormControl
                variant="filled"
                sx={{ minWidth: 120, width: '100%', margin:'10px 0 0 0' }}
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
                  onChange={(e) => setSelect(e.target.value)}
                >
                  {vehicles.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="w-full p-5 flex justify-between">
              <button
                type="button"
                onClick={handleBack}
                className="w-full lg:min-w-[200px] lg:w-[30%] border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
              >
                BACK
              </button>
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
      </div>
    </>
  );
};
export default FifthPage;
