import { useNavigate } from 'react-router-dom';
import { clearHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';

const Finish = () => {

  const {appStatus, appDescription} = useSelector((state)=>state.checker)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(-1);
    dispatch(clearHistory());
  };

  return (
    <div className="w-full flex flex-col items-center">
      <p className="w-2/6 text-4xl text-black my-3 mt-36 font-medium">
        <b>Congratulation!</b>
      </p>
      <form
        onSubmit={handleSubmit}
        className={
          ' w-2/6 text-justify bg-white rounded-3xl p-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
        }
      >
        <p className=" bg-gray-50 rounded-3xl p-4">
          <b className='text-3xl'>{appStatus}</b><br/>
          {appDescription}
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-lg my-4 hover:bg-purple-800"
        >
          FINISH
        </button>
      </form>
    </div>
  );
};
export default Finish;
