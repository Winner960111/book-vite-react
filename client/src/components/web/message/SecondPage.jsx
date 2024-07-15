import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addHistory } from '../../../store/reducers/checker';
import { usersUpdate, sendMessage } from '../../../api/index';
const DealType = () => {
  const {
    type,
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
    checkerMobileNumber,
    checkerFirstName,
    checkerLastName,
    checkerEmail,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');

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
      last_question: '2',
    };
    const res = await usersUpdate(data, intentID);
    console.log('this is update results ====>', res);
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
        console.log('this is res ===>', newres.status);
      }
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 w-full justify-center items-center">
      <p className="w-2/3 text-4xl mt-10 font-medium">
        Send the message to Dealer
      </p>
      <div className="w-2/3 flex flex-col md:flex-row text-justify bg-white rounded-3xl p-4 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="w-full flex flex-col justify-between">
          <textarea
            name=""
            id=""
            className="border-2 border-gray-200 rounded-md p-5"
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealType;
