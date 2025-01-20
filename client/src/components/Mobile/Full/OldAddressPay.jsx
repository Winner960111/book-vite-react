import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setPreviousMonthlyPay,
  removeHistory,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';
import { MdModeEditOutline } from "react-icons/md";

const NewInterestMore = () => {
  const {
    step,
    history,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [pay, setPay] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setPay('');
  }, []);

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handlePay = (e) => {
    if (/^[+-]?\d+(\.\d*)?$/.test(e.target.value) || !e.target.value.trim()) {
      setPay(e.target.value)
    }
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (pay !== '') {
      dispatch(addHistory(true));
      dispatch(setPreviousMonthlyPay(pay));
    }
  };
  const renderDescription = () => (
    <>
      <BotIcon />
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 20 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="my-2 flex flex-col items-center"
          style={step >= 20 ? { display: 'none' } : { display: 'block' }}
        >
          <div className="w-[95%] mx-2 mt-2">
            <TextField
              variant="standard"
              defaultValue="Normal"
              margin="dense"
              label="Monthly mortage/rent"
              fullWidth
              autoComplete="off"
              value={pay}
              onChange={handlePay}
              InputProps={{
                style: {
                  fontSize: '25px',
                  height: '50px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '25px',
                },
              }}
            />
          </div>
          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          How much was your mortage/rent payment?
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 20 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </div>
    </>
  );
  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        {pay}
        <MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );
  return (
    <>
      {step > 18 ? (
        <>
          {history[19] == true ? (
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
export default NewInterestMore;
