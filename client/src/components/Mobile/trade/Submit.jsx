import { useState } from 'react';
import BotIcon from './BotIcon';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { SubmitTrade } from '../../../api/index';

const Submit = () => {
  const [readStatePara1, setReadStatePara1] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const {
    step,
    history,
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
    commentValue
  } = useSelector((state) => state.checker);
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
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
    const res = await SubmitTrade(data);
    if (res.status == 201) {
      console.log('status ImageSend', res);
      dispatch(addHistory(true));
      setLoading(false)
    } else {
      console.log('Faild ImageSend');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 14 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4">
          - Please take a moment to review the information below.
          <br />- We are committed to protecting your privacy. The information
          that you provided is only shared with the dealership to assess your
          credit history and not otherwise sold, marketed, or distributed in any
          way by {dealerName}.<br />
        </p>
        <div className="bg-gray-50 rounded-3xl p-4 mt-2">
          <p
            onClick={() => setReadStatePara1(!readStatePara1)}
            className={
              readStatePara1 == false
                ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                : null
            }
          >
            Please click{' '}
            {step == 13 ? (
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            ) : (
              'here'
            )}{' '}
            to read our Privacy Notice and click{' '}
            {step == 13 ? (
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            ) : (
              'here'
            )}{' '}
            to read our full Privacy Policy. If you would like to opt-out of
            having your information shared at all, please do so now by clicking{' '}
            {step == 13 ? (
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            ) : (
              'here'
            )}{' '}
            and exiting the application.
          </p>
          <span
            onClick={() => setReadStatePara1(!readStatePara1)}
            className={
              step == 13
                ? 'text-blue-600 text-sm hover:underline cursor-pointer'
                : null
            }
          >
            {readStatePara1 == false ? 'More' : 'Less'}
          </span>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 14 ? { display: 'none' } : { display: 'block' }}
        >
          Submit
        </button>
      </form>
      <div className= {loading? "mt-10 flex justify-center": "mt-10 flex justify-center hidden"}><img src="/ZZ5H.gif" alt="loading.." className='w-10'/></div>

    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        <p>
          Our team is already working diligently to review your information and
          will get back to you promptly with the next steps.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {step > 12 ? (
        <>
          {renderDescription()}
          {history[13] == true ? renderReply() : null}
        </>
      ) : null}
    </>
  );
};
export default Submit;
