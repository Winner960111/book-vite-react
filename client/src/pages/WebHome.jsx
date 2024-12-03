import { useEffect } from 'react';
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

const WebHome = () => {
  const { dealer_id } = useParams();
  const { dealerName, dealerLogo } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const changePageAppointment = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/appointment`);
  };
  const changePageCheckApp = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/check`);
  };

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
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2">
            GET PREQUALIFIED
          </button>
          <button
            onClick={changePageFullApp}
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2"
          >
            FULL CREDIT APPLICATION
          </button>
          <button
            onClick={changePageQuote}
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2"
          >
            GET A QUOTE
          </button>

          <button
            onClick={changePageTradeInValue}
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2"
          >
            TRADE IN VALUE
          </button>
          <button
            onClick={changePageAppointment}
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2"
          >
            MESSAGE DEALER
          </button>
          {/* <button
            onClick={changePageAppointment}
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2"
          >
            APPOINTMENT
          </button> */}
          {/* <button
            onClick={changePageCheckApp}
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2"
          >
            CHECK APPLICATION STATUS
          </button> */}
          {/* <button
            // onClick={changePageTradeInValue}
            className="border-black border-2 rounded-md p-5 text-black hover:bg-black hover:text-white font-medium text-3xl my-2"
          >
            CALL BACK
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WebHome;
