import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { addHistory, setOriginalOwner } from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';

const DealType = () => {
  const { step, intentID,
    dealerId,
    deviceIP,
    deviceOS,
    deviceCity,
    deviceCountry,
    deviceState,
    deviceDate,
    deviceLat,
    deviceLon,
    deviceBrowser,
    type,
    checkerMobileNumber, } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    setError(null);
    setOwner('')
  }, [step]);

  const handleSubmit = async () => {
    if (owner) {
      const data = {
        dealer_id: dealerId,
        device_ip_address: deviceIP,
        device_operating_system: deviceOS,
        device_browser: deviceBrowser,
        device_type: type,
        device_state: deviceState,
        device_city: deviceCity,
        device_country: deviceCountry,
        device_date_time: deviceDate,
        device_lat: deviceLat,
        device_lon: deviceLon,
        status: 'Started',
        lang: 'EN',
        phone: checkerMobileNumber,
        page: 'Trade In',
        last_question: '9',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setOriginalOwner(owner));
    } else {
      setError('You must select one of above methodes.');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 12 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="flex flex-col md:justify-between bg-gray-50 rounded-3xl p-4">
          <div className="flex flex-col md:flex-row ">
            <label
              htmlFor="radio1"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setOwner('Yes');
              }}
            >
              {step != 11 ? (
                <input
                  type="radio"
                  id="radio1"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio1"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
              )}
              Yes
            </label>
            <label
              htmlFor="radio2"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setOwner('No');
              }}
            >
              {step != 11 ? (
                <input
                  type="radio"
                  id="radio2"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio2"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
              )}
              No
            </label>
          </div>

          <p className=" px-6">
            <b> Are you original owner?</b>
          </p>
          {error !== '' ? (
            <p className="text-red-500 pl-2 pt-2">{error}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 12 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 10 ? renderDescription() : null}</>;
};

export default DealType;
