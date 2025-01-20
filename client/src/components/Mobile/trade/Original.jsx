import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { addHistory, setOriginalOwner } from '../../../store/reducers/checker';

const DealType = () => {
  const {
    step,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [owner, setOwner] = useState('');

  useEffect(() => {
    setError(null);
    setOwner('');
  }, [step]);

  const handleSubmit = async () => {
    if (owner) {
      dispatch(addHistory(true));
      dispatch(setOriginalOwner(owner));
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
          step >= 12 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div className="flex flex-col md:justify-between bg-gray-50 rounded-3xl p-4">
          <div className="flex flex-col md:flex-row ">
            <label
              htmlFor="radio1"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setOwner('Yes');
              }}
            >
              {step != 11 ? (
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
                  checked={owner === 'Yes'}
                />
              )}
              Yes
            </label>
            <label
              htmlFor="radio2"
              className="text-lg md:text-2xl m-2 p-2 cursor-pointer"
              onClick={() => {
                setOwner('No');
              }}
            >
              {step != 11 ? (
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
                  checked={owner === 'No'}
                />
              )}
              No
            </label>
          </div>

          <p className=" px-6">
            <b> Are you original owner?</b>
          </p>
          {error !== '' ? (
            <p className="text-red-500 pl-2 pt-2">{error}</p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 12 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  return <>{step > 10 ? renderDescription() : null}</>;
};

export default DealType;
