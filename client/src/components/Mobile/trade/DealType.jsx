import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { addHistory, setDealType } from '../../../store/reducers/checker';

const DealType = () => {
  const {
    step,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [dealClick, setDealClick] = useState('Finance');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleSubmit = async () => {
    if (dealClick) {
      dispatch(addHistory(true));
      dispatch(setDealType(dealClick));
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
          step >= 11 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="flex flex-col md:justify-between bg-gray-50 rounded-3xl p-4">
          <div className="flex flex-col md:flex-row ">
            <label
              htmlFor="radio1"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setDealClick('Finance');
              }}
            >
              {step != 10 ? (
                <input
                  type="radio"
                  id="radio1"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio1"
                  className="w-[17px] h-[17px] mx-2"
                  checked={dealClick == 'Finance' ? true : false}
                />
              )}
              Finance
            </label>
            <label
              htmlFor="radio2"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setDealClick('Cash');
              }}
            >
              {step != 10 ? (
                <input
                  type="radio"
                  id="radio2"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio2"
                  className="w-[17px] h-[17px] mx-2"
                  checked={dealClick == 'Cash' ? true : false}
                />
              )}
              Cash
            </label>
            <label
              htmlFor="radio3"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setDealClick('Lease');
              }}
            >
              {step != 10 ? (
                <input
                  type="radio"
                  id="radio3"
                  className="w-[17px] h-[17px] mx-2"
                  disabled
                />
              ) : (
                <input
                  type="radio"
                  id="radio3"
                  className="w-[17px] h-[17px] mx-2"
                  checked={dealClick == 'Lease' ? true : false}
                />
              )}
              Lease
            </label>
          </div>

          <p className=" px-6">
            <b>Please select deal type.</b>
          </p>
          {error !== '' ? (
            <p className="text-red-500 pl-2 pt-2">{error}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 11 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 9 ? renderDescription() : null}</>;
};

export default DealType;
