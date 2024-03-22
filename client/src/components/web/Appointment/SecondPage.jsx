import { useDispatch, useSelector } from 'react-redux';
import {
    addHistory, removeHistory
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import DateButton from "../Appointment/DateButton"
import { useEffect, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const FirstPage = () => {

    const {
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

    const dispatch = useDispatch();
    const [selectDate, setSelectDate] = useState({})
    const [selectTime, setSelectTime] = useState('')
    const [error, setError] = useState('')
    useEffect(() => {
        console.log("this is selecdate====>", selectDate)
        console.log("this is selectime====>", selectTime)
    }, [selectDate, selectTime])

    // Get the current date
    const currentDate = new Date();

    // Array to store the next seven days
    const nextSevenDays = [];

    // Loop to get the month, day, and weekday for the next seven days
    for (let i = 0; i < 7; i++) {
        const nextDate = new Date();
        nextDate.setDate(currentDate.getDate() + i); // Get the date for the next day

        const nextMonth = nextDate.toLocaleString('default', { month: 'long' });
        const nextDay = nextDate.getDate();
        const nextWeekday = nextDate.toLocaleString('default', { weekday: 'long' });

        nextSevenDays.push({ month: nextMonth, day: nextDay, weekday: nextWeekday });
    }

    const handleBack = () => {
        dispatch(removeHistory())
    };
    const handleSubmit = async () => {
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
            last_question: '2',
        };
        const res = await usersUpdate(data, intentID);
        console.log('this is update results ====>', res);

        if (!selectTime) {
            setError("*Required")
        } else {

            dispatch(addHistory(true));
        }
    }
    return (
        <>
            <div className="flex bg-gray-50 w-full justify-center items-center">
                <div className=" w-2/3 flex flex-col mt-20 mx-20 items-center">
                    <p className="w-full text-4xl my-3 font-medium">
                        When would you like to start your appointment?
                    </p>
                    <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
                        {Object.keys(selectDate).length > 0 &&
                            <div className="flex flex-col items-center">
                                <b
                                    onClick={() => setSelectDate({})}
                                    className=' cursor-pointer underline underline-offset-4 hover:no-underline text-2xl p-10 text-blue-500'>{selectDate.weekday},{' '}{selectDate.month}{' '}{selectDate.day}</b>
                                <div className="flex flex-col">
                                    <div className="flex items-center">
                                        <AccessTimeIcon
                                            style={{ fontSize: '50px' }}
                                        />
                                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                                            <Select
                                                value={selectTime}
                                                onChange={(e) => { setSelectTime(e.target.value) }}
                                                inputProps={{ 'aria-label': 'Without label' }}
                                            >
                                                <MenuItem value={"09.00 AM"}>09.00 AM</MenuItem>
                                                <MenuItem value={"09.30 AM"}>09.30 AM</MenuItem>
                                                <MenuItem value={"10.00 AM"}>10.00 AM</MenuItem>
                                                <MenuItem value={"10.30 AM"}>10.30 AM</MenuItem>
                                                <MenuItem value={"11.00 AM"}>11.00 AM</MenuItem>
                                                <MenuItem value={"11.30 AM"}>11.30 AM</MenuItem>
                                                <MenuItem value={"12.00 PM"}>12.00 PM</MenuItem>
                                                <MenuItem value={"12.30 PM"}>12.30 PM</MenuItem>
                                                <MenuItem value={"01.00 PM"}>01.00 PM</MenuItem>
                                                <MenuItem value={"01.30 PM"}>01.30 PM</MenuItem>
                                                <MenuItem value={"02.00 PM"}>02.00 PM</MenuItem>
                                                <MenuItem value={"02.30 PM"}>02.30 PM</MenuItem>
                                                <MenuItem value={"03.00 PM"}>03.00 PM</MenuItem>
                                                <MenuItem value={"03.30 PM"}>03.30 PM</MenuItem>
                                                <MenuItem value={"04.00 PM"}>04.00 PM</MenuItem>
                                                <MenuItem value={"04.30 PM"}>04.30 PM</MenuItem>
                                                <MenuItem value={"05.00 PM"}>05.00 PM</MenuItem>
                                                <MenuItem value={"05.30 PM"}>05.30 PM</MenuItem>
                                                <MenuItem value={"06.00 PM"}>06.00 PM</MenuItem>
                                                <MenuItem value={"06.30 PM"}>06.30 PM</MenuItem>

                                            </Select>
                                        </FormControl>
                                    </div>
                                    {error ? (
                                        <p className="text-red-500 pl-16">{error}</p>
                                    ) : null}
                                </div>
                            </div>
                        }

                        {Object.keys(selectDate).length == 0 &&
                            <div className="flex p-5 items-center w-full">
                                {nextSevenDays.map((day, item) =>
                                    <DateButton
                                        key={item}
                                        day={day}
                                        date={(date) => setSelectDate(date)}
                                    />
                                )}
                            </div>}
                        <div className="w-full p-5 flex justify-between">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-[#854fff] w-[30%] h-16 mx-1 rounded-lg text-white text-xl  hover:bg-purple-800"
                            >
                                BACK
                            </button>
                            {Object.keys(selectDate).length > 0 &&
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="bg-[#854fff] w-[30%] h-16 mx-1 rounded-lg text-white text-xl  hover:bg-purple-800"
                                >
                                    CONTINUE
                                </button>}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};
export default FirstPage;
