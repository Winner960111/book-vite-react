import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';
import morto from "../../../../public/1.jpg"
const FirstPage = () => {

  const {
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
  } = useSelector((state) => state.checker);

  const dispatch = useDispatch();

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
      page: 'Full',
      last_question: '1',
    };
    const res = await usersUpdate(data, intentID);
    console.log('this is update results ====>', res);
    dispatch(addHistory(true));
  }
  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-20 mx-20">
          <p className="w-full text-4xl my-3 font-medium">
            We&apos;ll use the vehicle you selected to schedule your appointment.
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="flex p-5 justify-center items-center">
              <img src={morto} alt="mortocycle" className="w-2/4 px-10" />
              <div className="border-solid border-l-2 border-gray-200 h-[100px]"></div>
              <div className="flex flex-col px-10 justify-center">
                <b>2021 Yamaha MT-10</b>
                <p><b>VIN</b> JYARN48E2MA003848</p>
                <p><b>Stock</b>  UYA003848R</p>
              </div>
            </div>
            <div className="w-full p-5 flex justify-end">

              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#854fff] w-[30%] h-16 mx-4 rounded-lg text-white text-xl  hover:bg-purple-800"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};
export default FirstPage;
