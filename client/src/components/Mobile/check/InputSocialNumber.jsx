import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setAppStatus,
  setAppDescription,
  setCheckerSocialNumber,
} from '../../../store/reducers/checker';
import BotIcon from './BotIcon';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
import { checkapp } from '../../../api/index';

const InputSocialNumber = () => {
  const {
    step,
    history,
    checkerMobileNumber,
    checkerSocialNumber,
    dealerId,
    checkerLastName,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [socialNumber, setSocialNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInputSocialNumber = (e) => {
    setError(null);
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue = inputValue.substring(0, 4);
    setSocialNumber(formattedInputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (socialNumber.length === 0) {
      setError('You should input your social security number');
    } else {
      const data = {
        dealer_id: dealerId,
        last_name: checkerLastName,
        ssn: socialNumber,
        mobile_phone: checkerMobileNumber,
      };
      const res = await checkapp(data);
      if (res.status == 201) {
        res.data;
        dispatch(setAppStatus(res.data.status));
        dispatch(setAppDescription(res.data.describe));
        dispatch(addHistory(true));
        dispatch(setCheckerSocialNumber(socialNumber));
        setSocialNumber('');
      } else {
        ('failed API calling.');
      }
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 5 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="outlined-multiline-flexible"
            label="Social security number"
            fullWidth
            value={socialNumber}
            onChange={handleChangeInputSocialNumber}
            autoComplete="off"
            type="text"
            InputProps={{
              style: {
                height: '70px', // Set the height of the TextField
                fontSize: '25px',
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '25px',
              },
            }}
          />
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          <b>*Input only last 4 digit</b>
          <br />
          We will not hurt your credit report. This is not an application for
          credit. Authorization is solely for prequalification only.
        </p>
        <button
          type="submit"
          className="bg-[#854fff] w-full h-16 px-2 py-1 rounded-2xl text-white text-sm md:text-lg mt-4 hover:bg-purple-800"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-[#b39fe4] rounded-tl-xl rounded-b-xl text-white">
        <p>{checkerSocialNumber}</p>
      </div>
    </div>
  );

  return (
    <>
      {step > 3 ? (
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
export default InputSocialNumber;
