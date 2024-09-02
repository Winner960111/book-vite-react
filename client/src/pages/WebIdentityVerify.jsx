import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Flat } from '@alptugidin/react-circular-progress-bar';
import moment from 'moment-timezone';
import { browserName, osName } from 'react-device-detect';
import { customerInfo } from '../api/index';
// checker step components
import PhoneVerification from '../components/web/IdentityVerify/PhoneVerification';
import FirstPage from '../components/web/IdentityVerify/FirstPage';
import SecondPage from '../components/web/IdentityVerify/SecondPage';
import ThirdPage from '../components/web/IdentityVerify/ThirdPage';
import homeImg from '../assets/webhome.png';
import refImg from '../assets/webref.png';
import {
  clearHistory,
  getDealerInfo,
  setCustomerId,
  setCustomerName,
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

const WebIdentityVerify = () => {
  const { dealerLogo, step, history, dealerId } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();
  const { dealer_slug } = useParams();
  const parsedData = JSON.parse(dealer_slug);
  const { customer_slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then(async (data) => {
        'this is IP address===>', data.ip;
        dispatch(setDeviceIP(data.ip));
        deviceInfo(data.ip).then((deviceData) => {
          'this is device=======>', deviceData;
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
    // when refresh app, set dealer_slug and dealer_info of store
    const dealerInfoCall = dispatch(getDealerInfo(parsedData.slug));
    new Promise(dealerInfoCall);
  }, [history, step, dealer_slug, dispatch]);

  useEffect(() => {
    'this is location++==>', location;
  }, [location]);

  useEffect(() => {
    if (dealerId) {
      customerInfo(dealerId, customer_slug).then((res) => {
        dispatch(setCustomerId(res.data.id));
        dispatch(setCustomerName(res.data.get_full_name));
      });
    }
  }, [dealerId]);

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
  return (
    <div className="bg-gray-50 w-screen h-screen relative">
      <div className="w-full bg-white border-gray-100 border-b-2 flex justify-center items-center relative">
        <div className="w-2/3 my-5 flex justify-between items-center">
          <img
            onClick={Refresh}
            className="w-40 h-16 cursor-pointer"
            src={dealerLogo}
            alt="avatar"
          />
          <div className=" w-32 h-10">
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
          </div>
        </div>
      </div>
      {step == 0 && <PhoneVerification />}
      {step == 1 && <FirstPage />}
      {step == 2 && <SecondPage />}
      {step == 3 && <ThirdPage />}
      {/* {step == 4 && <Finish />} */}
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
export default WebIdentityVerify;
