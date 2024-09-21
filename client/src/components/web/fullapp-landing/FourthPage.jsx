import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setCheckerAddress,
  setCheckerApt,
  setCheckerLocality,
  setCheckerState,
  setCheckerZipcode,
  setMonthlyPay,
  setResidentalYears,
  setResidentalMonths,
  setResidentalStatus,
  setProgress,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
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
    setErrorResidental('');
  }, [residental]);

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
  };
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
      newErrors.zipcode = '*Invalid format';
    }
    if (!pay) {
      setErrorPay('*Required');
    } else if (!/^\d+$/.test(pay)) {
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
        last_question: '4',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setProgress());
      dispatch(setCheckerAddress(address));
      dispatch(setCheckerApt(apt));
      dispatch(setCheckerLocality(locality));
      dispatch(setCheckerState(state));
      dispatch(setCheckerZipcode(zipcode));
      dispatch(setMonthlyPay(pay));
      dispatch(setResidentalMonths(residentalMonth));
      dispatch(setResidentalYears(residentalYear));
      dispatch(setResidentalStatus(residental));
    }
  };
  return (
    <>
      <p className="text-2xl  text-gray-500 mt-2 ml-2">
        <b>What is your current address information?</b>
      </p>
      <div className="w-full flex flex-col gap-2 border border-gray-300 rounded-xl ">
        <div className="w-full flex justify-between  gap-2 flex-col md:flex-row">
          <div className="md:w-[68%] w-full rounded-md text-2xl mt-3 md:mx-5 flex flex-col">
            <Paper
              sx={{
                p: '2px 2px',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                height: '40px',
              }}
            >
              <GiPositionMarker className="text-4xl mx-2" />
              <InputBase
                aria-owns={focus ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={(event) => setFocus(event.currentTarget)}
                onMouseLeave={() => setFocus(null)}
                onMouseDown={() => setFocus(null)}
                sx={{ ml: 1, flex: 1, fontSize: '20px' }}
                placeholder="Search Google Maps"
                inputProps={{ 'aria-label': 'search google maps' }}
                autoFocus
                autoComplete="off"
                id="autocomplete"
                ref={addressRef}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
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
                Please input your current address.
              </Typography>
            </Popover>
          </div>
          {errors.address ? (
            <p className="text-red-500 pl-2">{errors.address}</p>
          ) : null}
          <div className="md:w-[32%] w-full rounded-md text-center text-2xl  md:mx-5">
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
                  // height: '40px', // Set the height of the TextField
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
        </div>
        <div className="w-full px-5 flex justify-between flex-col md:flex-row">
          <div className="md:w-1/3 w-full  md:mx-5">
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
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            {errors.locality ? (
              <p className="text-red-500 pl-2">{errors.locality}</p>
            ) : null}
          </div>
          <div className="md:w-1/3 w-full  md:mx-5">
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
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            {errors.state ? (
              <p className="text-red-500 pl-2">{errors.state}</p>
            ) : null}
          </div>

          <div className="md:w-1/3 w-full  md:mx-5">
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
                  height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            {errors.zipcode ? (
              <p className="text-red-500 pl-2">{errors.zipcode}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex flex-row   ">
            <div className="w-full flex flex-row  px-3 pt-3 ">
              <FormControl style={{ width: '100%' }}>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  style={{ padding: '0 3px', fontSize: '20px' }}
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
                    // margin: '10px 0',
                    display: 'flex',
                    justifyContent: 'space-around',
                    padding: '5px 10px',
                  }}
                >
                  <FormControlLabel
                    value="Rent"
                    control={<Radio />}
                    label="Rent"
                    className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl  mt-1 "
                  />
                  <FormControlLabel
                    value="Own"
                    control={<Radio />}
                    label="Own"
                    className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl mt-1 "
                  />
                  <FormControlLabel
                    value="Family"
                    control={<Radio />}
                    label="Family"
                    className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl mt-1 "
                  />
                  <FormControlLabel
                    value="Other"
                    control={<Radio />}
                    label="Other"
                    className="hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl mt-1 "
                  />
                </RadioGroup>
              </FormControl>
            </div>
            {errorResidental !== '' ? (
              <p className="text-red-500 pl-5 -mt-2">{errorResidental}</p>
            ) : null}
          </div>

          <div className=" my-1 mx-4">
            <p className=" pt-3  text-gray-600 font-[20px]">
              How long have you lived at your current address?
            </p>
            <div className="w-full flex">
              <TextField
                variant="standard"
                defaultValue="Normal"
                margin="dense"
                label="Year"
                autoComplete="off"
                value={residentalYear}
                style={{ margin: '0 10px' }}
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
                style={{ margin: '0 10px ' }}
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
        <div className="w-full flex justify-between">
          <div className="w-[250px] flex flex-col pb-2 -mt-5 pl-2 ml-5">
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
                  fontSize: '20px',
                  // height: '40px',
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
          {/* <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#854fff] w-[30%]  p-2 mx-2 rounded-lg text-white text-xl  hover:bg-purple-800"
          >
            CONTINUE
          </button> */}
        </div>
      </div>
    </>
  );
};
export default FourthPageItem;
