import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setDealType,
  setQuoteInterest,
  setOriginalOwner,
} from '../../../store/reducers/checker';

const DealType = () => {
  const { step } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [dealClick, setDealClick] = useState('');
  const [error, setError] = useState(null);
  const [ownerError, setOwnerError] = useState(null);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [owner, setOwner] = useState('');

  useEffect(() => {
    setError(null);
    setDealClick('');
    setOwner('');
  }, [step]);

  const handleSubmit = async () => {
    if (!dealClick) {
      setError('Above is required');
    } else if (!owner) {
      setOwnerError('Above is required');
    } else {
      let interest = year + ' ' + make + ' ' + ' ' + model;
      setYear('');
      setMake('');
      setModel('');
      dispatch(addHistory(true));
      dispatch(setDealType(dealClick));
      dispatch(setQuoteInterest(interest));
      dispatch(setOriginalOwner(owner));
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 w-full justify-center items-center">
      <p className="w-2/3 text-4xl text-black mt-44 font-medium">
        Please select correct answer
      </p>
      <div className="w-2/3 flex flex-col md:flex-row text-justify bg-white rounded-3xl p-4 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="w-full md:w-[60%] flex flex-col justify-between">
          <div className="flex flex-col justify-between bg-gray-100 rounded-3xl p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <label
                htmlFor="radio1"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Finance');
                }}
              >
                <input
                  type="radio"
                  id="radio1"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Finance
              </label>
              <label
                htmlFor="radio2"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Cash');
                }}
              >
                <input
                  type="radio"
                  id="radio2"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Cash
              </label>
              <label
                htmlFor="radio3"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setDealClick('Lease');
                }}
              >
                <input
                  type="radio"
                  id="radio3"
                  name="deal_type"
                  className="w-[17px] h-[17px] mx-2"
                />
                Lease
              </label>
            </div>

            <p className=" px-6">
              <b>Please select deal type.</b>
            </p>
            {error !== '' ? (
              <p className="text-red-500 pl-6 pt-2">{error}</p>
            ) : null}
          </div>
        </div>
        <div className="flex w-full md:w-[40%] flex-col md:mx-10">
          <div className="flex flex-col justify-between bg-gray-100 rounded-3xl p-4">
            <div className="flex flex-col md:flex-row justify-between">
              <label
                htmlFor="radio4"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setOwner('Yes');
                }}
              >
                <input
                  type="radio"
                  id="radio4"
                  name="owner"
                  className="w-[17px] h-[17px] mx-2"
                />
                Yes
              </label>
              <label
                htmlFor="radio5"
                className="text-2xl m-2 p-2 cursor-pointer"
                onClick={() => {
                  setOwner('No');
                }}
              >
                <input
                  type="radio"
                  id="radio5"
                  name="owner"
                  className="w-[17px] h-[17px] mx-2"
                />
                No
              </label>
            </div>
            <p className=" px-6">
              <b>Are you original owner?</b>
            </p>
            {ownerError !== '' ? (
              <p className="text-red-500 pl-6 pt-2">{ownerError}</p>
            ) : null}
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          >
            CONTINUE
          </button>
        </div>
      </div>
    </div>
  );
};

export default DealType;
