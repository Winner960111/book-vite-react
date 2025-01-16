import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkVerify } from '../../../api';
import {
  setCheckerMobileNumber,
  addHistory,
  setIdentifyId,
  setIdentifyStatus,
} from '../../../store/reducers/checker';
import { TextField } from '@mui/material';
const PhoneVerification = () => {
  const { dealerId, checkerMobileNumber, customerId } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [checkerMobileNumber]);

  const handleChangeInput = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setPhoneNumber(formattedInputValue);
    setError(null);
  };

  const handleCallCode = async (e) => {
    e.preventDefault();

    if (!phoneNumber.trim()) {
      setError('You should input your phone number');
    } else if (!/^\d{3}-\d{3}-\d{4}$/.test(phoneNumber)) {
      setError('Invalid phone number type');
    } else {
      const data = {
        dealer_id: dealerId,
        customer_id: customerId,
        mobile_phone: phoneNumber
      };
      const res = await checkVerify(data);
      console.log("this is res.stauts ===>", res.status)
      if (res.status === 201) {
        dispatch(setIdentifyId(res.data.id));
        dispatch(setIdentifyStatus(res.data.status));
        dispatch(setCheckerMobileNumber(phoneNumber));
        dispatch(addHistory(true));
        setPhoneNumber('');
      } else {
        setError('Invalid phone number. Please try again.');
      }
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <p className="w-4/5 md:w-[600px] text-4xl my-3 mt-10 font-medium">
          <b>Verify your mobile number</b>
        </p>
        <div
          className={
            'w-4/5 md:w-[600px] text-justify bg-white rounded-3xl px-8 pt-8 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
          }
        >
          <div className="py-2 flex flex-col items-center">
            <TextField
              helperText=" "
              id="demo-helper-text-aligned-no-helper"
              label="Phone Number"
              autoFocus
              value={phoneNumber}
              onChange={handleChangeInput}
              fullWidth
              type="text"
              InputProps={{
                style: {
                  height: '70px', // Set the height of the TextField
                  fontSize: '25px',
                  textAlign: 'center'
                },
              }}
              InputLabelProps={{
                style: {
                  textAlign: 'center',
                  fontSize: '25px'
                },
              }}
            />
            {error !== '' ? (
              <p className="text-red-500 pl-2 text-sm">{error}</p>
            ) : null}
          </div>
          <p className=" bg-gray-50 rounded-3xl p-4">
            We will send a <strong>verification code</strong> to the phone number you provide.<br />
            <i>Don&apos;t include &apos;+&apos; or &lsquo;()&rsquo;</i>
          </p>
          <div className="flex">
            <button
              type="button"
              onClick={handleCallCode}
              className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
            >
              VERIFY
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PhoneVerification;
