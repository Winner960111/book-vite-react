import { addHistory} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '../../../assets/arrow.png'
import confirm from '../../../assets/confirm.svg';
import fail from '../../../assets/fail.svg';

const FirstPage = () => {
  const {
    step,
    customerName,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const handlesubmit = async () => {
  
      dispatch(addHistory(true));
    }

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-28 mx-20 justify-center items-center">
          <p className="w-[50%] text-3xl my-3 font-medium">
            Lightning verification
          </p>
          <div className="w-[50%] text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col">
              <div className="flex w-full justify-between mt-2">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <div className="flex flex-col mx-3">
                    <label htmlFor="btn1" className="text-2xl">
                      Full name
                    </label>
                    <p className="text-3xl font-bold" id="btn1">
                      Alexis Tomayo
                    </p>
                  </div>
                </div>
                <div>
                  {/* <img src={confirm} alt="ico" className="w-[45px] mt-5 mx-3" /> */}
                  <img src={fail} alt="ico" className="w-[60px] mt-5 mx-1" />
                </div>
              </div>
              <div className="flex w-full justify-between mt-2">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <div className="flex flex-col mx-3">
                    <label htmlFor="btn2" className="text-2xl">
                      Phone number
                    </label>
                    <p className="text-3xl font-bold" id="btn2">
                      +1 305 781 3277
                    </p>
                  </div>
                </div>
                <div>
                  <img src={confirm} alt="ico" className="w-[45px] mt-5 mx-3" />
                  {/* <img src={fail} alt="ico" className="w-[60px] mt-5 mx-1" /> */}
                </div>
              </div>
              <div className="flex w-full justify-between mt-2">
                <div className="flex w-[80%]">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <div className="flex flex-col mx-3 w-full">
                    <label htmlFor="btn3" className="text-2xl">
                      Address
                    </label>
                    <p className="text-3xl font-bold line-clamp-1" id="btn3">
                      123 main st san francisco florida state
                    </p>
                  </div>
                </div>
                <div>
                  {/* <img src={confirm} alt="ico" className="w-[45px] mt-5 mx-3" /> */}
                  <img src={fail} alt="ico" className="w-[60px] mt-5 mx-1" />
                </div>
              </div>
              <div className="flex w-full justify-between mt-2">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <div className="flex flex-col mx-3">
                    <label htmlFor="btn4" className="text-2xl">
                      DOB
                    </label>
                    <p className="text-3xl font-bold" id="btn4">
                      1976-01-05
                    </p>
                  </div>
                </div>
                <div>
                  <img src={confirm} alt="ico" className="w-[45px] mt-5 mx-3" />
                  {/* <img src={fail} alt="ico" className="w-[60px] mt-5 mx-1" /> */}
                </div>
              </div>
              <div className="flex w-full justify-between mt-2">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <div className="flex flex-col mx-3">
                    <label htmlFor="btn5" className="text-2xl">
                      Last 4 of SSN
                    </label>
                    <p className="text-3xl font-bold" id="btn5">
                      4444
                    </p>
                  </div>
                </div>
                <div>
                  <img src={confirm} alt="ico" className="w-[45px] mt-5 mx-3" />
                  {/* <img src={fail} alt="ico" className="w-[60px] mt-5 mx-1" /> */}
                </div>
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
