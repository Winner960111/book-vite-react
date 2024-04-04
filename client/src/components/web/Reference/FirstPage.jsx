import { useState, useEffect } from 'react';
import { addHistory, setRefPhoneNumber, setRefRelation, setRefFirstName, setRefLastName, setRefCity, setRefState } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const FirstPage = () => {
  const {
    step,
    checkerMobileNumber,
    customerName,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [focusFirstName, setFocusFirstName] = useState(Boolean);
  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusPhoneNumber, setFocusPhoneNumber] = useState(Boolean);
  const [relation, setRelation] = useState('Spouse')
  const [errorRelation, setErrorRelation] = useState('')
  const [focusCity, setFocusCity] = useState(Boolean)
  const [city, setCity] = useState('')
  const [errorCity, setErrorCity] = useState('')
  const [focusState, setFocusState] = useState(Boolean)
  const [state, setState] = useState('')
  const [errorState, setErrorState] = useState('')
  
  const handleState = (e) => {
    setState(e.target.value);
    setErrorState('');
    };
  const handleCity = (e) => {
    setCity(e.target.value);
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
    }else {
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
        <div className=" w-2/3 flex flex-col mt-28 mx-20">
          <p className="w-full text-4xl my-3 font-medium">
            Hi, <b>{customerName}</b> thanks for coming back, please complete
            the following information.
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusFirstName(true)}
                  onBlur={() => setFocusFirstName(false)} // onBlur is triggered when the input loses focus
                  value={firstName}
                  onChange={handleFirstName}
                  fullWidth
                  autoFocus
                  label="First Name"
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
                {errorFirstName !== '' && (
                  <p className="text-red-500 pl-2">{errorFirstName}</p>
                )}
                {focusFirstName && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter your reference first name.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusLastName(true)}
                  onBlur={() => setFocusLastName(false)} // onBlur is triggered when the input loses focus
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  label="Last Name"
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
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
                {focusLastName && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter your reference last name.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusPhoneNumber(true)}
                  onBlur={() => setFocusPhoneNumber(false)} // onBlur is triggered when the input loses focus
                  value={phoneNumber}
                  onChange={handlePhoneNumber}
                  fullWidth
                  label="Phone Number"
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
                {errorPhoneNumber !== '' && (
                  <p className="text-red-500 pl-2">{errorPhoneNumber}</p>
                )}
                {focusPhoneNumber && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please input your reference phone number.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full mt-4 md:mx-5">
                <FormControl variant="filled" sx={{ m: 1, minwidth: 120 }}>
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
                    <MenuItem value={'Employeer'}>Employeer</MenuItem>
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
                  onFocus={() => setFocusCity(true)}
                  onBlur={() => setFocusCity(false)} // onBlur is triggered when the input loses focus
                  value={city}
                  onChange={handleCity}
                  fullWidth
                  label="City"
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
                {errorCity !== '' && (
                  <p className="text-red-500 pl-2">{errorCity}</p>
                )}
                {focusCity && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter your reference person&apos;s city.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusState(true)}
                  onBlur={() => setFocusState(false)} // onBlur is triggered when the input loses focus
                  value={state}
                  onChange={handleState}
                  fullWidth
                  label="State"
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
                {errorState !== '' && (
                  <p className="text-red-500 pl-2">{errorState}</p>
                )}
                {focusState && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter your reference person&apos;s state.
                  </p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-full md:w-[30%] h-16 md:mx-4 rounded-lg text-white text-xl  hover:bg-purple-800"
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
