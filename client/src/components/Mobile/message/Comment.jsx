import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import { addHistory, setCommentValue, removeHistory, } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { MdModeEditOutline } from "react-icons/md";

const Inputcomment = () => {
  const dispatch = useDispatch();
  const {
    step,
    history,
    commentValue,
  } = useSelector((state) => state.checker);

  const [comment, setComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setComment('');
  }, [step]);

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handleChangeInput = (e) => {
    setComment(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      setError('*Required');
    } else {
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
          step >= 8 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
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
        <p className="bg-gray-50 rounded-3xl p-4">Please input the comments</p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 8 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        {commentValue}
<MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );

  return (
    <>
      {step > 6 ? (
        <>
          {history[7] == true ? (
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
