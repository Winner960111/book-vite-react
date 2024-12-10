import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory, clearHistory } from '../../../store/reducers/checker';
import { SubmitQuote } from '../../../api/index';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const ThirdPage = () => {
  const {
    dealerName,
    dealerId,
    checkerMobileNumber,
    checkerFirstName,
    quoteStatus,
    checkerLastName,
    checkerEmail,
    // quoteSource,
    dealType,
    quoteInterest,
    // intentID,
    // deviceIP,
    // deviceOS,
    // deviceCity,
    // deviceCountry,
    // deviceState,
    // deviceDate,
    // deviceLat,
    // deviceLon,
    // deviceBrowser,
    // type,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [checked1, setChecked1] = useState(false);
  const handleClick_Check1 = () => setChecked1(!checked1);
  const [checked2, setChecked2] = useState(false);
  const handleClick_Check2 = () => setChecked2(!checked2);
  const [checked3, setChecked3] = useState(false);
  const handleClick_Check3 = () => setChecked3(!checked3);
  const [readStatePara1, setReadStatePara1] = useState(false);
  const [readStatePara2, setReadStatePara2] = useState(false);
  const [checkbox, setCheckbox] = useState(false);

  useEffect(()=>{
    if (checked1 && checked2 && checked3){
      setCheckbox(false)
    } else {
      setCheckbox(true)
    }
}, [checked1, checked2, checked3])

  const Tobegin = () => {
    console.log("I'm here");
    navigate(-1);
    dispatch(clearHistory());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checked1 && checked2 && checked3) {
      // const data = {
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
      //   page: 'Get Quote',
      //   last_question: '3',
      // };
      // const res = await usersUpdate(data, intentID);
      // console.log('this is update results ====>', res);
      const sub_data = {
        dealer_id: dealerId,
        first_name: checkerFirstName,
        last_name: checkerLastName,
        email: checkerEmail,
        mobile_phone: checkerMobileNumber,
        status: quoteStatus,
        interested_in: quoteInterest,
        deal_type: dealType,
        lead_status: "New",
        source: "Get Quote",
        request_type: "Sales",
        deal_status: "New",
        is_active_shopper: false,
        performed_by: "Customer",
        agent_id: ""
      };

      console.log("quote------>", sub_data)
      const sub_res = await SubmitQuote(sub_data);
      if (sub_res.status == 201) {
      dispatch(addHistory(true));
        console.log('status ImageSend', sub_res);
      } else {
        console.log('Faild ImageSend');
      }
    }
  };

    return (
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className="w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-full text-4xl text-black my-3 font-medium">
            Please take a moment to review the information below.
          </p>
          <form
            className={classNames(
              'text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
            )}
          >
            <p className="mt-1 bg-gray-200 rounded-lg p-2">
              <input
                // onClick={handleClick_Check1}
                onChange={handleClick_Check1}
                checked={checked1}
                type="checkbox"
                className="cursor-pointer"
              />{' '}
              I understand that I am providing written instructions to{' '}
              <b>{dealerName}</b> under the Fair Credit Reporting Act. This
              authorization allows <b>{dealerName}</b> to access my personal
              credit profile and any additional documentation I provide. I
              authorize <b>{dealerName}</b> to use this information solely for
              the purpose of prequalifying my request for financing with any of{' '}
              <b>{dealerName}</b>&apos;s available lenders.
            </p>
            <div className="mt-2 bg-gray-200 rounded-lg p-2">
              <p>
                <input
                  // onClick={handleClick_Check2}
                  onChange={handleClick_Check2}
                  checked={checked2}
                  type="checkbox"
                  className="cursor-pointer"
                />
                Please note, this is not an automated system. One of our
                representatives will personally review your information to
                ensure the best results. Due to this carefull review, there may
                be a delay in providing you with pre-qualification offers.
                However, we will contact you by the next business day.
              </p>
            </div>
            <div className="rounded-3xl p-4 mt-2">
              <p
                onClick={() => setReadStatePara1(!readStatePara1)}
                className={
                  readStatePara1 == false
                    ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                    : null
                }
              >
                Please read our{' '}
                <a
                  href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
                  style={{ color: 'blue' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Private Notice
                </a>{' '}
                ,{' '}
                <a
                  href="https://www.credit-apps.com/privacy/"
                  style={{ color: 'blue' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Private Policy
                </a>{' '}
                , and{' '}
                <a
                  href="https://www.credit-apps.com/terms/"
                  style={{ color: 'blue' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  End User Terms of Use
                </a>{' '}
                by clicking the links provided. If you would like to opt-out of
                having your information shared at all, please do so now by
                clicking
                <span
                  onClick={Tobegin}
                  className="cursor-pointer text-blue-600"
                >
                  here
                </span>{' '}
                and exiting the application.
              </p>
              <span
                onClick={() => setReadStatePara1(!readStatePara1)}
                className={
                  'text-blue-600 text-sm hover:underline cursor-pointer'
                }
              >
                {readStatePara1 == false ? 'More' : 'Less'}
              </span>
            </div>
            <div className="bg-gray-200 rounded-lg p-2 mt-2">
              <p
                className={
                  readStatePara2 == false
                    ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                    : null
                }
              >
                <input
                  // onClick={handleClick_Check3}
                  checked={checked3}
                  onChange={handleClick_Check3}
                  type="checkbox"
                  className="cursor-pointer"
                />{' '}
                I acknowledge that I have read, understand, and agree to be
                bound by the{' '}
                <a
                  href="https://www.credit-apps.com/terms/"
                  style={{ color: 'blue' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  End User Terms of Use
                </a>{' '}
                and{' '}
                <a
                  href="https://www.credit-apps.com/privacy/"
                  style={{ color: 'blue' }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {' '}
                  Privacy Policy
                </a>{' '}
                . I consent to having the information I provided to {
                  dealerName
                }{' '}
                shared with lenders accordingly. Additionally, I understand that
                if I receive a prequalified offer from any of {dealerName}
                &apos;s lenders, they will perform a hard inquiry, which may
                impact my credit history.
              </p>
              <span
                onClick={() => setReadStatePara2(!readStatePara2)}
                className={
                  'text-blue-600 text-sm hover:underline cursor-pointer'
                }
              >
                {readStatePara2 == false ? 'More' : 'Less'}
              </span>
            </div>
          <p className={checkbox?'text-red-600':'hidden'}>*Please check the contents and tick the box</p>
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
