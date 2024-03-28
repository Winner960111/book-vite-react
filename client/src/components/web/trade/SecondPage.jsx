import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setDealType,
  setQuoteInterest,
  setOriginalOwner,
  setCommentValue,
} from '../../../store/reducers/checker';
import { usersUpdate } from '../../../api/index';

const DealType = () => {
  const {
    step,
    intentID,
    dealerId,
    deviceIP,
    deviceOS,
    deviceCity,
    deviceCountry,
    deviceState,
    deviceDate,
    deviceLat,
    deviceLon,
    deviceBrowser,
    checkerMobileNumber,
    type,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [dealClick, setDealClick] = useState('');
  const [error, setError] = useState(null);
  const [ownerError, setOwnerError] = useState(null);
  const [commentError, setCommentError] = useState(null);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [owner, setOwner] = useState('');
  const [comment, setComment] = useState('');
  const [focus, setFocus] = useState(Boolean)
  useEffect(() => {
    setError(null);
    setDealClick('');
    setOwner('');
    setOwnerError('');
    setCommentError('');
  }, [step]);

  const handleSubmit = async () => {
    if (!dealClick) {
      setError('Above is required');
    } else if (!owner) {
      setOwnerError('Above is required');
    } else if (comment.length > 200) {
      setCommentError('Comment should be less than 200 characters');
    } else {
      let interest = year + ' ' + make + ' ' + ' ' + model;
      setYear('');
      setMake('');
      setModel('');
      const data = {
        dealer_id: dealerId,
        device_ip_address: deviceIP,
        device_operating_system: deviceOS,
        device_browser: deviceBrowser,
        device_type: type,
        device_state: deviceState,
        device_city: deviceCity,
        device_country: deviceCountry,
        device_date_time: deviceDate,
        device_lat: deviceLat,
        device_lon: deviceLon,
        status: 'Started',
        lang: 'EN',
        phone: checkerMobileNumber,
        page: 'Trade In',
        last_question: '4',
      };
      const res = await usersUpdate(data, intentID);
      console.log('this is update results ====>', res);
      dispatch(addHistory(true));
      dispatch(setDealType(dealClick));
      dispatch(setQuoteInterest(interest));
      dispatch(setOriginalOwner(owner));
      dispatch(setCommentValue(comment));
    }
  };

  return (
    <div className="flex flex-col bg-gray-50 w-full justify-center items-center">
      <p className="w-2/3 text-4xl mt-44 font-medium">
        Please select correct answer
      </p>
      <div className="w-2/3 flex flex-col text-justify bg-white rounded-3xl p-8 mt-5 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg justify-between font-sans">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-[60%] flex flex-col justify-between">
            <div className="flex flex-col justify-between bg-gray-50 rounded-3xl px-4">
              <div className="flex flex-col md:flex-row justify-between font-bold">
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
                Please select deal type.
              </p>
              {error !== '' ? (
                <p className="text-red-500 pl-6 pt-2">{error}</p>
              ) : null}
            </div>
          </div>
          <div className="flex w-full md:w-[40%] flex-col ml-2">
            <div className="flex flex-col justify-between bg-gray-50 rounded-3xl px-4">
              <div className="flex flex-col md:flex-row justify-between font-bold">
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
                Are you original owner?
              </p>
              {ownerError !== '' ? (
                <p className="text-red-500 pl-6 pt-2">{ownerError}</p>
              ) : null}
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <textarea
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            className="w-full h-20 border-2 rounded-md text-xl my-5 md:my-5 p-5 placeholder-blue-200 text-blue-600"
            id="autocomplete"
            placeholder="comment"
            type="text"
            value={comment}
            onChange={(e) => {
              setComment(e.target.value);
            }}
          />
          {commentError !== '' ? (
            <p className="text-red-500 pl-6 p-2 -mt-5">{commentError}</p>
          ) : null}
          {focus && <p className="bg-gray-50 rounded-3xl p-4 -mt-2">
            Please input your comment
          </p>}

          <div className="w-full flex justify-end my-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-[30%] h-16 rounded-lg text-white text-xl  hover:bg-purple-800"
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealType;
