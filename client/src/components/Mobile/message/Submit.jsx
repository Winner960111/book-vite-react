import { useState } from 'react';
import BotIcon from './BotIcon';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { SubmitQuote } from '../../../api/index';
import { useNavigate } from 'react-router-dom'

const Submit = () => {
  const [readStatePara1, setReadStatePara1] = useState(false);
  const dispatch = useDispatch();
  const {
    step,
    history,
    dealerName,
    dealerId,
    checkerMobileNumber,
    checkerFirstName,
    quoteStatus,
    checkerLastName,
    checkerEmail,
    quoteSource,
    dealType,
    quoteInterest,
    // deviceIP,
    // deviceOS,
    // deviceCity,
    // deviceCountry,
    // deviceState,
    // deviceDate,
    // deviceLat,
    // deviceLon,
    // deviceBrowser,
    // intentID,
    // type,
  } = useSelector((state) => state.checker);
  const navigate = useNavigate();
  const returnBack = () => {
    navigate(-1)
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const intent_data = {
    //   dealer_id: dealerId,
    //   device_ip_address: deviceIP,
    //   device_operating_system: deviceOS,
    //   device_browser: deviceBrowser,
    //   device_type: type,
    //   device_state: deviceState,
    //   device_city: deviceCity,
    //   device_country: deviceCountry,
    //   device_date_time: deviceDate,
    //   device_lat: deviceLat,
    //   device_lon: deviceLon,
    //   status: 'Completed',
    //   lang: 'EN',
    //   phone: checkerMobileNumber,
    //   page: 'Short',
    //   last_question: '6',
    // };
    // const intent_res = await usersUpdate(intent_data, intentID);
    // console.log('this is update results ====>', intent_res);

    const data = {
      dealer_id: dealerId,
      first_name: checkerFirstName,
      last_name: checkerLastName,
      middle_name: "",
      email: checkerEmail,
      mobile_phone: checkerMobileNumber,
      status: quoteStatus,
      interested_in: quoteInterest,
      deal_type: dealType,
      lead_status: "Lead",
      source: "Get Quote",
      request_type: "Sales",
      deal_status: "New",
      is_active_shopper: false,
      performed_by: "Customer",
      agent_id: ""
    };

    const res = await SubmitQuote(data);
    if (res.status == 201) {
      console.log('status ImageSend', res);
      dispatch(addHistory(true));
      returnBack()
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
          step >= 9 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4">
          - Please take a moment to review the information below.<br />
          - We are committed to protecting your privacy. The information that you
          provided is only shared with the dealership to assess your credit
          history and not otherwise sold, marketed, or distributed in any way by{' '}
          {dealerName}.<br />
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
            {step == 8 ? (
              <a
                href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
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
            {step == 8 ? (
              <a
                href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
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
            {step == 8 ? (
              <a
                href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
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
              step == 8
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
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        >
          Submit
        </button>
      </form>
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
      {step > 7 ? (
        <>
          {renderDescription()}
          {history[8] == true ? renderReply() : null}
        </>
      ) : null}
    </>
  );
};
export default Submit;
