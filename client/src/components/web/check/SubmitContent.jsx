import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import {checkapp} from '../../../api/index'

const SubmitContent = () => {
  const {
    step,
    checkerMobileNumber,
    dealerId,
 
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorLastName, setErrorLastName] = useState('');
  const [errorSocialNumber, setErrorSocialNumber] = useState('');
  const [lastName, setLastName] = useState('');
  const [socialNumber, setSocialNumber] = useState('');

  const [focusLastName, setFocusLastName] = useState(Boolean);
  const [focusSocialNumber, setFocusSocialNumber] = useState(Boolean);

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setErrorLastName('');
  };
  const handleSocialNumber = (e) => {
    setErrorSocialNumber('');
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 4)
    setSocialNumber(formattedInputValue);
  };

  useEffect(() => {
    setErrorLastName('');
    setErrorSocialNumber('');
  }, [step]);

  const handlesubmit = async () => {

    if (!lastName) {
      setErrorLastName('*field is required');
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setErrorLastName('*contains only characters');
    } else {
        const data = {
        dealer_id: dealerId,
        last_name: lastName,
        ssn: socialNumber,
        mobile_phone: checkerMobileNumber
      }
      const res = await checkapp(data)
      if (res.status == 201) {
        dispatch(addHistory(true));
      } else {
        console.log("failed API calling.")
      }
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-28 mx-20 items-center">
          <p className="w-2/3 text-4xl my-3 font-medium">
            We need to your some information
          </p>
          <div className="w-2/3 text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="w-full p-5 flex flex-col md:flex-row items-start">

              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusLastName(true)}
                  onBlur={() => setFocusLastName(false)} // onBlur is triggered when the input loses focus
                  value={lastName}
                  onChange={handleLastName}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  label="Last Name"
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px'
                    },
                  }}
                />
                {errorLastName !== '' && (
                  <p className="text-red-500 pl-2">{errorLastName}</p>
                )}
                {focusLastName && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    Please enter your last name.
                  </p>
                )}
              </div>
              <div className="flex flex-col w-full my-3 md:mx-5">
                <TextField
                  onFocus={() => setFocusSocialNumber(true)}
                  onBlur={() => setFocusSocialNumber(false)} // onBlur is triggered when the input loses focus
                  value={socialNumber}
                  onChange={handleSocialNumber}
                  fullWidth
                  type="text"
                  defaultValue="Normal"
                  label="Social security number"
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px'
                    },
                  }}
                />
                {errorSocialNumber !== '' && (
                  <p className="text-red-500 pl-2">{errorSocialNumber}</p>
                )}
                {focusSocialNumber && (
                  <p className="bg-gray-50 rounded-3xl p-4 mt-2">
                    *Input only last 4 digit<br />
                    We will not hurt your credit report. This is not an
                    application for credit. Authorization is solely for
                    prequalification only.
                  </p>
                )}
              </div>
            </div>

            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-full me:w-[30%] h-16 md:mx-4 rounded-lg text-white text-xl  hover:bg-purple-800"
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
export default SubmitContent;
