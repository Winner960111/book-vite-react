import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import {
  addHistory,
setCommentValue,
} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { usersUpdate } from '../../../api/index';

const Inputcomment = () => {
  const dispatch = useDispatch();
  const { step, history, commentValue, intentID,
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
    checkerMobileNumber, } = useSelector(
      (state) => state.checker
    );

  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setComment('')
  }, [step]);

  const handleChangeInput = (e) => {
    setComment(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('*Required');
    }else {
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
        page: 'Trade In',
        last_question: '10',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setCommentValue(comment));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 13 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 13 ? { display: 'none' } : { display: 'block' }}
        >
          <textarea
            className="w-full h-20 border-2 rounded-md text-xl my-5 md:my-5 p-5 placeholder-blue-200 text-blue-600"
            id="autocomplete"
            placeholder="comment"
            type="text"
            value={comment}
            onChange={handleChangeInput}
          />
          {error !== '' ? (
            <p className="text-red-500 pl-6 p-2 -mt-5">{error}</p>
          ) : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4">
          Please input the comments
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 13 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {commentValue}
      </div>
    </div>
  );

  return (
    <>
      {step > 11 ? (
        <>
          {history[12] == true ? (
            <>
              {renderDescription()}
              {renderReply()}
            </>
          ) : (
            renderDescription()
          )}
        </>
      ) : null}
    </>
  );
};
export default Inputcomment;
