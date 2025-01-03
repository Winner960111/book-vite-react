import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setPrevjobOccupation,
  setPrevEmployerName,
  setPrevEmployerPhoneNumber,
  setPrevJobApt,
  setPrevJobCity,
  setPrevJobState,
  setPrevJobZipcode,
  setPrevJobSalary,
  setPrevJobstatus,
  setPrevJobYear,
  setPrevJobAddress,
  setJobEndDate,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { GiPositionMarker } from "react-icons/gi";
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const FifthPageItem = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [apt, setApt] = useState('');
  const [errors, setErrors] = useState({});
  const [focus, setFocus] = useState(Boolean)
  const [errorJobKind, setErrorJobKind] = useState('')
  const [pay, setPay] = useState('');
  const [date, setDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [errorPay, setErrorPay] = useState('');
  const [errorDate, setErrorDate] = useState('');
  const [errorEndDate, setErrorEndDate] = useState('');
  const [focusPay, setFocusPay] = useState(Boolean);
  const [occupation, setOccupation] = useState('')
  const [Ename, setEname] = useState('')
  const [Enumber, setEnumber] = useState('')
  const [jobKind, setJobKind] = useState('')
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
  }, [step]);

  const handleDate = (value) => {
    setErrorDate('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 1900 || Number(year) > 2100) {
      setErrorDate('*Invalid Date');
    }
    setDate(year + '-' + String(month) + '-' + date);
  };

  const handleEndDate = (value) => {
    setErrorEndDate('');
    console.log('value==>', value);
    let year, month, date;
    year = value.$y;
    month = parseInt(value.$M) + 1;
    date = value.$D;
    if (Number(year) < 1900 || Number(year) > 2100) {
      setErrorEndDate('*Invalid Date');
    }
    setEndDate(year + '-' + String(month) + '-' + date);
  };

  const handlePay = (e) => {
    if (/^[0-9]+$/.test(e.target.value) || !e.target.value.trim()) {
      setPay(e.target.value)
    }
    setErrorPay('');
  }

  useEffect(() => {
    setErrors({})
  }, [zipcode, locality, state])

  const handleEnumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setEnumber(formattedInputValue);
  };
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

  const handleJobKind = (e) => {
    setErrorJobKind('')
    setJobKind(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let pass = 0;
    setErrors('');
    let newErrors = {};
    console.log(locality);

    if (!locality.trim()) {
      newErrors.locality = '*Required';
    }
    if (!state.trim()) {
      newErrors.state = '*Required';
    }
    if (!zipcode.trim()) {
      newErrors.zipcode = '*Required';
    } else if (!/^[0-9]+$/.test(zipcode)) {
      newErrors.zipcode = '*Invalid format';
    }
    if (!address) {
      newErrors.address = "*Required"
    }
    if (!date) {
      setErrorDate('*Required')
    } else { pass += 1 }

    if (!Enumber) {
      newErrors.Enumber = '*Required'
    } else { pass += 1 }
    if (!Ename.trim()) {
      newErrors.Ename = '*Required'
    } else if (!/^[A-Za-z]+$/.test(Ename.replace(/\s/g, ""))) {
      newErrors.Ename = '*contains only characters'
    } else {
      pass += 1;
    }
    if (!occupation.trim()) {
      newErrors.occupation = '*Required'
    } else if (!/^[A-Za-z]+$/.test(occupation)) {
      newErrors.occupation = '*contains only characters'
    } else {
      pass += 1;
    }
    if (!pay) {
      setErrorPay('*Required');
    } else if (!/^\d+$/.test(pay)) {
      setErrorPay('*Not supported format');
    } else {
      pass += 1;
    }
    setErrors(newErrors);

    if (!jobKind) {
      setErrorJobKind('*required')
    } else {
      pass += 1;
    }
    if (!endDate) {
      setErrorEndDate('*Required')
    } else { pass += 1 }



    if (Object.keys(newErrors).length === 0 && pass == 7) {
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
        last_question: '5',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setPrevJobAddress(address))
      dispatch(setPrevJobApt(apt));
      dispatch(setPrevJobCity(locality));
      dispatch(setPrevJobState(state));
      dispatch(setPrevJobZipcode(zipcode));
      dispatch(setPrevJobSalary(pay));
      dispatch(setPrevjobOccupation(occupation))
      dispatch(setPrevEmployerName(Ename))
      dispatch(setPrevEmployerPhoneNumber(Enumber))
      dispatch(setPrevJobstatus(jobKind))
      dispatch(setPrevJobYear(date))
      dispatch(setJobEndDate(endDate))
    }
  };
  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className="w-2/3 flex flex-col mt-28 mx-20">
          <p className="w-3/4 text-4xl my-3 font-medium">
            What is your previous job information?
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full px-5 flex justify-between flex-col lg:flex-row">
              <div className="lg:w-1/3 w-full my-3 lg:mx-5">
                <TextField
                  value={occupation}
                  onChange={(e) => {
                    setOccupation(e.target.value);
                  }}
                  fullWidth
                  defaultValue="Normal"
                  label="Occupation"
                  autoFocus
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
                {errors.occupation ? (
                  <p className="text-red-500 pl-2">{errors.occupation}</p>
                ) : null}
              </div>
              <div className="lg:w-1/3 w-full my-3 lg:mx-5">
                <TextField
                  value={Ename}
                  onChange={(e) => {
                    setEname(e.target.value);
                  }}
                  fullWidth
                  defaultValue="Normal"
                  label="Employeer's name"
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
                {errors.Ename ? (
                  <p className="text-red-500 pl-2">{errors.Ename}</p>
                ) : null}
              </div>

              <div className="lg:w-1/3 w-full my-3 lg:mx-5">
                <TextField
                  value={Enumber}
                  onChange={handleEnumber}
                  fullWidth
                  defaultValue="Normal"
                  label="Employeer's phone number"
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
                {errors.Enumber ? (
                  <p className="text-red-500 pl-2">{errors.Enumber}</p>
                ) : null}
              </div>
            </div>
            <div className="w-full flex px-5 pt-5 flex-col lg:flex-row">
              <div className="lg:w-[31%] w-full my-3 lg:mx-5 flex flex-col">
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
                    Please input your job address.
                  </Typography>
                </Popover>
                {errors.address ? (
                  <p className="text-red-500 pl-2">{errors.address}</p>
                ) : null}
              </div>
              <div className="lg:w-[69%] w-full flex flex-col lg:flex-row lg:mx-5">
                <div className="lg:w-1/4 w-full my-3 lg:mx-3">
                  <TextField
                    value={apt}
                    onChange={(e) => setApt(e.target.value)}
                    fullWidth
                    type="text"
                    defaultValue="Normal"
                    label="Apt/Suite (Optional)"
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
                </div>
                <div className="lg:w-1/4 w-full my-3 lg:mx-3">
                  <TextField
                    value={locality}
                    onChange={(e) => {
                      setLocality(e.target.value);
                      setErrors((prev) => ({ ...prev, locality: '' }));
                    }}
                    fullWidth
                    type="text"
                    defaultValue="Normal"
                    label="City"
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
                  {errors.locality ? (
                    <p className="text-red-500 pl-2">{errors.locality}</p>
                  ) : null}
                </div>
                <div className="lg:w-1/4 w-full my-3 lg:mx-3">
                  <TextField
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                      setErrors((prev) => ({ ...prev, state: '' }));
                    }}
                    fullWidth
                    type="text"
                    defaultValue="Normal"
                    label="State"
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
                  {errors.state ? (
                    <p className="text-red-500 pl-2">{errors.state}</p>
                  ) : null}
                </div>
                <div className="lg:w-1/4 w-full my-3 lg:mx-3">
                  <TextField
                    value={zipcode}
                    onChange={(e) => {
                      setZipcode(e.target.value);
                      setErrors((prev) => ({ ...prev, zipcode: '' }));
                    }}
                    fullWidth
                    type="text"
                    defaultValue="Normal"
                    autoComplete='off'
                    label="Zip Code"
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
                  {errors.zipcode ? (
                    <p className="text-red-500 pl-2">{errors.zipcode}</p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex w-[93%] flex-col lg:flex-row items-center">
              <div className="lg:w-1/3 w-full flex flex-col">
                <TextField
                  aria-owns={focusPay ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) => setFocusPay(event.currentTarget)}
                  onMouseLeave={() => setFocusPay(null)}
                  onMouseDown={() => setFocusPay(null)}
                  variant="standard"
                  defaultValue="Normal"
                  margin="dense"
                  autoComplete='off'
                  label="Salary"
                  fullWidth
                  value={pay}
                  onChange={(e) => {
                    handlePay(e)
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
                    What is your annual gross salary?
                  </Typography>
                </Popover>
                {errorPay !== '' ? (
                  <p className="text-red-500 flex justify-start">{errorPay}</p>
                ) : null}
              </div>
              <div className="lg:w-1/3 w-full mt-3 md:mx-5 bg-gray-50 rounded-2xl flex flex-col">
                <FormControl variant="filled" sx={{ m: 1, minwidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    style={{ fontSize: '15px' }}
                  >
                    Are you full time or part time?
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={(e) => handleJobKind(e)}
                  >
                    <MenuItem value={'Full Time'}>Full time</MenuItem>
                    <MenuItem value={'Part Time'}>Part time</MenuItem>
                  </Select>
                </FormControl>
                {errorJobKind !== '' && (
                  <p className="text-red-500 pl-2">{errorJobKind}</p>
                )}
              </div>
              <div className="w-full lg:w-1/3 flex flex-col">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={['DatePicker']}
                    minDate="1900-01-01"
                    maxDate="2100-01-01"
                  >
                    <DatePicker
                      label="Start working Date in here?"
                      onChange={(newValue) => handleDate(newValue)}
                      className="w-full"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errorDate !== '' ? (
                  <p className="text-red-500 pl-6 pt-2">{errorDate}</p>
                ) : null}
              </div>
            </div>
            <div className="w-full p-5 flex flex-col lg:flex-row justify-between">
              <div className="w-full lg:w-[30%] flex flex-col lg:ml-4">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={['DatePicker']}
                    minDate="1900-01-01"
                    maxDate="2100-01-01"
                  >
                    <DatePicker
                      label="End working Date in your previous job?"
                      onChange={(newValue) => handleEndDate(newValue)}
                      className="w-full"
                    />
                  </DemoContainer>
                </LocalizationProvider>
                {errorEndDate !== '' ? (
                  <p className="text-red-500 pl-6 pt-2">{errorEndDate}</p>
                ) : null}
              </div>
            </div>
            <div className="w-full p-5 flex justify-end">
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
export default FifthPageItem;
