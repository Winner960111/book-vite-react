import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckerEmail,
  setCommentValue,
} from '../../../store/reducers/checker';
import { TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const SecondPage = () => {
  const { step, dealerName } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [errorEmailAddress, setErrorEmailAddress] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [focusEmailAddress, setFocusEmailAddress] = useState(Boolean);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailAddress = (e) => {
    setEmailAddress(e.target.value);
    setErrorEmailAddress('');
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
    setErrorMessage('');
  };

  useEffect(() => {
    setErrorEmailAddress('');
    setErrorMessage('');
  }, [step]);

  const handlesubmit = async () => {
    let pass = 0;
    if (!message) {
      setErrorMessage('*field is required');
    } else {
      pass += 1;
    }
    if (!emailAddress) {
      setErrorEmailAddress('input your email');
    } else if (
      !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)
    ) {
      setErrorEmailAddress('Invalid email type');
    } else {
      pass += 1;
    }
    if (pass == 2) {
      dispatch(addHistory(true));
      dispatch(setCheckerEmail(emailAddress));
      dispatch(setCommentValue(message));
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-2/3 text-4xl my-3 font-medium">
            We need to your some information
          </p>
          <div className="w-full min-w-[600px] text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex flex-col">
                <textarea
                  name=""
                  id=""
                  className="w-full h-20 border-black border-2 p-2"
                  placeholder="Write message"
                  maxLength={200}
                  onChange={handleMessage}
                ></textarea>
                {errorMessage !== '' && (
                  <p className="text-red-500 pl-2">{errorMessage}</p>
                )}
            </div>

            <div className="w-full px-5 flex justify-between md:flex-row flex-col">
              <div className="flex flex-col min-w-[250px] md:w-[30%] w-full">
                <TextField
                  aria-owns={focus ? 'mouse-over-popover' : undefined}
                  aria-haspopup="true"
                  onMouseEnter={(event) =>
                    setFocusEmailAddress(event.currentTarget)
                  }
                  onMouseLeave={() => setFocusEmailAddress(null)}
                  onMouseDown={() => setFocusEmailAddress(null)}
                  value={emailAddress}
                  onChange={handleEmailAddress}
                  fullWidth
                  autoComplete="off"
                  defaultValue="Normal"
                  label="Email address"
                  variant="standard"
                  InputProps={{
                    style: {
                      height: '50px', // Set the height of the TextField
                      fontSize: '25px',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      fontSize: '25px',
                    },
                  }}
                />
                <Popover
                  id="mouse-over-popover"
                  sx={{
                    pointerEvents: 'none',
                  }}
                  open={Boolean(focusEmailAddress)}
                  anchorEl={focusEmailAddress}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={() => setFocusEmailAddress(null)}
                  disableRestoreFocus
                >
                  <Typography sx={{ p: 2, width: '300px' }}>
                    By providing your email you agree to receive notification
                    messages from <b>{dealerName}</b> to the provided email
                    address.
                  </Typography>
                </Popover>
                {errorEmailAddress !== '' && (
                  <p className="text-red-500 pl-2">{errorEmailAddress}</p>
                )}
              </div>
              <button
                type="button"
                onClick={handlesubmit}
                className="w-full lg:min-w-[200px] lg:w-[30%] border-black border-2 rounded-md text-black hover:bg-black hover:text-white text-2xl mt-2 py-4"
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
export default SecondPage;
