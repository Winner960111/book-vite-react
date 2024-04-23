import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getDealerInfo, clearHistory } from '../store/reducers/checker';
import shield from '../assets/shield.jpg';

const Home = () => {
  const { dealer_id } = useParams();
  const { dealerName, dealerLogo } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // getting dealer_name and avatar
  useEffect(() => {
    const dealerInfoCall = dispatch(getDealerInfo(dealer_id));
    new Promise(dealerInfoCall);
  }, [dealer_id, dispatch]);

  const changePageQuote = () => {
    navigate(`/info-checker/${dealer_id}/quote`);
  };

  const changePagePrequalified = () => {
    navigate(`/info-checker/${dealer_id}/prequalified`);
  };
  const changePageAppointment = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/appointment`);
  };
  const changePageTradeIn = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/trade`);
  };
  const changePageCheckApp = () => {
    dispatch(clearHistory());
    navigate(`/info-checker/${dealer_id}/check`);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center bg-gray-50">
      <div className="flex w-full justify-center bg-white">
        <div className="w-full rounded-lg flex justify-end items-center py-6 px-4 bg-white shadow-[10px_10px_20px_-5px_rgba(0,0,0,0.3)]">
          <img
            className="w-24 h-12 mr-[20%]"
            src={dealerLogo}
            alt="avatar"
          />
          <img className="w-12 h-10 cursor-pointer" src={shield} alt="avatar" />
        </div>
      </div>
      <div className="w-full mt-20 flex-col text-center">
        <p className="text-xl font-bold">🌟 Welcome to {dealerName}!🤖</p>
        <div className="flex flex-col mt-10 px-16 justify-around">
          <button
            onClick={changePagePrequalified}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            GET PREQUALIFIED
          </button>
          <button
            // onClick={changePagePrequalified}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            FULL CREDIT APPLICATION
          </button>
          <button
            onClick={changePageQuote}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            GET A QUOTE
          </button>
          <button
            onClick={changePageTradeIn}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            TRADE IN VALUE
          </button>
          <button
            onClick={changePageAppointment}
            className="text-sm md:text-lg text-white bg-[#854fff] rounded-md px-2 md:px-4 py-2 mt-2 hover:bg-purple-800"
          >
            APPOINTMENT
          </button>
          <button
            onClick={changePageCheckApp}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            CHECK APPLICATION STATUS
          </button>
          <button
            // onClick={changePagePrequalified}
            className="text-sm text-white bg-[#854fff] rounded-md px-2 mt-2 py-2 hover:bg-purple-800"
          >
            CALL BACK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
