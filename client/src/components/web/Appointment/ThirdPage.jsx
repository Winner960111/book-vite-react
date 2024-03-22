import { useDispatch, useSelector } from 'react-redux';
import {
    addHistory, removeHistory
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import dealer from '../../../../public/2.png'
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
            last_question: '3',
        };
        const res = await usersUpdate(data, intentID);
        console.log('this is update results ====>', res);

        dispatch(addHistory(true));
    }
    return (
        <>
            <div className="flex bg-gray-50 w-full justify-center items-center">
                <div className=" w-2/3 flex flex-col mt-20 mx-20 items-center">
                    <p className="w-full text-4xl my-3 font-medium">
                        When would you like to start your appointment?
                    </p>
                    <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
                        <div className="flex flex-col p-10 items-center w-full">

                            <div className="flex flex-col items-center bg-blue-500 p-2 rounded-md w-[200px]">
                                <img src={dealer} alt="dealer" className="w-[100px]" />
                                <b>dealer</b>
                            </div>
                            <div className="flex bg-gray-50 my-5 items-center rounded-md w-full justify-center">
                                <LocationOnIcon style={{ fontSize: '50px' }} />
                                <div className="flex flex-col my-5 text-center">
                                    <b>Ridenow powersports austin</b>
                                    <p>11405 N I35</p>
                                    <p>AUTIN 78753</p>
                                </div>
                            </div>

                        </div>
                        <div className="w-full p-5 flex justify-between">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="bg-[#854fff] w-[30%] h-16 mx-1 rounded-lg text-white text-xl  hover:bg-purple-800"
                            >
                                BACK
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="bg-[#854fff] w-[30%] h-16 mx-1 rounded-lg text-white text-xl  hover:bg-purple-800"
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
export default FirstPage;
