import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { addHistory } from '../../../store/reducers/checker';
import { usersUpdate, sendMessage } from '../../../api/index';

const Message = () => {
  const {
    step,
    intentID,
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
    checkerMobileNumber,
    checkerFirstName,
    checkerLastName,
    checkerEmail,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleSubmit = async () => {
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
      page: 'Get Quote',
      last_question: '4',
    };
    const res = await usersUpdate(data, intentID);
    'this is update results ====>', res;
    if (res.status === 200) {
      const newData = {
        dealer_id: dealerId,
        first_name: checkerFirstName,
        last_name: checkerLastName,
        email: checkerEmail,
        mobile_phone: checkerMobileNumber,
        status: 'New',
        source: 'Message',
        interested_in: '',
        deal_type: 'Finance',
        drop_out_id: '',
        message: message,
      };
      const newres = await sendMessage(newData);
      if (newres.status === 201) {
        dispatch(addHistory(true));
      } else {
        'this is res ===>', newres.status;
      }
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 7 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="flex flex-col md:justify-between py-4">
          <textarea
            name=""
            id=""
            className="border-2 border-gray-200 rounded-md p-2 h-[100px] overflow-y-auto"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          ></textarea>
          <p className=" p-4 bg-gray-50 rounded-3xl mt-3 text-left">
            Send the message to Dealer
          </p>
          {error !== '' ? (
            <p className="text-red-500 pl-2 pt-2">{error}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 7 ? { display: 'none' } : { display: 'block' }}
        >
          SEND
        </button>
      </form>
    </>
  );

  return <>{step > 5 ? renderDescription() : null}</>;
};

export default Message;
