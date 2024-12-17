import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  clearHistory,
  getDealerInfo,
  setVehicleYear,
  setVehicleMake,
  setVehicleModel,
} from '../store/reducers/checker';
import shield from '../assets/shield.jpg';
import { Hidden } from '@mui/material';

const WebHome = () => {
  const { dealer_id } = useParams();
  const { dealerName, dealerLogo, enable_workflows } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [enable, setEnable] = useState({});

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const year = urlParams.year;
    const make = urlParams.make;
    const model = urlParams.model;

    if (year && make && model) {
      dispatch(setVehicleYear(year));
      dispatch(setVehicleMake(make));
      dispatch(setVehicleModel(model));
    }
    console.log('this is in webHome=========>', year, make, model);
  }, []);

  // getting dealer_name and avatar
  useEffect(() => {
    const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
    new Promise(dealerInfoCall);
  }, [dealer_id, dispatch]);

  useEffect(() => {
    if (Object.keys(enable_workflows).length) {
      const newEnable = {};
      enable_workflows.forEach((item) => {
        newEnable[item.name] = true; // Set property based on item.name
      });
      setEnable(newEnable);
    }
  }, [enable_workflows]);

  const changePageQuote = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/quote`);
  };

  const changePagePrequalified = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/prequalified`);
  };

  const changePageTradeInValue = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/trade`);
  };
  const changePageFullApp = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/full`);
  };
  // const changePageMessage = () => {
  //   dispatch(clearHistory());
  //   navigate(`/info-checker/${dealer_id}/message`);
  // };
  const changePageAppointment = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/appointment`);
  };
  const changePageMessage = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/message`);
  };
  // const changePageReference = () => {
  //   dispatch(clearHistory());
  //   // navigate(`/info-checker/reference/${dealer_slug}/${customer_slug}`);
  //   navigate(
  //     `/info-checker/reference/UkLWZg9DAJQ7XlrzYPhm/EfhxLZ9ck8reBm0UyPW6`
  //   );
  // };

  // const changePageCheckApp = () => {
  //   dispatch(clearHistory());
  //   navigate(`/info-checker/${dealer_id}/check`);
  // };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-50">
      <div className="flex w-full justify-center bg-white">
        <div className="flex w-3/4 justify-between py-5 px-20">
          <img className="w-40 h-16" src={dealerLogo} alt="avatar" />
          <img className="w-35 h-20" src={shield} alt="avatar" />
        </div>
      </div>
      <div className="w-3/4 flex flex-col text-center items-center mt-28">
        <p className="text-4xl font-bold">
          🌟 Welcome to {dealerName}! Let&apos;s Tailor Your Experience
          Together🤖
        </p>
        <div className="flex flex-col mt-10 w-[50%] min-w-[250px] justify-around md:flex-wrap">
          <button
            onClick={changePagePrequalified}
            className={`${enable['GET PREQUALIFIED'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            GET PREQUALIFIED
          </button>
          <button
            onClick={changePageFullApp}
            className={`${enable['FULL CREDIT APPLICATION'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            FULL CREDIT APPLICATION
          </button>
          <button
            onClick={changePageQuote}
            className={`${enable['GET A QUOTE'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            GET A QUOTE
          </button>

          <button
            onClick={changePageTradeInValue}
            className={`${enable['TRADE IN VALUE'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            TRADE IN VALUE
          </button>
          <button
            onClick={changePageAppointment}
            className={`${enable['APPOINTMENT'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            APPOINTMENT
          </button>
          <button
            onClick={changePageMessage}
            className={`${enable['MESSAGE DEALER'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            MESSAGE DEALER
          </button>
          {/* <button
            onClick={changePageCheckApp}
            className={`${enable['FULL CREDIT APPLICATION'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            CHECK APPLICATION STATUS
          </button> */}
          {/* <button
            // onClick={changePageTradeInValue}
            className={`${enable['FULL CREDIT APPLICATION'] ? 'block': 'hidden'} border-black border-2 rounded-md p-4 text-black hover:bg-black hover:text-white font-medium text-2xl my-1`}
          >
            CALL BACK
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WebHome;
