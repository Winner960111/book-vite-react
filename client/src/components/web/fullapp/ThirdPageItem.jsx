import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    addHistory,
    setInstantYear,
    setInstantMake,
    setInstantModel,
    setPayDown,
    setProgress,
} from '../../../store/reducers/checker';
import { usersUpdate, vehicleList } from '../../../api/index';
import { TextField } from '@mui/material';
import { useParams } from 'react-router-dom';

const ThirdPage = () => {

    const { dealer_id } = useParams()
    const {
        step,
        type,
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
        checkerMobileNumber,
    } = useSelector((state) => state.checker);
    const dispatch = useDispatch();
    const [vehicles, setVehicles] = useState([])
    const [errorPay, setErrorPay] = useState('');
    const [year, setYear] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [pay, setPay] = useState('');
    const [focusPay, setFocusPay] = useState(false);

    const vehicleListGet = async () => {
        const vehicleLists = await vehicleList(dealer_id)
        setVehicles(vehicleLists.data.sold_by_dealer)
    }
    useEffect(() => {
        setErrorPay('');
        setYear('');
        setMake('');
        setModel('');
    }, [step]);

    useEffect(() => {
        vehicleListGet()
    }, [])
    const handlePay = (e) => {
        setErrorPay('')
        setPay(e.target.value)

    }
    const handleSubmit = async () => {
        let pass = 0;

        if (!pay) {
            setErrorPay('*Required');
        } else if (!/^\d+$/.test(pay)) {
            setErrorPay('*Not supported format');
        }
        else {
            pass += 1;
        }
        if (pass == 1) {
            dispatch(setInstantYear(year))
            dispatch(setInstantMake(make))
            dispatch(setInstantModel(model))
            dispatch(setPayDown(pay))
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
                last_question: '3',
            };
            const res = await usersUpdate(data, intentID);
            console.log('this is update results ====>', res);
            dispatch(addHistory(true));
            dispatch(setProgress());

        }
    }

    console.log("this is vehicles===>", vehicles)
    return (
        <div className="flex flex-col bg-gray-50 w-full justify-center items-center min-w-[600px]">
            <p className="w-2/3 text-4xl mt-44 font-medium">
                What vehicle are you interested in?
            </p>
            <div className="w-2/3 flex flex-col text-justify bg-white rounded-3xl p-10 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
                <div className="flex md:w-full w-[95%] flex-col md:flex-row">
                    <TextField
                        variant="standard"
                        margin="dense"
                        label="Year"
                        fullWidth
                        style={{ margin: '10px' }}
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
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
                        margin="dense"
                        label="Make"
                        fullWidth
                        style={{ margin: '10px' }}
                        value={make}
                        onChange={(e) => setMake(e.target.value)}
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
                        label="Model"
                        fullWidth
                        style={{ margin: '10px' }}
                        margin="dense"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        type="text"
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
                <div className="w-full flex flex-col justify-between md:flex-row pt-10 px-2">
                    <div className="md:w-[32%] w-full flex flex-col justify-between items-center">
                        <div className="w-full flex flex-col justify-betweenrounded-3xl">
                            <TextField
                                onFocus={() => { setFocusPay(true) }}
                                onBlur={() => { setFocusPay(false) }}
                                id="standard-basic"
                                variant="standard"
                                margin="dense"
                                label="What will you down payment be?"
                                fullWidth
                                value={pay}
                                onChange={handlePay}
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
                            {focusPay && <p className='bg-gray-50 pt-2 rounded-xl'>If no down payment, please type 0.</p>}
                            {errorPay !== '' ? (
                                <p className="text-red-500 pl-6 pt-2">{errorPay}</p>
                            ) : null}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="bg-[#854fff] md:w-[32%] mt-3 md:mt-0 w-full h-16 px-2 py-1 rounded-2xl text-white text-sm lg:text-lg hover:bg-purple-800"
                    >
                        CONTINUE
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ThirdPage;
