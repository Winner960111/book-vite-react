import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { addHistory, setConfirm } from '../../../store/reducers/checker';
import { classNames } from '../../../utils';

const Confirm = () => {
  const { step, confirm, history } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const handleYes = () => {
    dispatch(addHistory(true));
    dispatch(setConfirm('Yes'));
  };
  const handleNo = () => {
    dispatch(addHistory(true));
    dispatch(setConfirm('No'));
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 27 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Do you have any additional income?
        </p>
        <div
          className="flex p-2"
          style={step >= 27 ? { display: 'none' } : { display: 'block' }}
        >
          <button
            type="button"
            onClick={handleYes}
            className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          >
            YES
          </button>
          <button
            type="button"
            onClick={handleNo}
            className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          >
            NO
          </button>
        </div>
      </form>
    </>
  );
  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        {confirm}
      </div>
    </div>
  );
  return (
    <>
      {step > 25 ? (
        <>
          {history[26] == true ? (
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
export default Confirm;
