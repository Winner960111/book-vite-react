import { useDispatch, useSelector } from 'react-redux';
import { addHistory } from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import BotIcon from './BotIcon';

const Greeting = () => {
  const { dealerName, step } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const renderDescription = () => (
    <div
      className={classNames(
        'mt-2',
        step >= 1 ? 'text-slate-400' : 'text-slate-800'
      )}
    >
      <p className="bg-gray-50 rounded-3xl p-4 mt-2">
        Thank you for choosing {dealerName}. We look forward to serving you and
        making your experience extraordinary.
      </p>
    </div>
  );

  const renderConfirmButton = () => (
    <button
      className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-lg mt-2 py-4"
      onClick={handleConfirmClick}
    >
      GET STARTED NOW
    </button>
  );

  const handleConfirmClick = () => {
    dispatch(addHistory(true));
  };

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        GET STARTED NOW
      </div>
    </div>
  );

  return (
    <div className="text-justify flex flex-col text-sm md:text-lg">
      <BotIcon />
      <div className="bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)]">
        {renderDescription()}
        {step == 0 ? renderConfirmButton() : null}
      </div>
      {step > 0 ? renderReply() : null}
    </div>
  );
};

export default Greeting;
