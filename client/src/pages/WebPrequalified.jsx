import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Flat } from '@alptugidin/react-circular-progress-bar';
// checker step components
import PhoneVerification from '../webqualifiedcomponents/PhoneVerification';
import CheckVerifyCode from '../webqualifiedcomponents/CheckVerifyCode';
import FirstPage from '../webqualifiedcomponents/FirstPage';
import SecondPage from '../webqualifiedcomponents/SecondPage';
import ThirdPage from '../webqualifiedcomponents/ThirdPage';

import {
  clearHistory,
  getDealerInfo,
  setDealerId,
} from '../store/reducers/checker';

const WebPrequalified = () => {
  const { dealerLogo, step, history } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const { dealer_id } = useParams();

  useEffect(() => {
    // when refresh app, set dealer_id and dealer_info of store
    const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
    new Promise(dealerInfoCall);
    dispatch(setDealerId(dealer_id));
  }, [history, step, dealer_id, dispatch]);

  const Refresh = () => {
    dispatch(clearHistory());
  };
  return (
    <div className="bg-gray-100 w-screen h-screen min-w-[755px]">
      <div className="w-full bg-white border-gray-100 border-b-2 flex justify-center items-center">
        <div className="w-2/3 my-5 flex justify-between items-center">
          <img
            onClick={Refresh}
            className="w-1/4 h-16 cursor-pointer"
            src={dealerLogo}
            alt="avatar"
          />
          <div className=" w-32 h-10">
            <Flat
              progress={20 + (step / 5) * 100}
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
    </div>
  );
};
export default WebPrequalified;
