import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory, clearHistory } from '../../../store/reducers/checker';
import { SubmitTrade } from '../../../api/index';
import { useNavigate } from 'react-router-dom';

const ThirdPage = () => {

  const {
    dealerName,
    dealerId,
    checkerMobileNumber,
    checkerFirstName,
    checkerLastName,
    checkerEmail,
    dealType,
    instantYear,
    instantMake,
    instantModel,
    vehicleCondition,
    vehicleType,
    mileageHour,
    originalOwner,
    commentValue,
  } = useSelector((state) => state.checker);
  const navigate = useNavigate()

  const Tobegin = () => {
    console.log("I'm here")
    navigate(-1);
    dispatch(clearHistory());
  }
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      dealer_id: dealerId,
      first_name: checkerFirstName,
      middle_name: "",
      last_name: checkerLastName,
      email: checkerEmail,
      mobile_phone: checkerMobileNumber,
      status: 'New',
      source: 'Trade In',
      deal_type: dealType,
      vin: "",
      year: instantYear,
      make: instantMake,
      model: instantModel,
      condition: vehicleCondition,
      vehicle_type: vehicleType,
      mileage_hours: mileageHour,
      original_owner: originalOwner,
      comment: commentValue,
    };

    console.log("Trade------->", data)
    const res = await SubmitTrade(data);
    if (res.status == 201) {
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
    } else {
      console.log('Faild ImageSend');
    }
  };

  return (
    <div className="flex bg-gray-50 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20">
        <p className="w-2/3 text-4xl text-black my-3 font-medium">
          Please take a moment to review the information below.
        </p>
        <form
          className={classNames(
            'text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
          )}
        >
          <p className="bg-gray-50 rounded-3xl p-4 mt-2">
            We are committed to protecting your privacy. The information you
            provide is solely shared with our dealership for the purpose of
            assessing your request. It is not sold, marketed, or distributed in
            any way by {dealerName}. Your trust is paramount to us.
          </p>
          <div className="bg-gray-50 rounded-3xl p-4 mt-2">
            <p className="w-full">
              Please click{' '}
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              to read our Privacy Notice and click{' '}
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              to read our full Privacy Policy. If you would like to opt-out of
              having your information shared at all, please do so now by
              clicking{' '}
              <span onClick={Tobegin} className="cursor-pointer text-blue-600">
                here
              </span>{' '}
              and exiting the application.
            </p>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full lg:min-w-[200px] lg:w-[30%] border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ThirdPage;
