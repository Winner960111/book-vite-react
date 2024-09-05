import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Flat } from '@alptugidin/react-circular-progress-bar';
import moment from 'moment-timezone';
import { browserName, osName } from 'react-device-detect';
// checker step components
import PhoneVerification from '../components/common/PhoneVerification';
import CheckVerifyCode from '../components/web/prequalified/CheckVerifyCode';
import FirstPage from '../components/web/prequalified/FirstPage';
import SecondPage from '../components/web/prequalified/SecondPage';
import ThirdPage from '../components/web/prequalified/ThirdPage';
import Finish from '../components/web/prequalified/Finish';
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

  // const Refresh = () => {
  //   dispatch(clearHistory());
  // };
  const handleRestart = () => {
    dispatch(clearHistory());
  };

  const handleBack = () => {
    navigate(-1);
    dispatch(clearHistory());
  };

  return (
    <div className="flex flex-col justify-between items-center bg-gray-50 w-screen h-screen relative">
      <div className="w-full bg-white border-gray-100 border-b-2 flex justify-center items-center relative">
        <div className="w-2/3 my-5 flex justify-between items-center">
          <img
            // onClick={Refresh}
            className="w-40 h-16"
            src={dealerLogo}
            alt="avatar"
          />
          {/* <div className=" w-32 h-10">
            <Flat
              progress={(step / 5) * 100}
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
          </div> */}
        </div>
      </div>
      {/* <div className="flex bg-gray-50 w-full justify-center items-center"> */}

      <div className="w-1/2 text-justify bg-white rounded-3xl p-24 m-14 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
        {/* {step == 0 && <PhoneVerification />} */}
        {/* {step == 1 && <CheckVerifyCode />} */}
        {<FirstPage />}
        {<SecondPage />}
        {<ThirdPage />}
        {/* {step == 1 && <Finish />} */}
      </div>
      {/* </div> */}
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
      </div>
    </div>
  );
};
export default WebPrequalified;
