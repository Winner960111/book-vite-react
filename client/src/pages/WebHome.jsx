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
import { parseJSON } from 'date-fns';

const WebHome = () => {
  const { dealer_id } = useParams();
  const parsedData = JSON.parse(dealer_id);
  // console.log('=======================>', data);
  const { dealerLogo } = useSelector((state) => state.checker);

  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD
<<<<<<< HEAD
  // const { param } = useParams();
  // const data = JSON.parse(param);
  console.log('this is parameter 🥇🥇🥇===>', parsedData);
  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    const year = data.year;
    const make = data.make;
    const model = data.model;
    if (year && make && model) {
      dispatch(setVehicleYear(year));
      dispatch(setVehicleMake(make));
      dispatch(setVehicleModel(model));
    }
    console.log('this is in webHome=========>', year, make, model);
  }, []);

  //getting dealer_name and avatar
  useEffect(() => {
    const dealerInfoCall = dispatch(getDealerInfo(parsedData.slug));
    new Promise(dealerInfoCall);
  }, [data, dispatch]);

  const changePageQuote = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${data.slug}/quote`);
  };

  const changePagePrequalified = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${data.slug}/prequalified`);
  };

  const changePageTradeInValue = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${data.slug}/trade`);
  };
  const changePageFullApp = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${data.slug}/full`);
  };
  const changePageAppointment = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${data.slug}/appointment`);
  };
  const changePageCheckApp = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${data.slug}/check`);
  };
  const changePageMessage = () => {
    dispatch(clearHistory());
    navigate(`/message_dealer/${data.slug}`);
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
          🌟 Welcome to Let&apos;s Tailor Your Experience Together🤖
        </p>
        <div className="flex flex-col mt-10 w-[50%] justify-around md:flex-wrap">
          <button
            onClick={changePagePrequalified}
            className="text-sm md:text-xl text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            GET PREQUALIFIED
          </button>
          <button
            onClick={changePageFullApp}
            className="text-sm md:text-xl text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            FULL CREDIT APPLICATION
          </button>
          <button
            onClick={changePageQuote}
            className="text-sm md:text-xl text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            GET A QUOTE
          </button>

          <button
            onClick={changePageTradeInValue}
            className="text-sm md:text-xl text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            TRADE IN VALUE
          </button>
          <button
            onClick={changePageAppointment}
            className="text-sm md:text-xl text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            APPOINTMENT
          </button>
          <button
            onClick={changePageCheckApp}
            className="text-sm md:text-xl text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            CHECK APPLICATION STATUS
          </button>
          <button
            onClick={changePageMessage}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            MESSAGE DEALER
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebHome;
