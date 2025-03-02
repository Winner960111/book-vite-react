import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckerAddress,
  setCheckerApt,
  setCheckerLocality,
  setCheckerState,
  setCheckerZipcode,
  setCheckerStreet,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { GiPositionMarker } from 'react-icons/gi';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';
const SecondPage = () => {
  const dispatch = useDispatch();

  // const [street, setStreet] = useState('');
  // const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [apt, setApt] = useState('');
  // const [errors, setErrors] = useState({});

  const {
    checkerApt,
    checkerLocality,
    checkerZipcode,
    checkerAddress,
    checkerStreet,
  } = useSelector((state) => state.checker);

  const addressRef = useRef(null);

  const initializeAutocomplete = useCallback(() => {
    const input = document.getElementById('autocomplete');
    const newAutocomplete = new window.google.maps.places.Autocomplete(input);

    newAutocomplete.addListener('place_changed', () => {
      const place = newAutocomplete.getPlace();
      console.log('👋👋👋--->', place.formatted_address);
      if (place.formatted_address !== undefined) {
        // setStreet(place.formatted_address);
        const tmp = place.formatted_address.split(',')[0];
        dispatch(setCheckerAddress(tmp));
        document.getElementById('autocomplete').value = '';
        // setStreet(place.formatted_address);
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
          // setLocality(component.long_name);
          dispatch(setCheckerLocality(component.long_name));
          break;
        // case 'route':
        //   dispatch(setCheckerAddress(component.long_name));
        //   break;
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
  const handleApt = (e) => {
    setApt(e.target.value);
    dispatch(setCheckerApt(e.target.value));
    console.log('✈✈', checkerApt);
  };
  const handleStreet = (e) => {
    // setStreet(e.target.value);
    dispatch(setCheckerStreet(e.target.value));
    // setErrors((prev) => ({ ...prev, street: '' }));
  };
  const handleLocality = (e) => {
    // setLocality(e.target.value);
    dispatch(setCheckerLocality(e.target.value));
    // setErrors((prev) => ({ ...prev, locality: '' }));
  };
  const handleState = (e) => {
    dispatch(setCheckerState(e.target.value));
    setState(e.target.value);
    // setErrors((prev) => ({ ...prev, state: '' }));
  };
  const handleZipCode = (e) => {
    dispatch(setCheckerZipcode(e.target.value));
    setZipcode(e.target.value);
    // setErrors((prev) => ({ ...prev, zipcode: '' }));
  };
  console.log('This is checkerLocality=====>', checkerZipcode);
  console.log('This is address🏡---->', checkerAddress);

  return (
    <>
      <p className="text-2xl  ml-2 text-gray-500 mt-2 ">
        <b> Residential Information</b>
      </p>
      <div className="w-full flex flex-col py-4 gap-2 border border-gray-300 rounded-xl">
        <div className=" w-full  rounded-md text-center px-4 text-2xl ">
          <Paper
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '50px',
            }}
          >
            <GiPositionMarker className="text-2xl mx-2" />
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '20px' }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
              required
              autoComplete="off"
              id="autocomplete"
              ref={addressRef}
            />
            <IconButton type="button" sx={{ p: '14px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className="w-full rounded-md text-center text-2xl md:px-5 flex flex-col">
          <TextField
            value={checkerAddress}
            onChange={handleStreet}
            fullWidth
            autoComplete="off"
            label="Address"
            required
            variant="standard"
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
          {/* {errors.locality ? (
              <p className="text-red-500 text-[16px] flex justify-start">
                {errors.locality}
              </p>
            ) : null} */}
        </div>
        <div className="w-full flex flex-col md:flex-row ">
          <div className="w-full rounded-md text-center text-2xl  md:mx-5">
            <TextField
              value={apt}
              onChange={handleApt}
              fullWidth
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
          <div className="w-full rounded-md text-center text-2xl md:mx-5 flex flex-col">
            <TextField
              value={checkerLocality}
              onChange={handleLocality}
              fullWidth
              autoComplete="off"
              label="City"
              required
              variant="standard"
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
          <div className="w-full rounded-md text-center text-2xl md:mx-5">
            <TextField
              value={state}
              onChange={handleState}
              fullWidth
              autoComplete="off"
              label="State"
              required
              variant="standard"
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
            {/* {errors.state ? (
              <p className="text-red-500 text-[16px] flex justify-start">
                {errors.state}
              </p>
            ) : null} */}
          </div>
          <div className="w-full  rounded-md text-center text-2xl md:mx-5">
            <TextField
              value={zipcode}
              onChange={handleZipCode}
              fullWidth
              label="Zip Code"
              autoComplete="off"
              variant="standard"
              required
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
            {/* {errors.zipcode ? (
              <p className="text-red-500 text-[16px] flex justify-start">
                {errors.zipcode}
              </p>
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default SecondPage;
