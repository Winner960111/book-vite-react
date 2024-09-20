import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Flat } from '@alptugidin/react-circular-progress-bar';
import moment from 'moment-timezone';
import { browserName, osName } from 'react-device-detect';
// checker step components
import PhoneVerification from '../components/common/PhoneVerification';
import CheckVerifyCode from '../components/web/fullapp-landing/CheckVerifyCode';
import FirstPage from '../components/web/fullapp-landing/FirstPage';
import SecondPage from '../components/web/fullapp-landing/SecondPage';
import ThirdPage from '../components/web/fullapp-landing/ThirdPage';
import ThirdPageItem from '../components/web/fullapp-landing/ThirdPageItem';
import FourthPage from '../components/web/fullapp-landing/FourthPage';
import FourthPageItem from '../components/web/fullapp-landing/FourthPageItem';
import FifthPage from '../components/web/fullapp-landing/FifthPage';
import FifthPageItem from '../components/web/fullapp-landing/FifthPageItem';
import Confirm from '../components/web/fullapp-landing/Confirm';
import SixthPage from '../components/web/fullapp-landing/SixthPage';
import SeventhPage from '../components/web/fullapp-landing/SeventhPage';
import Finish from '../components/web/fullapp-landing/Finish';
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
  const {
    dealerLogo,
    step,
    history,
    residentalYears,
    progress,
    jobYear,
    confirm,
  } = useSelector((state) => state.checker);
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
    if (jobYear) {
      const current = new Date().getFullYear();
      const jobtime = jobYear ? jobYear.split('-')[0] : '0';
      setDelta(Math.abs(current - parseInt(jobtime)));
    }
  }, [jobYear]);
  useEffect(() => {
    // when refresh app, set dealer_id and dealer_info of store
    const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
    new Promise(dealerInfoCall);
    dispatch(setDealerId(dealer_id));
    setPercent(parseInt((progress / 9) * 100));
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
    dispatch(addHistory(true));
  };
  return (
    <div className="bg-gray-50 w-screen h-screen relative flex flex-col items-center">
      <div className="w-full bg-white border-gray-100 border-b-2 flex justify-center items-center relative min-w-[600px]">
        <div className="w-2/3 my-5 flex justify-between items-center">
          <img
            onClick={Refresh}
            className="w-40 h-16 cursor-pointer"
            src={dealerLogo}
            alt="avatar"
          />
        </div>
      </div>
      <div className="md:min-w-[800px] md:w-1/2 my-2 text-justify bg-white rounded-3xl p-8 md:p-12 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col ">
        <FirstPage />
        <SecondPage />
        { <ThirdPage />}
        {<ThirdPageItem />}
        { <FourthPage />}
         
            {/* {parseInt(residentalYears) >= 2 ? plusStep() : <FourthPageItem />} */}
        
        
        {step == 8 && <FifthPage />}
        {step == 9 && <>{delta >= 2 ? plusStep() : <FifthPageItem />}</>}
        {step == 10 && <Confirm />}
        {step == 11 && <>{confirm === 'Yes' ? <SixthPage /> : plusStep()}</>}
        {step == 12 && <SeventhPage />}
        {step == 13 && <Finish />}
      </div>
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
