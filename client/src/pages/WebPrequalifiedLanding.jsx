import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { Flat } from '@alptugidin/react-circular-progress-bar';
import moment from 'moment-timezone';
import { browserName, osName } from 'react-device-detect';
// checker step components
import FirstPage_landing from '../components/web/prequalified/FirstPage_landing';
import SecondPage_landing from '../components/web/prequalified/SecondPage_landing';
import ThirdPage_landing from '../components/web/prequalified/ThirdPage_landing';
import homeImg from '../assets/webhome.png';
import refImg from '../assets/webref.png';
import {
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

const WebPrequalified = () => {
  const { dealerLogo, step, history } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const { dealer_id } = useParams();
  const parsedData = JSON.parse(dealer_id);
  const navigate = useNavigate();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

  const Site_key = import.meta.env.VITE_APP_SITE_KEY;
  const handleCaptchaChange = (value) => {
    console.log("🏅🏅🏅===>",value)
  if (value) {
    setIsCaptchaVerified(true);
  } else {
    setIsCaptchaVerified(false);
  }
  };
  
  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then(async (data) => {
        dispatch(setDeviceIP(data.ip));
        deviceInfo(data.ip).then((deviceData) => {
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
      .catch((error) => error);
  }, []);

  useEffect(() => {
    // when refresh app, set dealer_id and dealer_info of store
    const dealerInfoCall = dispatch(getDealerInfo(parsedData.slug));
    new Promise(dealerInfoCall);
    dispatch(setDealerId(parsedData.slug));
  }, [history, step, dealer_id, dispatch]);
  const handleRestart = () => {
    dispatch(clearHistory());
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(clearHistory());
  };

  return (
    <div className="flex flex-col justify-between items-center bg-gray-50 w-screen h-screen relative">
      {!isCaptchaVerified && <ReCAPTCHA
        sitekey={Site_key}
        onChange={handleCaptchaChange}
      />}
      {isCaptchaVerified && <>
      <div className="w-full bg-white border-gray-100 border-b-2 flex justify-center items-center relative">
        <div className="w-2/3 my-5 flex justify-between items-center">
          <img
            className="w-40 h-16"
            src={dealerLogo}
            alt="avatar"
          />
        </div>
      </div>
      <div className="md:min-w-[800px] md:w-1/2 text-justify bg-white rounded-3xl p-12 md:p-24 m-14 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
        {<FirstPage_landing />}
        {<SecondPage_landing />}
        {<ThirdPage_landing />}
      </div>
      <div className="h-12 bottom-0 w-full bg-white border-gray-100 border-b-2 flex justify-between items-center">
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
      </div></>}
    </div>
  );
};
export default WebPrequalified;
