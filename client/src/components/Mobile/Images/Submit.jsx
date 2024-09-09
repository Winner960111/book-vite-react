import { useState } from 'react';
import BotIcon from './BotIcon';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { submitImages } from '../../../api/index';
import { useParams } from 'react-router-dom';

const Submit = () => {

  const [readStatePara1, setReadStatePara1] = useState(false);
  const {trade_id} = useParams();
  const dispatch = useDispatch();
  const {
    step,
    history,
    imageBase64,
    dealerId,
    customerId,
    dealerName,
  } = useSelector((state) => state.checker);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let number=0;
    for (let i = 0; i < imageBase64.length; i++){
      const data = {
        dealer_id: dealerId,
        trade_in_id: trade_id,
        customer_id: customerId,
        path: imageBase64[i].base64,
      };
     const res = await submitImages(data);
     if (res.status == 201) {
       console.log('status ImageSend', res);
       number += 1
 
     } else {
       console.log('Faild ImageSend');
     }
    }
    console.log("this is number ===>", number)
    if (number == imageBase64.length) {
       dispatch(addHistory(true));
}
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 5 ? 'text-slate-400' : 'text-slate-800'
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
            {step == 4 ? (
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
            {step == 4 ? (
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
            {step == 4 ? (
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
              step == 5
                ? 'text-blue-600 text-sm hover:underline cursor-pointer'
                : null
            }
          >
            {readStatePara1 == false ? 'More' : 'Less'}
          </span>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          Submit
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#854fff] rounded-tl-xl rounded-b-xl text-white">
        <p>
          Our team is already working diligently to review your information and
          will get back to you promptly with the next steps.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {step > 3 ? (
        <>
          {renderDescription()}
          {history[5] == true ? renderReply() : null}
        </>
      ) : null}
    </>
  );
};
export default Submit;
