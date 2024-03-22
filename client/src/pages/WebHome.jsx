import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { clearHistory, getDealerInfo } from '../store/reducers/checker';

const WebHome = () => {
  const { dealer_id } = useParams();
  const { dealerName } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="w-3/4 md:w-1/2 flex flex-col text-center items-center">
        <p className="text-2xl md:text-4xl font-bold">
          🌟 Welcome to {dealerName}! Let&apos;s Tailor Your Experience Together
          🤖
        </p>
        <p className="text-xl md:text-2xl font-serif mt-6">
          We&apos;re thrilled to have you here! At {dealerName}, we understand
          that your time is valuable, and we want to make sure your experience
          is seamless and tailored to your needs.
        </p>
        <div className="flex flex-col mt-10 w-[70%] justify-around md:flex-wrap">
          <button
            onClick={changePageQuote}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            GET A QUOTE
          </button>
          <button
            onClick={changePagePrequalified}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            GET PREQUALIFIED
          </button>
          <button
            onClick={changePageTradeInValue}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            TRADE IN VALUE
          </button>
          <button
            // onClick={changePageTradeInValue}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            CALL BACK
          </button>
          <button
            onClick={changePageFullApp}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            FULL CREDIT APPLICATION
          </button>
          <button
            // onClick={changePagePrequalified}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            CHECK APPLICATION STATUS
          </button>
          <button
            onClick={changePageAppointment}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebHome;
