import { useDispatch, useSelector } from 'react-redux';
import { addHistory } from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import BotIcon from './BotIcon';

const Greeting = () => {
  const { customerName, step, } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const renderDescription = () => (
    <div
      className={classNames(
        'mt-2',
        step >= 1 ? 'text-slate-400' : 'text-slate-800'
      )}
    >
      Hi, <b>{customerName}</b> thanks for coming back, please complete the
      following information.
    </div>
  );

  const renderConfirmButton = () => (
    <button
      className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
      onClick={handleConfirmClick}
    >
      GET STARTED NOW
    </button>
  );

  const handleConfirmClick = async () => {
    dispatch(addHistory(true));
  };

  const renderReply = () => (
    <div className="mt-4 flex justify-end">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
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
