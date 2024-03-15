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
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import { GiPositionMarker } from "react-icons/gi";
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

const FourthPageItem = () => {
    const dispatch = useDispatch();

    const [address, setAddress] = useState('');
    const [locality, setLocality] = useState('');
    const [state, setState] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [apt, setApt] = useState('');
    const [errors, setErrors] = useState({});
    const [focus, setFocus] = useState(Boolean)
    const [residental, setResidental] = useState('')
    const [errorResidental, setErrorResidental] = useState('')
    const [pay, setPay] = useState('');
    const [errorPay, setErrorPay] = useState('');
    const [focusPay, setFocusPay] = useState(Boolean);
    const [residentalYear, setResidentalYear] = useState('')
    const [errorYear, setErrorYear] = useState('')
    const [errorMonth, setErrorMonth] = useState('')
    const [residentalMonth, setResidentalMonth] = useState('')

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

        let pass = 0;
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
        if (!pay) {
            setErrorPay('*Required');
        } else if (!/^\d+$/.test(pay)) {
            setErrorPay('*Not supported format');
        } else {
            pass += 1;
        }
        setErrors(newErrors);

        if (!residental) {
            setErrorResidental('*required')
        } else {
            pass += 1;
        }
        if (!residentalYear) {
            setErrorYear('*required')
        } else {
            pass += 1;
        } if (!residentalMonth) {
            setErrorMonth('*required')
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
            dispatch(setPreviousCheckerAddress(address));
            dispatch(setPreviousCheckerApt(apt));
            dispatch(setPreviousCheckerLocality(locality));
            dispatch(setPreviousCheckerState(state));
            dispatch(setPreviousCheckerZipcode(zipcode));
            dispatch(setPreviousMonthlyPay(pay));
            dispatch(setPreviousResidentalMonths(residentalMonth));
            dispatch(setPreviousResidentalYears(residentalYear));
        }
    };
    return (
        <>
            <div className="flex bg-gray-50 w-full justify-center items-center">
                <div className="w-2/3 flex flex-col mt-28 mx-20">
                    <p className="w-3/4 text-4xl my-3 font-medium">
                        What is your previous address information?
                    </p>
                    <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
                        <div className="w-full flex px-5 pt-5 flex-col md:flex-row">
                            <div className="md:w-[68%] w-full h-20 rounded-md text-2xl my-3 md:mx-5 flex flex-col">
                                <Paper
                                    sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', height: '70px' }}
                                >
                                    <GiPositionMarker className='text-4xl mx-2' />
                                    <InputBase
                                        onFocus={() => setFocus(true)}
                                        onBlur={() => setFocus(false)}
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
                                {focus && <p className="bg-gray-50 rounded-3xl text-[17px] p-4 mt-2">Please input your previous address.</p>}
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
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set the height of the TextField
                                            fontSize: '25px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px'
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
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set the height of the TextField
                                            fontSize: '25px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px'
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
                                    InputProps={{
                                        style: {
                                            height: '50px', // Set the height of the TextField
                                            fontSize: '25px',
                                        },
                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px'
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
                                    type="text"
                                    defaultValue="Normal"
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
                                            fontSize: '25px'
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
                                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ padding: '0 5px', fontSize: '18px' }}>What is your residental status in this address?</FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            onChange={(e) => { setResidental(e.target.value) }}
                                            style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-around', padding: '10px' }}
                                        >
                                            <FormControlLabel value="Rent" control={<Radio />} label="Rent" className='hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 ' />
                                            <FormControlLabel value="Own" control={<Radio />} label="Own" className='hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 ' />
                                            <FormControlLabel value="Family" control={<Radio />} label="Family" className='hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 ' />
                                            <FormControlLabel value="Other" control={<Radio />} label="Other" className='hover:bg-violet-200 w-[120px] border-[1px] border-gray-300 border-solid rounded-xl pt-1 mt-1 ' />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                                {errorResidental !== '' ? (
                                    <p className="text-red-500 pl-6 pt-2">{errorResidental}</p>
                                ) : null}
                            </div>

                            <div className="md:w-[32%] w-full bg-gray-50 rounded-2xl my-3 md:mx-5">
                                <p className='px-2 pt-5'>How long have you lived at your previous address?</p>
                                <div className="w-full flex">
                                    <TextField
                                        variant="standard"
                                        defaultValue="Normal"
                                        margin="dense"
                                        label="Year"
                                        value={residentalYear}
                                        style={{ margin: '0 10px 0 10px' }}
                                        onChange={(e) => { setResidentalYear(e.target.value) }}
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
                                        value={residentalMonth}
                                        style={{ margin: '0 10px 0 10px' }}
                                        onChange={(e) => { setResidentalMonth(e.target.value) }}
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
                                    <p className="text-red-500 pl-6 pt-2">{errorMonth}</p>
                                ) : null}
                            </div>
                        </div>
                        <div className="w-full p-5 flex justify-between">
                            <div className="w-[40%] flex flex-col -mt-4 ml-5">
                                <TextField
                                    onFocus={() => { setFocusPay(true) }}
                                    onBlur={() => { setFocusPay(false) }}
                                    variant="standard"
                                    defaultValue="Normal"
                                    margin="dense"
                                    label="Monthly mortage/rent"
                                    fullWidth
                                    value={pay}
                                    onChange={(e) => { setPay(e.target.value) }}
                                    InputProps={{
                                        style: {
                                            fontSize: '25px',
                                            height: '50px'
                                        },

                                    }}
                                    InputLabelProps={{
                                        style: {
                                            fontSize: '25px',
                                        },
                                    }}
                                />
                                {focusPay && <p className='bg-gray-50 pt-2 rounded-xl'>How much is your mortage/rent payment?</p>}
                                {errorPay !== '' ? (
                                    <p className="text-red-500 pl-6 pt-2">{errorPay}</p>
                                ) : null}
                            </div>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-[#854fff] w-[30%] h-16 p-2 mx-2 rounded-lg text-white text-xl  hover:bg-purple-800"
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
