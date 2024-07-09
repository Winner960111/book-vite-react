import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import {
  addHistory,
  setImageBase64,
} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';

const InputCity = () => {

  const dispatch = useDispatch();
  const { step, history, refCity } = useSelector(
    (state) => state.checker
  );

  const [City, setCity] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    setCity('');
  }, [step]);

  const handleChangeInput = (e) => {
    const selectedFiles = e.target.files;
    const newFiles = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];
      const reader = new FileReader();

      reader.onload = (e) => {
        newFiles.push({
          name: file.name,
          type: file.type,
          base64: e.target.result,
        });
        setCity(newFiles);
      };

      reader.readAsDataURL(file);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!City) {
      setError('The upload field is required');
    } else {
      dispatch(setImageBase64(City));
      dispatch(addHistory(true));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 4 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          <div className="flex flex-row w-full">
            <input
              accept=".pdf,.png,.jpeg"
              onChange={handleChangeInput}
              type="file"
              multiple
              hidden
              id="upload"
            />
            <label
              htmlFor="upload"
              className="bg-[#854fff] w-full md:w-[30%] md:mx-4 rounded-lg text-white text-xl text-center hover:bg-purple-800 p-3 mt-4"
            >
              Upload
            </label>
            <div className="bg-gray-100 w-full md:w-[70%] rounded-lg text-black text-xl p-3 mt-4 overflow-hidden">
              {City[0]?.base64}
            </div>
          </div>
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">Please Upload file.</p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-lg text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 4 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <p className="w-[150px] p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white line-clamp-2">
        {refCity}
      </p>
    </div>
  );

  return (
    <>
      {step > 2 ? (
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
export default InputCity;
