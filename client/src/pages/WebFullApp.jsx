import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Flat } from '@alptugidin/react-circular-progress-bar';
import moment from 'moment-timezone';
import { browserName, osName } from 'react-device-detect';
// checker step components
import PhoneVerification from '../components/common/PhoneVerification';
import CheckVerifyCode from '../components/web/fullapp/CheckVerifyCode';
import FirstPage from '../components/web/fullapp/FirstPage';
import SecondPage from '../components/web/fullapp/SecondPage';
import ThirdPage from '../components/web/fullapp/ThirdPage';
import ThirdPageItem from '../components/web/fullapp/ThirdPageItem';
import FourthPage from '../components/web/fullapp/FourthPage';
import FourthPageItem from '../components/web/fullapp/FourthPageItem';
import FifthPage from '../components/web/fullapp/FifthPage';
import FifthPageItem from '../components/web/fullapp/FifthPageItem';
import Confirm from '../components/web/fullapp/Confirm';
import SixthPage from '../components/web/fullapp/SixthPage';
import SeventhPage from '../components/web/fullapp/SeventhPage';
import Finish from '../components/web/fullapp/Finish';
import homeImg from '../assets/webhome.png';
import refImg from '../assets/webref.png';
import {
    addHistory,
    clearHistory,
    getDealerInfo,
    setDealerId,
    setDeviceBrowser,
    setDeviceCity,
    setDeviceCountry,
    setDeviceDate,
    setDeviceIP,
    setDeviceLat,
    setDeviceLon,
    setDeviceOS,
    setDeviceState,
} from '../store/reducers/checker';
import { deviceInfo } from '../api/index';

const WebFullApp = () => {

    const { dealerLogo, step, history, residentalYears, progress, jobYear, confirm } = useSelector((state) => state.checker);
    const dispatch = useDispatch();
    const { dealer_id } = useParams();
    const navigate = useNavigate();
    const [percent, setPercent] = useState(null);
    const [delta, setDelta] = useState(0);
    useEffect(() => {
        fetch('https://api.ipify.org?format=json')
            .then((response) => response.json())
            .then(async (data) => {
                console.log('this is IP address===>', data.ip);
                dispatch(setDeviceIP(data.ip));
                deviceInfo(data.ip).then((deviceData) => {
                    console.log('this is device=======>', deviceData);
                    dispatch(setDeviceCountry(deviceData.country));
                    dispatch(setDeviceCity(deviceData.city));
                    dispatch(setDeviceState(deviceData.region));
                    dispatch(setDeviceLat(deviceData.ll[0]));
                    dispatch(setDeviceLon(deviceData.ll[1]));
                });
                const currentTime = moment
                    .tz(data.timezone)
                    .format('YYYY-MM-DD HH:mm:ss');
                dispatch(setDeviceDate(currentTime));
                dispatch(setDeviceBrowser(browserName));
                dispatch(setDeviceOS(osName));
            })
            .catch((error) => console.log(error));
    }, []);
    useEffect(() => {
        const current = new Date().getFullYear()
        const jobtime = jobYear ? jobYear.split('-')[0] : "0"
        setDelta(Math.abs(current - parseInt(jobtime)))
    }, [jobYear])
    useEffect(() => {
        // when refresh app, set dealer_id and dealer_info of store
        const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
        new Promise(dealerInfoCall);
        dispatch(setDealerId(dealer_id));
        setPercent(parseInt((progress / 7) * 100));
    }, [history, step, dealer_id, dispatch]);

    const Refresh = () => {
        dispatch(clearHistory());
    };
    const handleRestart = () => {
        dispatch(clearHistory());
    };

    const handleBack = () => {
        navigate(-1);
        dispatch(clearHistory());
    };
    const plusStep = () => {
        dispatch(addHistory(true))
    }
    return (
        <div className="bg-gray-50 w-screen h-screen relative">
            <div className="w-full bg-white border-gray-100 border-b-2 flex justify-center items-center relative min-w-[600px]">
                <div className="w-2/3 my-5 flex justify-between items-center">
                    <img
                        onClick={Refresh}
                        className="w-40 h-16 cursor-pointer"
                        src={dealerLogo}
                        alt="avatar"
                    />
                    <div className=" w-32 h-10">
                        <Flat
                            progress={percent}
                            range={{ from: 0, to: 100 }}
                            sign={{ value: '%', position: 'end' }}
                            text={'Complete'}
                            showMiniCircle={true}
                            showValue={true}
                            sx={{
                                strokeColor: '#854fff',
                                barWidth: 8,
                                bgStrokeColor: '#ffffff',
                                bgColor: { value: '#000000', transparency: '30' },
                                shape: 'full',
                                strokeLinecap: 'butt',
                                valueSize: 20,
                                valueWeight: 'bold',
                                valueColor: '#854fff',
                                valueFamily: 'Trebuchet MS',
                                textSize: 15,
                                textWeight: 'bold',
                                textColor: '#854fff',
                                textFamily: 'Trebuchet MS',
                                loadingTime: 1000,
                                miniCircleColor: '#854fff',
                                miniCircleSize: 5,
                                valueAnimation: true,
                                intersectionEnabled: true,
                            }}
                        />
                    </div>
                </div>
            </div>
            {step == 0 && <PhoneVerification />}
            {step == 1 && <CheckVerifyCode />}
            {step == 2 && <FirstPage />}
            {step == 3 && <SecondPage />}
            {step == 4 && <ThirdPage />}
            {step == 5 && <ThirdPageItem />}
            {step == 6 && <FourthPage />}
            {step == 7 && <>{parseInt(residentalYears) >= 2 ? plusStep() : <FourthPageItem />}</>}
            {step == 8 && <FifthPage />}
            {step == 9 && <>{delta >= 2 ? plusStep() : <FifthPageItem />}</>}
            {step == 10 && <Confirm />}
            {step == 11 && <>{confirm === 'Yes' ? <SixthPage /> : plusStep()}</>}
            {step == 12 && <SeventhPage />}
            {step == 13 && <Finish />}
            <div className="fixed h-12 bottom-0 w-full bg-white border-gray-100 border-b-2 flex justify-between items-center">
                <img
                    className="w-10 cursor-pointer mx-5"
                    src={homeImg}
                    alt="Home Icon"
                    onClick={handleBack}
                />
                <img
                    className="w-12 cursor-pointer mx-5"
                    src={refImg}
                    alt="refresh icon"
                    onClick={handleRestart}
                />
            </div>
        </div>
    );
};
export default WebFullApp;
