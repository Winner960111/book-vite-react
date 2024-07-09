import { useState } from 'react';
import { addHistory, setImageBase64} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';

const FirstPage = () => {
  const {
    customerName,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [city, setCity] = useState([])
  const [errorCity, setErrorCity] = useState('')
  
  const handleCity = (e) => {
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
    setErrorCity('');
  };

  const handlesubmit = async () => {
    let pass = 0;

    if (!city) {
      setErrorCity('*Required');
    } else {
      pass += 1;
    }

    if (pass == 1) {
      dispatch(setImageBase64(city));
      dispatch(addHistory(true));
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-28 mx-20">
          <p className="w-full text-3xl my-3 font-medium">
            Hi <b>{customerName}</b>, please upload the images for you Trade In.
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-full my-3">
                <div className="flex flex-row w-full">
                  <input
                    accept=".jpg,.png,.jpeg"
                    onChange={handleCity}
                    type="file"
                    multiple
                    hidden
                    id="upload"
                  />
                  <label
                    htmlFor="upload"
                    className="bg-[#854fff] cursor-pointer w-full md:w-[30%] md:mx-4 rounded-lg text-white text-xl text-center hover:bg-purple-800 p-3 mt-4"
                  >
                    Upload
                  </label>
                  <div className="bg-gray-100 w-full md:w-[70%] rounded-lg text-black text-xl p-3 mt-4 mx-4 overflow-hidden">
                    {city[0]?.base64}
                  </div>
                </div>
                {errorCity !== '' && (
                  <p className="text-red-500 pl-2">{errorCity}</p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-full md:w-[30%] h-16 md:mx-4 rounded-lg text-white text-xl  hover:bg-purple-800"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstPage;
