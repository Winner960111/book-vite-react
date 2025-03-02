import { useEffect, useState, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setPreviousCheckerAddress,
  setPreviousCheckerApt,
  setPreviousCheckerLocality,
  setPreviousCheckerState,
  setPreviousCheckerZipcode,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { GiPositionMarker } from 'react-icons/gi';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { TextField } from '@mui/material';

const OldInterest = () => {
  const {
    step,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [apt, setApt] = useState('');
  const [error, setError] = useState('');
  const addressRef = useRef(null);

  useEffect(() => {
    setError('');
  }, [zipcode, address, locality, state]);

  useEffect(() => {
    setError('');
    setAddress('');
    setApt('');
    setLocality('');
    setState('');
    setZipcode('');
  }, []);

  const initializeAutocomplete = useCallback(() => {
    const input = document.getElementById('autocomplete1');
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
  useEffect(() => {
    console.log('this is current addressref===>', addressRef.current);
  }, [addressRef]);

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

  const handleSubmit = async (e) => {
    let pass = 0;
    e.preventDefault();
    setError('');

    if (!locality.trim()) {
      setError('City field is required');
    } else {
      pass += 1;
    }
    if (!state.trim()) {
      setError('State field is required');
    } else {
      pass += 1;
    }
    if (!zipcode.trim()) {
      setError('ZipCode field is required');
    } else if (!/^[0-9]+$/.test(zipcode)) {
      setError('*Invalid ZipCode format');
    } else {
      pass += 1;
    }

    if (pass == 3) {
      
      dispatch(addHistory(true));
      dispatch(setPreviousCheckerAddress(address));
      dispatch(setPreviousCheckerApt(apt));
      dispatch(setPreviousCheckerLocality(locality));
      dispatch(setPreviousCheckerState(state));
      dispatch(setPreviousCheckerZipcode(zipcode));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 18 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="my-2 flex flex-col items-center">
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
              sx={{ ml: 1, flex: 1, fontSize: '16px' }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
              autoComplete="off"
              id="autocomplete1"
              ref={addressRef}
              disabled={step >= 18 ? true : false}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <div className="w-[95%] mx-5 mt-2">
            <TextField
              value={apt}
              onChange={(e) => setApt(e.target.value)}
              fullWidth
              defaultValue="Normal"
              label="Apt/Suite (Optional)"
              autoComplete="off"
              variant="standard"
              InputProps={{
                style: {
                  height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '16px',
                  textAlign: 'center',
                },
              }}
              disabled={step >= 18 ? true : false}
            />
          </div>
          <div className="w-[95%] mx-5 mt-2">
            <TextField
              value={locality}
              onChange={(e) => {
                setLocality(e.target.value);
              }}
              fullWidth
              defaultValue="Normal"
              label="City"
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
                  fontSize: '16px',
                },
              }}
              disabled={step >= 18 ? true : false}
            />
          </div>
          <div className="w-[95%] mx-5 mt-2">
            <TextField
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              fullWidth
              defaultValue="Normal"
              autoComplete="off"
              label="State"
              variant="standard"
              InputProps={{
                style: {
                  height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '16px',
                },
              }}
              disabled={step >= 18 ? true : false}
            />
          </div>
          <div className="w-[95%] mx-5 mt-2">
            <TextField
              value={zipcode}
              onChange={(e) => {
                setZipcode(e.target.value);
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
                  fontSize: '16px',
                },
              }}
              disabled={step >= 18 ? true : false}
            />
          </div>
          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          What is your previous address information?
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 18 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 16 ? renderDescription() : null}</>;
};
export default OldInterest;
