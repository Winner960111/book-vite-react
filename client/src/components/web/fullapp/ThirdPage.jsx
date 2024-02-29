import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory } from '../../../store/reducers/checker';
import { SubmitQuote, usersUpdate } from '../../../api/index';

const ThirdPage = () => {
  const {
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
    intentID,
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
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [readStatePara1, setReadStatePara1] = useState(false);
  const [readStatePara2, setReadStatePara2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    status: 'Completed',
    lang: 'EN',
    phone: checkerMobileNumber,
    page: 'Get Quote',
    last_question: '3',
  };
  const res = await usersUpdate(data, intentID);
  console.log('this is update results ====>', res);
    dispatch(addHistory(true));

    const sub_data = {
      dealer_id: dealerId,
      first_name: checkerFirstName,
      last_name: checkerLastName,
      email: checkerEmail,
      mobile_phone: checkerMobileNumber,
      status: quoteStatus,
      source: quoteSource,
      interested_in: quoteInterest,
      deal_type: dealType,
    };

    const sub_res = await SubmitQuote(sub_data);
    if (sub_res.status == 201) {
      console.log('status ImageSend', sub_res);
    } else {
      console.log('Faild ImageSend');
    }
  };

  return (
    <div className="flex bg-gray-100 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20">
        <p className="w-2/3 text-4xl text-black my-3 font-medium">
          Please confirm bellow contents
        </p>
        <form
          className={classNames(
            'text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
          )}
        >
          <p className="bg-gray-100 rounded-3xl p-4 mt-2">
            We are committed to protecting your privacy. The information that
            you provided is only shared with the dealership to assess your
            credit history and not otherwise sold, marketed, or distributed in
            any way by {dealerName}.
          </p>
          <div className="bg-gray-100 rounded-3xl p-4 mt-2">
            <p
              onClick={() => setReadStatePara1(!readStatePara1)}
              className={
                readStatePara1 == false
                  ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                  : null
              }
            >
              Please click{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              to read our Privacy Notice and click{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              to read our full Privacy Policy. If you would like to opt-out of
              having your information shared at all, please do so now by
              clicking{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>{' '}
              and exiting the application.
            </p>
            <span
              onClick={() => setReadStatePara1(!readStatePara1)}
              className={'text-blue-600 text-sm hover:underline cursor-pointer'}
            >
              {readStatePara1 == false ? 'More' : 'Less'}
            </span>
          </div>
          <div className="bg-gray-100 rounded-3xl p-4 mt-2">
            <p
              className={
                readStatePara2 == false
                  ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                  : null
              }
            >
              By typing my name and clicking submit, I authorize {dealerName} to
              investigate my credit history solely to determine the best
              available offers to fund my loan, I also acknowledge that I have
              read, understand, and agree to be bound by our End User{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of use
              </a>{' '}
              and our{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>{' '}
              and agree to have the information that I provided shared with
              lenders in accordance therewith. I also understand that if a
              prequalified offer is found by any of our lenders, they will
              perform a hard inquiry which can impact my credit history.
            </p>
            <span
              onClick={() => setReadStatePara2(!readStatePara2)}
              className={'text-blue-600 text-sm hover:underline cursor-pointer'}
            >
              {readStatePara2 == false ? 'More' : 'Less'}
            </span>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-1/4 h-20 p-2 rounded-lg text-white text-xl  hover:bg-purple-800"
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
