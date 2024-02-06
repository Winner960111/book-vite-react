import { addHistory } from '../store/reducers/checker';
import { useDispatch } from 'react-redux';

const FirstPage = () => {
  const dispatch = useDispatch();
  const handlesubmit = () => {
    dispatch(addHistory(true))
  };
  return (
    <>
      <div className="flex bg-gray-100 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20">
          <div className="w-full">
            <p className="text-6xl text-black my-3">Let's get Started</p>
            <p className="text-xl text-black my-2">
              For rate and other cost information see the Terms of conditions.
              To print of save these documents, click the Terms and Conditions
              Link at the bottom of the page.
            </p>
          </div>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="w-full p-5 flex justify-between">
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                autoFocus
                placeholder="First Name"
                type="text"
              />
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Middle Initial(optional)"
                type="text"
              />
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Last Name"
                type="text"
              />
            </div>
            <div className="w-full flex p-5 justify-between">
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Email Address"
                type="text"
              />
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Phone Number"
                type="text"
              />
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-1/4 h-20 p-2 mx-5 rounded-lg text-white text-xl  hover:bg-purple-800"
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
