import { useState, useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerAddress,
  setCheckerApt,
  setCheckerLocality,
  setCheckerState,
  setCheckerZipcode,
} from '../../../store/reducers/checker';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const Address = () => {
  const [address, setAddress] = useState('');
  const [locality, setLocality] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [apt, setApt] = useState('');
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const {
    step,
    history,
    checkerAddress,
    checkerLocality,
    checkerState,
    checkerZipcode,
  } = useSelector((state) => state.checker);

  const addressRef = useRef(null);

  useEffect(() => {
    setErrors({});
  }, [step]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors('');
    let newErrors = {};
    console.log(locality);

    if (!locality.trim()) {
      newErrors.locality = 'City field is required';
    }
    if (!state.trim()) {
      newErrors.state = 'State field is required';
    }
    if (!zipcode.trim()) {
      newErrors.zipcode = 'ZipCode field is required';
    } else if (!/^[0-9]+$/.test(zipcode)) {
      newErrors.zipcode = '*Invalid ZipCode format'
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      dispatch(addHistory(true));
      dispatch(setCheckerAddress(address));
      dispatch(setCheckerApt(apt));
      dispatch(setCheckerLocality(locality));
      dispatch(setCheckerState(state));
      dispatch(setCheckerZipcode(zipcode));
      setAddress('');
      setApt('');
      setLocality('');
      setState('');
      setZipcode('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 10 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          <Paper
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', height: '70px' }}
          >
            <PersonPinCircleIcon />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Google Maps"
              inputProps={{ 'aria-label': 'search google maps' }}
              autoComplete="off"
              id="autocomplete"
              ref={addressRef}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        {errors.address ? (
          <p className="text-red-500 pl-2">{errors.address}</p>
        ) : null}
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Make sure this is a physical address and not a P.O Box.
        </p>
        <input
          className="w-full h-16 mt-2 rounded-md text-center text-lg border p-2"
          onChange={(e) => setApt(e.target.value)}
          value={apt}
          placeholder="Apt/Suite (Optional)"
          style={step > 9 ? { display: 'none' } : { display: 'block' }}
        />
        <input
          className="w-full h-16 rounded-md text-center text-lg border p-2"
          onChange={(e) => {
            setLocality(e.target.value);
            setErrors((prev) => ({ ...prev, locality: '' }));
          }}
          value={locality}
          placeholder="City"
          style={step > 9 ? { display: 'none' } : { display: 'block' }}
        />
        {errors.locality ? (
          <p className="text-red-500 pl-2">{errors.locality}</p>
        ) : null}
        <input
          className="w-full h-16 rounded-md text-center text-lg border p-2"
          onChange={(e) => {
            setState(e.target.value);
            setErrors((prev) => ({ ...prev, state: '' }));
          }}
          value={state}
          placeholder="State"
          style={step > 9 ? { display: 'none' } : { display: 'block' }}
        />
        {errors.state ? (
          <p className="text-red-500 pl-2">{errors.state}</p>
        ) : null}
        <input
          className="w-full h-16 rounded-md text-center text-lg border p-2"
          onChange={(e) => {
            setZipcode(e.target.value);
            setErrors((prev) => ({ ...prev, zipcode: '' }));
          }}
          value={zipcode}
          placeholder="Zip Code"
          style={step > 9 ? { display: 'none' } : { display: 'block' }}
        />
        {errors.zipcode ? (
          <p className="text-red-500 pl-2">{errors.zipcode}</p>
        ) : null}
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md px-16 py-4 text-black hover:bg-black hover:text-white font-medium text-lg mt-2"
          style={step > 9 ? { display: 'none' } : { display: 'block' }}
        >
          SAVE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-sm md:text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        <p>{checkerAddress}</p>
        {/* <p>
          {checkerLocality} {checkerState} {checkerZipcode}
        </p> */}
      </div>
    </div>
  );

  return (
    <>
      {step >= 9 ? (
        history[9] == true ? (
          <>
            {renderDescription()} {renderReply()}
          </>
        ) : (
          renderDescription()
        )
      ) : null}
    </>
  );
};

export default Address;
