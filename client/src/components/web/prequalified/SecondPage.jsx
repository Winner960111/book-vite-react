import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setCheckerAddress,
  setCheckerApt,
  setCheckerLocality,
  setCheckerState,
  setCheckerZipcode,
  setSubmit,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { GiPositionMarker } from 'react-icons/gi';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
const SecondPage = () => {
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [apt, setApt] = useState('');
  const [errors, setErrors] = useState({});

  const {
    submit,
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
    checkerApt,
    checkerLocality,
    checkerState,
    checkerZipcode,
  } = useSelector((state) => state.checker);

  const addressRef = useRef(null);

  useEffect(() => {
    if (submit) {
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
        newErrors.zipcode = '*ZipCode foramt is wrong';
      }
      setErrors(newErrors);
    }
  }, [submit]);

  const initializeAutocomplete = useCallback(() => {
    const input = document.getElementById('autocomplete');
    const newAutocomplete = new window.google.maps.places.Autocomplete(input);

    newAutocomplete.addListener('place_changed', () => {
      const place = newAutocomplete.getPlace();
      if (place.formatted_address !== undefined) {
        setAddress(place.formatted_address);
        dispatch(setCheckerAddress(place.formatted_address));
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
  }, [initializeAutocomplete]);

  const parseAddressComponents = (place) => {
    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case 'locality':
          setLocality(component.long_name);
          dispatch(setCheckerLocality(component.long_name));
          break;
        case 'administrative_area_level_1':
          dispatch(setCheckerState(component.short_name));
          setState(component.short_name);
          break;
        case 'postal_code':
          dispatch(setCheckerZipcode(component.long_name));
          setZipcode(component.long_name);
          break;
      }
    }
  };
  console.log('This is checkerLocality=====>', checkerLocality);
  const handleApt = (e) => {
    setApt(e.target.value);
    dispatch(setCheckerApt(e.target.value));
    console.log('✈✈', checkerApt);
  };
  const handleLocality = (e) => {
    setLocality(e.target.value);
    dispatch(setCheckerLocality(e.target.value));
    setErrors((prev) => ({ ...prev, locality: '' }));
  };
  const handleState = (e) => {
    dispatch(setCheckerState(e.target.value));
    setState(e.target.value);
    setErrors((prev) => ({ ...prev, state: '' }));
  };
  const handleZipCode = (e) => {
    dispatch(setCheckerZipcode(e.target.value));
    setZipcode(e.target.value);
    setErrors((prev) => ({ ...prev, zipcode: '' }));
  };
  console.log('This is checkerLocality=====>', checkerZipcode);
  // useEffect(() => {
  //   setErrors('');
  // }, [zipcode, locality, state]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   setErrors('');
  //   let newErrors = {};
  //   console.log(locality);

  //   if (!locality.trim()) {
  //     newErrors.locality = '*City field is required';
  //   }
  //   if (!state.trim()) {
  //     newErrors.state = '*State field is required';
  //   }
  //   if (!zipcode.trim()) {
  //     newErrors.zipcode = '*ZipCode field is required';
  //   } else if (!/^[0-9]+$/.test(zipcode)) {
  //     newErrors.zipcode = '*ZipCode foramt is wrong';
  //   }
  // }

  //   setErrors(newErrors);

  //   if (Object.keys(newErrors).length === 0) {
  //     const data = {
  //       dealer_id: dealerId,
  //       device_ip_address: deviceIP,
  //       device_operating_system: deviceOS,
  //       device_browser: deviceBrowser,
  //       device_type: type,
  //       device_state: deviceState,
  //       device_city: deviceCity,
  //       device_country: deviceCountry,
  //       device_date_time: deviceDate,
  //       device_lat: deviceLat,
  //       device_lon: deviceLon,
  //       status: 'Started',
  //       lang: 'EN',
  //       phone: checkerMobileNumber,
  //       page: 'Short',
  //       last_question: '2',
  //     };
  //     const res = await usersUpdate(data, intentID);
  //     console.log('this is update results ====>', res);
  //     dispatch(addHistory(true));
  //     dispatch(setCheckerAddress(address));
  //     dispatch(setCheckerApt(apt));
  //     dispatch(setCheckerLocality(locality));
  //     dispatch(setCheckerState(state));
  //     dispatch(setCheckerZipcode(zipcode));
  //     setAddress('');
  //     setApt('');
  //     setLocality('');
  //     setState('');
  //     setZipcode('');
  //   }
  // };

  return (
    <>
      {/* <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className="w-2/3 flex flex-col mt-5 mx-20">*/}
      {/* <p className="w-3/4 text-4xl my-3 font-medium">
        Make sure this is a physical address and not a P.O Box
      </p> */}
      {/*<div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans"> */}

      <div className=" w-full h-20 rounded-md text-center p-4 text-2xl my-3">
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
            sx={{ ml: 1, flex: 1, fontSize: '25px' }}
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
        {errors.address ? (
          <p className="text-red-500 pl-2">{errors.address}</p>
        ) : null}
      </div>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full h-20 rounded-md text-center text-2xl my-3 md:mx-5">
          <TextField
            value={apt}
            onChange={handleApt}
            fullWidth
            type="text"
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
        <div className="w-full h-20 rounded-md text-center text-2xl my-3 md:mx-5 flex flex-col">
          <TextField
            value={locality}
            onChange={handleLocality}
            fullWidth
            type="text"
            defaultValue="Normal"
            autoComplete="off"
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
          {errors.locality ? (
            <p className="text-red-500 text-[16px] flex justify-start">
              {errors.locality}
            </p>
          ) : null}
        </div>
      </div>

      <div className="w-full flex justify-between flex-col md:flex-row">
        <div className="w-full h-20 rounded-md text-center text-2xl my-3 md:mx-5">
          <TextField
            value={state}
            onChange={handleState}
            fullWidth
            type="text"
            defaultValue="Normal"
            autoComplete="off"
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
          {errors.state ? (
            <p className="text-red-500 text-[16px] flex justify-start">
              {errors.state}
            </p>
          ) : null}
        </div>

        <div className="w-full h-20 rounded-md text-center text-2xl my-3 md:mx-5">
          <TextField
            value={zipcode}
            onChange={handleZipCode}
            fullWidth
            type="text"
            defaultValue="Normal"
            label="Zip Code"
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
          {errors.zipcode ? (
            <p className="text-red-500 text-[16px] flex justify-start">
              {errors.zipcode}
            </p>
          ) : null}
        </div>
      </div>
      {/* <div className="w-full p-5 flex justify-end">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#854fff] w-[30%] h-16 p-2 mx-5 rounded-lg text-white text-xl  hover:bg-purple-800"
        >
          CONTINUE
        </button>
      </div> */}
      {/* </div>
        </div>
      </div> */}
    </>
  );
};
export default SecondPage;
