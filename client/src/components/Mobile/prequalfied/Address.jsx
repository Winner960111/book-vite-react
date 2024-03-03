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
import { usersUpdate } from '../../../api/index';

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
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
        page: 'Short',
        last_question: '7',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
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
        <input
          className="w-full h-16 rounded-md text-center text-lg border p-2"
          id="autocomplete"
          placeholder="Enter your address"
          type="text"
          autoFocus
          autoComplete="off"
          ref={addressRef}
          style={step > 9 ? { display: 'none' } : { display: 'block' }}
        />
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
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step > 9 ? { display: 'none' } : { display: 'block' }}
        >
          SAVE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-sm md:text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        <p>{checkerAddress}</p>
        <p>
          {checkerLocality} {checkerState} {checkerZipcode}
        </p>
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
