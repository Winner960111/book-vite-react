import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setJobOccupation,
  setEmployerName,
  setEmployerPhoneNumber,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { classNames } from '../../../utils';
import { TextField } from '@mui/material';

const Job1 = () => {
  const {
    step,
    history,
    jobOccupation,
    employerName,
    employerPhoneNumber,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [occupation, setOccupation] = useState('');
  const [Ename, setEname] = useState('');
  const [Enumber, setEnumber] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    setOccupation('');
    setEname('');
    setEnumber('');
  }, []);

  const handleEnumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setEnumber(formattedInputValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    let pass = 0;
    if (!Enumber) {
      setError('*Phone number is required');
    } else {
      pass += 1;
    }

    if (!Ename.trim()) {
      setError('*Employeer name is required');
    } else if (!/^[A-Za-z]+$/.test(Ename.replace(/\s/g, ""))) {
      setError('*contains only characters in Emploeer name');
    } else {
      pass += 1;
    }
    if (!occupation.trim()) {
      setError('*Occupation field is required');
    } else if (!/^[A-Za-z]+$/.test(occupation)) {
      setError('*contains only characters in Occupation');
    } else {
      pass += 1;
    }
    if (pass == 3) {
      dispatch(addHistory(true));
      dispatch(setJobOccupation(occupation));
      dispatch(setEmployerName(Ename.replace(/\s/g, "")));
      dispatch(setEmployerPhoneNumber(Enumber));
    }
  };
  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 21 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="my-2 flex flex-col items-center"
          style={step >= 21 ? { display: 'none' } : { display: 'block' }}
        >
          <div className="w-[95%] mx-2 mt-2">
            <TextField
              variant="standard"
              defaultValue="Normal"
              margin="dense"
              label="Occupation"
              fullWidth
              autoComplete="off"
              value={occupation}
              onChange={(e) => {
                setOccupation(e.target.value);
              }}
              InputProps={{
                style: {
                  fontSize: '25px',
                  height: '50px',
                },
              }}
              InputLabelProps={{
                style: {
                  paddingTop: '10px',
                  fontSize: '16px',
                },
              }}
            />
            <TextField
              variant="standard"
              defaultValue="Normal"
              margin="dense"
              label="Employeer's name"
              fullWidth
              autoComplete="off"
              value={Ename}
              onChange={(e) => {
                setEname(e.target.value);
              }}
              InputProps={{
                style: {
                  fontSize: '25px',
                  height: '50px',
                },
              }}
              InputLabelProps={{
                style: {
                  paddingTop: '10px',
                  fontSize: '16px',
                },
              }}
            />
            <TextField
              variant="standard"
              defaultValue="Normal"
              margin="dense"
              label="Employeer's phone number"
              fullWidth
              autoComplete="off"
              value={Enumber}
              onChange={handleEnumber}
              InputProps={{
                style: {
                  fontSize: '25px',
                  height: '50px',
                },
              }}
              InputLabelProps={{
                style: {
                  paddingTop: '10px',
                  fontSize: '16px',
                },
              }}
            />
          </div>

          {error !== null ? (
            <p className="text-red-500 pl-2 mt-1">{error}</p>
          ) : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          What is your current job information?
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 21 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );
  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        current occupation:{jobOccupation}
        <br />
        Employeer name:{employerName}
        <br />
        Employeer Phone number: {employerPhoneNumber}
      </div>
    </div>
  );
  return (
    <>
      {step > 19 ? (
        <>
          {history[20] == true ? (
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
export default Job1;
