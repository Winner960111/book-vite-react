import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setPreviousCheckerAddress,
  setPreviousCheckerApt,
  setPreviousCheckerLocality,
  setPreviousCheckerState,
  setPreviousCheckerZipcode,
  setPreviousMonthlyPay,
  setPreviousResidentalYears,
  setPreviousResidentalMonths,
  setPreviousResidentalStatus,
} from '../../../store/reducers/checker';
import { GiPositionMarker } from 'react-icons/gi';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const FourthPageItem = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [apt, setApt] = useState('');
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState('');
  const [residental, setResidental] = useState('');
  const [errorResidental, setErrorResidental] = useState('');
  const [pay, setPay] = useState('');
  const [errorPay, setErrorPay] = useState('');
  const [focusPay, setFocusPay] = useState('');
  const [residentalYear, setResidentalYear] = useState('');
  const [errorYear, setErrorYear] = useState('');
  const [errorMonth, setErrorMonth] = useState('');
  const [residentalMonth, setResidentalMonth] = useState('');

  const {
    step,
  } = useSelector((state) => state.checker);

  const addressRef = useRef(null);

  useEffect(() => {
    setErrors({});
    setAddress('');
    setApt('');
    setLocality('');
    setState('');
    setPay('');
    setErrorPay('');
    setZipcode('');
    setErrorMonth('');
    setErrorYear('');
    setErrorResidental('');
  }, [step]);

  useEffect(() => {
    setErrors('');
  }, [zipcode, locality, state]);

  const initializeAutocomplete = useCallback(() => {
    const input = document.getElementById('autocomplete');
    const newAutocomplete = new window.google.maps.places.Autocomplete(input);

    newAutocomplete.addListener('place_changed', () => {
      const place = newAutocomplete.getPlace();
      if (place.formatted_address !== undefined) {
        setAddress(place.formatted_address);
        parseAddressComponents(place);
      }
    });
  }, []);

  useEffect(() => {
    setErrorResidental('')
  }, [residental])

  useEffect(() => {
    if (addressRef.current) {
      const loadGoogleMapsScript = (callback) => {
        if (window.google && window.google.maps && window.google.maps.places) {
          // The Google Maps API is already loaded
          callback();
        } else {
          // Create a new <script> tag only if the API hasn't been loaded yet
          const existingScript = document.getElementById('googleMapsScript');
          if (!existingScript) {
            const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
            const script = document.createElement('script');
            script.id = 'googleMapsScript'; // Assign an ID to the script element to check for its existence later
            script.type = 'text/javascript';
            script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_API_KEY}&libraries=places`;
            script.onload = () => callback();
            document.body.appendChild(script);
          }
        }
      };

      loadGoogleMapsScript(initializeAutocomplete);
    }
  }, [initializeAutocomplete, step]);

  const parseAddressComponents = (place) => {
    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'locality':
          setLocality(component.long_name);
          break;
        case 'administrative_area_level_1':
          setState(component.short_name);
          break;
        case 'postal_code':
          setZipcode(component.long_name);
          break;
      }
    }
  };

  const handleYear = (e) => {
    setErrorMonth('');
    setErrorYear('');
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setResidentalYear(e.target.value);
    }
  }
  const handlePay = (e) => {
    setErrorPay('');
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setPay(e.target.value);
    }
  };
  const handleMonth = (e) => {
    setErrorMonth('');
    setErrorYear('');
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setResidentalMonth(e.target.value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pass = 0;
    setErrors('');
    let newErrors = {};
    console.log(locality);

    if (!locality.trim()) {
      newErrors.locality = '*City field is required';
    }
    if (!state.trim()) {
      newErrors.state = '*State field is required';
    }
    if (!zipcode.trim()) {
      newErrors.zipcode = '*ZipCode field is required';
    } else if (!/^[0-9]+$/.test(zipcode)) {
      newErrors.zipcode = '*Invalid format'
    }
    if (!pay) {
      setErrorPay('*Required');
    } else if (!/^[+-]?\d+(\.\d*)?$/.test(pay)) {
      setErrorPay('*Not supported format');
    } else {
      pass += 1;
    }
    setErrors(newErrors);

    if (!residental) {
      setErrorResidental('*required');
    } else {
      pass += 1;
    }
    if (!residentalYear) {
      setErrorYear('*required');
    } else {
      pass += 1;
    }
    if (!residentalMonth) {
      setErrorMonth('*required');
    } else {
      pass += 1;
    }

    if (Object.keys(newErrors).length === 0 && pass == 4) {
      dispatch(addHistory(true));
      dispatch(setPreviousCheckerAddress(address));
      dispatch(setPreviousCheckerApt(apt));
      dispatch(setPreviousCheckerLocality(locality));
      dispatch(setPreviousCheckerState(state));
      dispatch(setPreviousCheckerZipcode(zipcode));
      dispatch(setPreviousMonthlyPay(pay));
      dispatch(setPreviousResidentalMonths(residentalMonth));
      dispatch(setPreviousResidentalYears(residentalYear));
      dispatch(setPreviousResidentalStatus(residental));
    }
  };
  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className="w-2/3 flex flex-col mt-5 mx-20">
          <p className="w-3/4 text-4xl my-3 font-medium">
            What is your previous address information?
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full flex px-5 pt-5 flex-col md:flex-row">
              <div className="md:w-[68%] w-full h-20 rounded-md text-2xl my-3 md:mx-5 flex flex-col">
                <Paper
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    height: '70px',
                  }}
                >
                  <GiPositionMarker className="text-4xl mx-2" />
                  <InputBase
                    aria-owns={focus ? 'mouse-over-popover' : undefined}
                    aria-haspopup="true"
                    onMouseEnter={(event) => setFocus(event.currentTarget)}
                    onMouseLeave={() => setFocus(null)}
                    onMouseDown={() => setFocus(null)}
                    sx={{ ml: 1, flex: 1, fontSize: '25px' }}
                    placeholder="Search Google Maps"
                    inputProps={{ 'aria-label': 'search google maps' }}
                    autoFocus
                    autoComplete="off"
                    id="autocomplete"
                    ref={addressRef}
                  />
                  <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(focus)}
                  anchorEl={focus}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocus(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    Please input your previous address.
                  </Typography>
                </Popover>
              </div>
              {errors.address ? (
                <p className="text-red-500 pl-2">{errors.address}</p>
              ) : null}
              <div className="md:w-[32%] w-full h-20 rounded-md text-center text-2xl my-3 md:mx-5">
                <TextField
                  value={apt}
                  onChange={(e) => setApt(e.target.value)}
                  fullWidth
                  defaultValue="Normal"
                  label="Apt/Suite (Optional)"
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
              </div>
            </div>
            <div className="w-full px-5 flex justify-between flex-col md:flex-row">
              <div className="md:w-1/3 w-full my-3 md:mx-5">
                <TextField
                  value={locality}
                  onChange={(e) => {
                    setLocality(e.target.value);
                    setErrors((prev) => ({ ...prev, locality: '' }));
                  }}
                  fullWidth
                  defaultValue="Normal"
                  label="City"
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
                {errors.locality ? (
                  <p className="text-red-500 pl-2">{errors.locality}</p>
                ) : null}
              </div>
              <div className="md:w-1/3 w-full my-3 md:mx-5">
                <TextField
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setErrors((prev) => ({ ...prev, state: '' }));
                  }}
                  fullWidth
                  defaultValue="Normal"
                  label="State"
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
                {errors.state ? (
                  <p className="text-red-500 pl-2">{errors.state}</p>
                ) : null}
              </div>

              <div className="md:w-1/3 w-full my-3 md:mx-5">
                <TextField
                  value={zipcode}
                  onChange={(e) => {
                    setZipcode(e.target.value);
                    setErrors((prev) => ({ ...prev, zipcode: '' }));
                  }}
                  fullWidth
                  defaultValue="Normal"
                  label="Zip Code"
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
                {errors.zipcode ? (
                  <p className="text-red-500 pl-2">{errors.zipcode}</p>
                ) : null}
              </div>
            </div>
            <div className="flex w-[98%]">
              <div className="md:w-[68%] w-full bg-gray-50 rounded-2xl my-3 md:mx-5 flex flex-col">
                <div className="w-full flex flex-col lg:flex-row items-center px-5 pt-5 mt-2">
                  <FormControl style={{ width: '100%' }}>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      style={{ padding: '0 5px', fontSize: '18px' }}
                    >
                      What is your residental status in this address?
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      onChange={(e) => {
                        setResidental(e.target.value);
                      }}
                      style={{
                        margin: '10px 0',
                        display: 'flex',
                        justifyContent: 'space-around',
                        padding: '10px',
                      }}
                    >
                      <FormControlLabel
                        value="Rent"
                        control={<Radio />}
                        label="Rent"
                        className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 "
                      />
                      <FormControlLabel
                        value="Own"
                        control={<Radio />}
                        label="Own"
                        className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 "
                      />
                      <FormControlLabel
                        value="Family"
                        control={<Radio />}
                        label="Family"
                        className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 "
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                        className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 "
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                {errorResidental !== '' ? (
                  <p className="text-red-500 pl-5 -mt-2">{errorResidental}</p>
                ) : null}
              </div>

              <div className="md:w-[32%] w-full bg-gray-50 rounded-2xl my-3 md:mx-5">
                <p className="px-2 pt-5">
                  How long have you lived at your previous address?
                </p>
                <div className="w-full flex">
                  <TextField
                    variant="standard"
                    defaultValue="Normal"
                    margin="dense"
                    label="Year"
                    autoComplete="off"
                    value={residentalYear}
                    style={{ margin: '0 10px 0 10px' }}
                    onChange={(e) => {
                      handleYear(e);
                    }}
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
                    defaultValue="Normal"
                    margin="dense"
                    label="Month"
                    autocomplete="off"
                    value={residentalMonth}
                    style={{ margin: '0 10px 0 10px' }}
                    onChange={(e) => {
                      handleMonth(e);
                    }}
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
                {errorMonth !== '' || errorYear !== '' ? (
                  <p className="text-red-500 pl-2 pt-2">{errorMonth}</p>
                ) : null}
              </div>
            </div>
            <div className="w-full p-5 flex justify-between">
              <div className="w-[40%] flex flex-col -mt-4 ml-5">
                <TextField
                  aria-owns={focusPay ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusPay(event.currentTarget)}
                  onMouseLeave={() => setFocusPay(null)}
                  onMouseDown={() => setFocusPay(null)}
                  variant="standard"
                  defaultValue="Normal"
                  margin="dense"
                  autoComplete="off"
                  label="Monthly mortage/rent"
                  fullWidth
                  value={pay}
                  onChange={(e) => {
                    handlePay(e);
                  }}
                  InputProps={{
                    style: {
                      fontSize: '25px',
                      height: '50px',
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
                  open={Boolean(focusPay)}
                  anchorEl={focusPay}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusPay(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2 }}>
                    How much is your mortage/rent payment?
                  </Typography>
                </Popover>
                {errorPay !== '' ? (
                  <p className="text-red-500 flex justify-start">{errorPay}</p>
                ) : null}
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
      </div>
    </>
  );
};
export default FourthPageItem;
