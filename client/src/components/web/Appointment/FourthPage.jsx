import { useDispatch, useSelector } from 'react-redux';
import {
    addHistory, removeHistory
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import icon1 from '../../../../public/t1.png'
import { useState } from 'react';
import icon2 from '../../../../public/t2.png'
import icon3 from '../../../../public/t3.png'
import icon4 from '../../../../public/t4.png'
import icon5 from '../../../../public/t5.png'
import icon6 from '../../../../public/t6.png'
import icon7 from '../../../../public/t7.png'

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
    const [iconStatus1, setIconStatus1] = useState('')
    const [iconStatus2, setIconStatus2] = useState('')
    const [iconStatus3, setIconStatus3] = useState('')
    const [iconStatus4, setIconStatus4] = useState('')
    const [iconStatus5, setIconStatus5] = useState('')
    const [iconStatus6, setIconStatus6] = useState('')
    const [iconStatus7, setIconStatus7] = useState('')
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
            last_question: '4',
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
                        What vehicle features are the most important to you?
                    </p>
                    <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
                        <div className="flex w-full py-10 px-5 flex-wrap justify-center">
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => { iconStatus1 ? setIconStatus1('') : setIconStatus1('Racing') }}>

                                {iconStatus1 != 0 ? <div className="flex flex-col items-center border-solid border-2 p-5 w-40 bg-green-100 border-green-400">
                                    <img src={icon1} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div> : <div className="flex flex-col items-center border-solid border-gray-300 border-2 p-5 w-40 hover:bg-gray-50">
                                    <img src={icon1} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div>}

                            </div>
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => { iconStatus2 ? setIconStatus2('') : setIconStatus2('Racing') }}>

                                {iconStatus2 != 0 ? <div className="flex flex-col items-center border-solid border-2 p-5 w-40 bg-green-100 border-green-400">
                                    <img src={icon2} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div> : <div className="flex flex-col items-center border-solid border-gray-300 border-2 p-5 w-40 hover:bg-gray-50">
                                    <img src={icon2} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div>}

                            </div>
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => { iconStatus3 ? setIconStatus3('') : setIconStatus3('Racing') }}>

                                {iconStatus3 != 0 ? <div className="flex flex-col items-center border-solid border-2 p-5 w-40 bg-green-100 border-green-400">
                                    <img src={icon3} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div> : <div className="flex flex-col items-center border-solid border-gray-300 border-2 p-5 w-40 hover:bg-gray-50">
                                    <img src={icon3} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div>}

                            </div>
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => { iconStatus4 ? setIconStatus4('') : setIconStatus4('Racing') }}>

                                {iconStatus4 != 0 ? <div className="flex flex-col items-center border-solid border-2 p-5 w-40 bg-green-100 border-green-400">
                                    <img src={icon4} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div> : <div className="flex flex-col items-center border-solid border-gray-300 border-2 p-5 w-40 hover:bg-gray-50">
                                    <img src={icon4} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div>}

                            </div>
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => { iconStatus5 ? setIconStatus5('') : setIconStatus5('Racing') }}>

                                {iconStatus5 != 0 ? <div className="flex flex-col items-center border-solid border-2 p-5 w-40 bg-green-100 border-green-400">
                                    <img src={icon5} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div> : <div className="flex flex-col items-center border-solid border-gray-300 border-2 p-5 w-40 hover:bg-gray-50">
                                    <img src={icon5} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div>}

                            </div>
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => { iconStatus6 ? setIconStatus6('') : setIconStatus6('Racing') }}>

                                {iconStatus6 != 0 ? <div className="flex flex-col items-center border-solid border-2 p-5 w-40 bg-green-100 border-green-400">
                                    <img src={icon6} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div> : <div className="flex flex-col items-center border-solid border-gray-300 border-2 p-5 w-40 hover:bg-gray-50">
                                    <img src={icon6} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div>}

                            </div>
                            <div className="flex flex-col items-center cursor-pointer" onClick={() => { iconStatus7 ? setIconStatus7('') : setIconStatus7('Racing') }}>

                                {iconStatus7 != 0 ? <div className="flex flex-col items-center border-solid border-2 p-5 w-40 bg-green-100 border-green-400">
                                    <img src={icon7} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div> : <div className="flex flex-col items-center border-solid border-gray-300 border-2 p-5 w-40 hover:bg-gray-50">
                                    <img src={icon7} alt="" className=" w-[50px]" />
                                    <b className='mt-2'>Racing</b>
                                </div>}

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
