import BotIcon from './BotIcon';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { useNavigate } from 'react-router-dom';

const Submit = () => {

  const dispatch = useDispatch();
  const {
    step,
    history,
    appStatus,
    appDescription
  } = useSelector((state) => state.checker);

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(addHistory(true))
    navigate(-1)
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 6 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className=" bg-gray-50 rounded-3xl p-4">
          <b className="text-3xl">{appStatus}</b>
          <br />
          {appDescription}
        </p>
        <button
          onClick={handleSubmit}
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 6 ? { display: 'none' } : { display: 'block' }}
        >
          Finish
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
      {step > 4 ? (
        <>
          {renderDescription()}
          {history[5] == true ? renderReply() : null}
        </>
      ) : null}
    </>
  );
};
export default Submit;
