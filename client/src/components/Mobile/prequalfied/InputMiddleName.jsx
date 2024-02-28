import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setCheckerMiddleName,
  setCheckerIsSkipMiddleName,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { usersUpdate } from '../../../api/index';

const InputMiddleName = () => {
  const { step, history, checkerMiddleName, checkerIsSkipMiddleName, intentID,
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
    checkerMobileNumber, } =
    useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [middleName, setMiddleName] = useState('');
  const [error, setError] = useState(null);

  const handleChangeInput = (e) => {
    setMiddleName(e.target.value);
    setError(null);
  };

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!middleName.trim()) {
      setError('The middle name filed is required');
    } else if (!/^[A-Za-z]+$/.test(middleName)) {
      setError('The middle name contains only characters');
    } else {
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
        page: 'Short',
        last_question: '2',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setCheckerMiddleName(middleName));
      setMiddleName('');
    }
  };

  const skipMiddleName = () => {
    dispatch(setCheckerIsSkipMiddleName(true));
    dispatch(addHistory(true));
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 5 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          <input
            type="text"
            className="w-full h-16 rounded-md text-center text-sm md:text-lg border p-2 my-2"
            autoFocus
            placeholder="middle name"
            value={middleName}
            onChange={handleChangeInput}
          />
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-100 rounded-3xl p-4">
          In the case you have a middle name on your credit report please enter
          here.
        </p>
        <button
          onClick={skipMiddleName}
          type="button"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          SKIP
        </button>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        {checkerMiddleName}
      </div>
    </div>
  );

  return (
    <>
      {step > 3 && checkerIsSkipMiddleName == false ? (
        <>
          {history[4] == true ? (
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
export default InputMiddleName;
