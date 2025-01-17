import { useState } from 'react';
import BotIcon from './BotIcon';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { referenceInfo } from '../../../api/index';

const Submit = () => {
  const [readStatePara1, setReadStatePara1] = useState(false);
  const dispatch = useDispatch();
  const {
    step,
    history,
    refFirstName,
    refLastName,
    refRelation,
    refCity,
    refState,
    refPhoneNumber,
    refFirstName1,
    refLastName1,
    refRelation1,
    refCity1,
    refState1,
    refPhoneNumber1,
    dealerId,
    customerId,
    dealerName,
  } = useSelector((state) => state.checker);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      dealer_id: dealerId,
      reference1_first_name: refFirstName,
      reference1_last_name: refLastName,
      reference1_phone: refPhoneNumber,
      reference1_city: refCity,
      reference1_relationship: refRelation,
      reference1_state: refState,
      reference2_first_name: refFirstName1,
      reference2_last_name: refLastName1,
      reference2_phone: refPhoneNumber1,
      reference2_city: refCity1,
      reference2_relationship: refRelation1,
      reference2_state: refState1,

    };
    console.log("this is res==>", customerId)

    const res = await referenceInfo(data, customerId)
    if (res.status == 200) {
      dispatch(addHistory(true));
    } else {
      console.log("Failed")
    }
  }
  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 16 ? 'text-slate-400' : 'text-slate-800'
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
            {step == 15 ? (
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
            {step == 15 ? (
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
            {step == 15 ? (
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
              step == 15
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
          style={step >= 16 ? { display: 'none' } : { display: 'block' }}
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
      {step > 14 ? (
        <>
          {renderDescription()}
          {history[15] == true ? renderReply() : null}
        </>
      ) : null}
    </>
  );
};
export default Submit;
