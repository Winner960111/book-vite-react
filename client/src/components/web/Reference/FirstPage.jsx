import { useState, useEffect } from 'react';
import { addHistory, setRefPhoneNumber, setRefRelation, setRefFirstName, setRefLastName, setRefCity, setRefState } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const FirstPage = () => {

  const {
    step,
    customerName,
  } = useSelector((state) => state.checker);
  
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusFirstName, setFocusFirstName] = useState('');
  const [focusLastName, setFocusLastName] = useState('');
  const [focusPhoneNumber, setFocusPhoneNumber] = useState('');
  const [relation, setRelation] = useState('Spouse')
  const [errorRelation, setErrorRelation] = useState('')
  const [focusCity, setFocusCity] = useState('')
  const [city, setCity] = useState('')
  const [errorCity, setErrorCity] = useState('')
  const [focusState, setFocusState] = useState('')
  const [state, setState] = useState('')
  const [errorState, setErrorState] = useState('')

  const handleState = (e) => {
    if (/^[a-zA-Z]+$/.test(e.target.value) || !e.target.value.trim()) {

      setState(e.target.value);
    }

    setErrorState('');
  };
  const handleCity = (e) => {
    if (/^[a-zA-Z]+$/.test(e.target.value) || !e.target.value.trim()) {

      setCity(e.target.value);
    }
    setErrorCity('');
  };
  const handleRelation = (e) => {
    setRelation(e.target.value);
    setErrorRelation('');
  };

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setErrorFirstName('');
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
  };
  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setPhoneNumber(formattedInputValue);
    setErrorPhoneNumber(null);
  };

  useEffect(() => {
    setErrorFirstName('');
    setErrorLastName('');
    setErrorPhoneNumber('');
    setErrorRelation('');
    setErrorCity('');
    setErrorState('');
  }, [step]);

  const handlesubmit = async () => {
    let pass = 0;
    if (!firstName) {
      setErrorFirstName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setErrorFirstName('*contains only characters');
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
    if (!phoneNumber) {
      setErrorPhoneNumber('*Required');
    } else {
      pass += 1;
    }
    if (!city) {
      setErrorCity('*Required');
    } else {
      pass += 1;
    }
    if (!state) {
      setErrorState('*Required');
    } else {
      pass += 1;
    }
    if (!relation) {
      setErrorRelation('*Required');
    } else if (!/^[A-Za-z]+$/.test(relation)) {
      setErrorRelation('*contains only characters');
    } else {
      pass += 1;
    }
    if (pass == 6) {
      dispatch(setRefFirstName(firstName));
      dispatch(setRefLastName(lastName));
      dispatch(setRefPhoneNumber(phoneNumber));
      dispatch(setRefRelation(relation));
      dispatch(setRefCity(city));
      dispatch(setRefState(state));
      dispatch(addHistory(true));
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-full text-4xl my-3 font-medium">
            Hi, <b>{customerName}</b> thanks for coming back, please complete
            the following information.
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusFirstName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusFirstName(event.currentTarget)}
                  onMouseLeave={() => setFocusFirstName(null)}
                  onMouseDown={() => setFocusFirstName(null)}
                  value={firstName}
                  onChange={handleFirstName}
                  fullWidth
                  autoFocus
                  autoComplete='off'
                  label="First name"
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
                  <Typography sx={{ p: 2 }}>
                    Please enter your reference first name.
                  </Typography>
                </Popover>
                {errorFirstName !== '' && (
                  <p className="text-red-500 pl-2">{errorFirstName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusLastName ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusLastName(event.currentTarget)}
                  onMouseLeave={() => setFocusLastName(null)}
                  onMouseDown={() => setFocusLastName(null)}
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  label="Last name"
                  autoComplete='off'
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
                  <Typography sx={{ p: 2 }}>
                    Please enter your reference last name.
                  </Typography>
                </Popover>
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusPhoneNumber ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusPhoneNumber(event.currentTarget)}
                  onMouseLeave={() => setFocusPhoneNumber(null)}
                  onMouseDown={() => setFocusPhoneNumber(null)}
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  fullWidth
                  label="Phone Number"
                  variant="standard"
                  autoComplete='off'
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
                  open={Boolean(focusPhoneNumber)}
                  anchorEl={focusPhoneNumber}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusPhoneNumber(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please input your reference phone number.
                  </Typography>
                </Popover>
                {errorPhoneNumber !== '' && (
                  <p className="text-red-500 pl-2">{errorPhoneNumber}</p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full mt-4 md:mx-5">
                <FormControl variant="filled" sx={{ my: 1, minwidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    style={{ fontSize: '15px' }}
                  >
                    RelationShip
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={relation}
                    onChange={handleRelation}
                  >
                    <MenuItem value={'Spouse'}>Spouse</MenuItem>
                    <MenuItem value={'Employer'}>Employer</MenuItem>
                    <MenuItem value={'Relative'}>Relative</MenuItem>
                    <MenuItem value={'Friend'}>Friend</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
                </FormControl>
                {errorRelation !== '' && (
                  <p className="text-red-500 pl-2">{errorRelation}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusCity ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusCity(event.currentTarget)}
                  onMouseLeave={() => setFocusCity(null)}
                  onMouseDown={() => setFocusCity(null)}
                  value={city}
                  onChange={handleCity}
                  fullWidth
                  label="City"
                  variant="standard"
                  autoComplete='off'
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
                  open={Boolean(focusCity)}
                  anchorEl={focusCity}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusCity(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please enter your reference person&apos;s city.
                  </Typography>
                </Popover>
                {errorCity !== '' && (
                  <p className="text-red-500 pl-2">{errorCity}</p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  aria-owns={focusState ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusState(event.currentTarget)}
                  onMouseLeave={() => setFocusState(null)}
                  onMouseDown={() => setFocusState(null)}
                  value={state}
                  onChange={handleState}
                  fullWidth
                  label="State"
                  variant="standard"
                  autoComplete='off'
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
                  open={Boolean(focusState)}
                  anchorEl={focusState}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusState(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please enter your reference person&apos;s state.
                  </Typography>
                </Popover>
                {errorState !== '' && (
                  <p className="text-red-500 pl-2">{errorState}</p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
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
export default FirstPage;
