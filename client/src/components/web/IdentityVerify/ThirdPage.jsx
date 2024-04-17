import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory } from '../../../store/reducers/checker';
import { submitReference } from '../../../api/index';

const SecondPage = () => {
  const {
    dealerId,
    customerId,
    refRelation,
    refCity,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      dealer_id: dealerId,
      customer_id: customerId,
      type: refRelation,
      path: refCity,
    };

    const res = await submitReference(data);
    if (res.status == 201) {
      console.log('status ImageSend', res);
    dispatch(addHistory(true));

    } else {
      console.log('Faild ImageSend');
    }
  };

  return (
    <div className="flex bg-gray-50 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20 justify-center items-center">
        <p className="w-[70%] text-4xl text-black my-3 font-medium">
          Verify your identity.
        </p>
        <form
          className={classNames(
            ' w-[70%] text-justify bg-white rounded-3xl p-8 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
          )}
        >
          <iframe
            src="https://docupass.app/BP689UFC5K"
            title="Embedded Content"
            width="100%"
            height="500"
            className='border-2 border-solid border-blue-400 rounded-md'
          />
          <div className="w-full mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-2/6 h-16 p-2 rounded-lg text-white text-xl  hover:bg-purple-800"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SecondPage;
