import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import { addHistory, setMileageHour, removeHistory, } from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import TextField from '@mui/material/TextField';
import { MdModeEditOutline } from "react-icons/md";

const Mileage = () => {
  const {
    step,
    history,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [year, setYear] = useState('');
  const [error, setError] = useState('');
  const handleYearChange = (e) => {
    setYear(e.target.value);
    setError('');
  };

  useEffect(() => {
    setError('');
    setYear('');
  }, []);

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!year) {
      setError('Required');
    } else if (!/^[0-9]+$/.test(year)) {
      setError('*only number');
    } else {
      dispatch(addHistory(true));
      dispatch(setMileageHour(year));
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 10 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          <TextField
            id="margin-dense"
            margin="dense"
            label="Mileage hour"
            fullWidth
            value={year}
            onChange={handleYearChange}
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
        </div>
        {error !== '' ? (
          <p className="text-red-500 pl-2 text-sm">{error}</p>
        ) : null}
        <p className="bg-gray-50 rounded-3xl p-4">How much mileage hour?</p>

        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 10 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        {year}
<MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );

  return (
    <>
      {step > 8 ? (
        <>
          {history[9] == true ? (
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
export default Mileage;
