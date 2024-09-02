import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import arrow from '../../../assets/arrow.png';
import confirm from '../../../assets/confirm.svg';
import fail from '../../../assets/fail.svg';
import { useEffect, useState } from 'react';
import { identifyInfo } from '../../../api/index';

const FirstPage = () => {
  const { identifyId } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  useEffect(() => {
    ('useEffect===>');
    identifyInfo(identifyId).then((res) => {
      setData(res);
    });
  }, []);

  const handlesubmit = async () => {
    dispatch(addHistory(true));
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20 justify-center items-center">
          <p className="w-[50%] text-3xl my-3 font-medium">
            Lightning verification
          </p>
          <div className="w-[50%] text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col">
              <div className="flex w-full justify-between items-center mt-5">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <label htmlFor="btn1" className="text-3xl">
                    Full name
                  </label>
                </div>
                <div>
                  {data.equals_names == true ? (
                    <img src={confirm} alt="ico" className="w-[45px] mx-3" />
                  ) : (
                    <img src={fail} alt="ico" className="w-[60px] mx-1" />
                  )}
                </div>
              </div>
              <div className="flex w-full justify-between items-center mt-5">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <label htmlFor="btn2" className="text-3xl">
                    Phone number
                  </label>
                </div>
                <div>
                  {data.equals_phone == true ? (
                    <img src={confirm} alt="ico" className="w-[45px] mx-3" />
                  ) : (
                    <img src={fail} alt="ico" className="w-[60px] mx-1" />
                  )}
                </div>
              </div>
              <div className="flex w-full justify-between items-center mt-5">
                <div className="flex w-[80%]">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <label htmlFor="btn3" className="text-3xl">
                    Address
                  </label>
                </div>
                <div>
                  {data.equals_addresses == true ? (
                    <img src={confirm} alt="ico" className="w-[45px] mx-3" />
                  ) : (
                    <img src={fail} alt="ico" className="w-[60px] mx-1" />
                  )}
                </div>
              </div>
              <div className="flex w-full justify-between items-center mt-5">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <label htmlFor="btn4" className="text-3xl">
                    DOB
                  </label>
                </div>
                <div>
                  {data.equals_dob == true ? (
                    <img src={confirm} alt="ico" className="w-[45px] mx-3" />
                  ) : (
                    <img src={fail} alt="ico" className="w-[60px] mx-1" />
                  )}
                </div>
              </div>
              <div className="flex w-full justify-between items-center mt-5">
                <div className="flex">
                  <img src={arrow} alt="arrow" className="w-[30px] h-[30px]" />
                  <label htmlFor="btn5" className="text-3xl">
                    Last 4 of SSN
                  </label>
                </div>
                <div>
                  {data.equals_ssn == true ? (
                    <img src={confirm} alt="ico" className="w-[45px] mx-3" />
                  ) : (
                    <img src={fail} alt="ico" className="w-[60px] mx-1" />
                  )}
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
