import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import {
  addHistory,
  setVehicleCondition,
} from '../../../store/reducers/checker';

const DealType = () => {
  const {
    step,
    
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [dealClick, setDealClick] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setDealClick('');
  }, [step]);

  const handleSubmit = async () => {
    if (dealClick) {
      dispatch(addHistory(true));
      dispatch(setVehicleCondition(dealClick));
    } else {
      setError('You must select one of above methodes.');
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
        <div className="flex flex-col md:justify-between bg-gray-50 rounded-3xl p-4">
          <div className="flex flex-col md:flex-row ">
            <label
              htmlFor="radio1"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setDealClick('Excellent');
              }}
            >
              {step != 8 ? (
                <input
                  type="radio"
                  id="radio1"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio1"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
              )}
              Excellent
            </label>
            <label
              htmlFor="radio2"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setDealClick('Good');
              }}
            >
              {step != 8 ? (
                <input
                  type="radio"
                  id="radio2"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio2"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
              )}
              Good
            </label>
            <label
              htmlFor="radio3"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setDealClick('Fair');
              }}
            >
              {step != 8 ? (
                <input
                  type="radio"
                  id="radio3"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio3"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
              )}
              Fair
            </label>
          </div>

          <p className=" px-6">
            <b>Please select vehicle condition</b>
          </p>
          {error !== '' ? (
            <p className="text-red-500 pl-2 pt-2">{error}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 9 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 7 ? renderDescription() : null}</>;
};

export default DealType;
