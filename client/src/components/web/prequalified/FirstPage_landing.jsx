import { useState, useEffect } from 'react';
// import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCheckerFirstName,
  setCheckerMiddleName,
  setCheckerLastName,
  setCheckerBirthday,
  setCheckerEmail,
  setCheckerMobileNumber,
  setCheckerSocialNumber,
} from '../../../store/reducers/checker';
// import { usersUpdate } from '../../../api/index';
import { TextField } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

const FirstPage = () => {
  const {
    dealerName,
    checkerFirstName,
    checkerLastName,
    checkerEmail,
    // submit,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [socialNumber, setSocialNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailHover, setHoverEmail] = useState(null);
  const [first, setFirst] = useState(null);
  const [middle, setMiddle] = useState(null);
  const [last, setLast] = useState(null);
  const [social, setSocial] = useState(null);
  const [phone, setPhone] = useState(null);
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');

  const handleMonthChange = (e) => setMonth(e.target.value);
  const handleDayChange = (e) => setDay(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const years = Array.from(
    { length: 100 },
    (_, i) => new Date().getFullYear() - i
  );

  useEffect(() => {
    dispatch(setCheckerBirthday(year + '-' + month + '-' + day));
  }, [year, day, month]);

  const handleFirstName = (e) => {
    setFirstName(e.target.value.replace(/[^A-Za-z]/g, ''));
    dispatch(setCheckerFirstName(e.target.value.replace(/[^A-Za-z]/g, '')));
    // setErrorFirstName('');
    console.log('Firstname====>', checkerFirstName);
  };
  const handleMiddleName = (e) => {
    dispatch(setCheckerMiddleName(e.target.value.replace(/[^A-Za-z]/g, '')));
    setMiddleName(e.target.value.replace(/[^A-Za-z]/g, ''));
    // setErrorMiddleName('');
  };
  const handleLastName = (e) => {
    dispatch(setCheckerLastName(e.target.value.replace(/[^A-Za-z]/g, '')));
    setLastName(e.target.value.replace(/[^A-Za-z]/g, ''));
    // setErrorLastName('');
    console.log('Lastname===>', checkerLastName);
  };
  const handleEmailAddress = (e) => {
    dispatch(setCheckerEmail(e.target.value));
    setEmailAddress(e.target.value);
    console.log('✔🧨✔🧨', checkerEmail);
    // setErrorEmailAddress('');
  };
  const handlePhoneNumber = (e) => {
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 6) +
      (inputValue.length > 6 ? '-' : '') +
      inputValue.substring(6, 10);
    setPhoneNumber(formattedInputValue);
    dispatch(setCheckerMobileNumber(phoneNumber));
    // setErrorPhoneNumber(null);
  };
  const handleSocialNumber = (e) => {
    // setErrorSocialNumber('');
    const inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    const formattedInputValue =
      inputValue.substring(0, 3) +
      (inputValue.length > 3 ? '-' : '') +
      inputValue.substring(3, 5) +
      (inputValue.length > 5 ? '-' : '') +
      inputValue.substring(5, 9);
    dispatch(setCheckerSocialNumber(formattedInputValue));
    setSocialNumber(formattedInputValue);
  };

  // useEffect(() => {
  //   if (submit) {
  //     let pass = 0;
  //     if (!firstName) {
  //       setErrorFirstName('*Field is required');
  //     } else if (!/^[A-Za-z]+$/.test(firstName)) {
  //       setErrorFirstName('*Contains only characters');
  //     } else {
  //       pass += 1;
  //     }
  //     if (!/^[A-Za-z]+$/.test(middleName) && middleName) {
  //       setErrorMiddleName('*Contains only character');
  //     } else {
  //       pass += 1;
  //     }
  //     if (!lastName) {
  //       setErrorLastName('*Field is required');
  //     } else if (!/^[A-Za-z]+$/.test(lastName)) {
  //       setErrorLastName('*Contains only characters');
  //     } else {
  //       pass += 1;
  //     }
  //     if (!birthday) {
  //       setErrorBirthday('*Input your correct birthday');
  //     } else {
  //       pass += 1;
  //     }
  //     if (!socialNumber) {
  //       setErrorSocialNumber('*Input your social security number');
  //     } else if (!/^\d{3}-\d{2}-\d{4}$/.test(socialNumber)) {
  //       setErrorSocialNumber('*Invalid social security number');
  //     } else {
  //       pass += 1;
  //     }
  //     if (!emailAddress) {
  //       setErrorEmailAddress('*Input your email');
  //     } else if (
  //       !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(emailAddress)
  //     ) {
  //       setErrorEmailAddress('*Invalid email type');
  //     } else {
  //       pass += 1;
  //     }
  //     if (!phoneNumber) {
  //       setErrorPhoneNumber('*Input your phone number');
  //     }
  //     dispatch(setSubmit(false));
  //   }
  // }, [submit]);

  // console.log('setErrorFirstName🏅🏅🏅===>', errorFirstName);
  return (
    <>
      <p className="text-2xl  text-gray-500 mt-2 ml-2">
        <b> Personal Information</b>
      </p>
      <div className="text-center pb-2 gap-2 border border-gray-300 rounded-xl w-full flex flex-col">
        <div className="w-full flex  max-md:flex-col">
          <div className="flex flex-col text-left w-full  md:mx-5">
            <TextField
              aria-owns={first ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setFirst(event.currentTarget)}
              onMouseLeave={() => setFirst(null)}
              onMouseDown={() => setFirst(null)}
              value={firstName}
              onChange={handleFirstName}
              fullWidth
              required
              autoComplete="off"
              //   defaultValue="Normal"
              label="First name"
              variant="standard"
              InputProps={{
                style: {
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(first)}
              anchorEl={first}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setFirst(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }}>
                Please enter your first name.
              </Typography>
            </Popover>
            {/* {errorFirstName !== '' && (
              <p className="text-red-500 pl-2">{errorFirstName}</p>
            )} */}
          </div>
          <div className="flex flex-col text-left w-full  md:mx-5">
            <TextField
              aria-owns={middle ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setMiddle(event.currentTarget)}
              onMouseLeave={() => setMiddle(null)}
              onMouseDown={() => setMiddle(null)}
              value={middleName}
              onChange={handleMiddleName}
              fullWidth
              type="text"
              autoComplete="off"
              //   defaultValue="Normal"
              label="Middle Initial(optional)"
              variant="standard"
              InputProps={{
                style: {
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(middle)}
              anchorEl={middle}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setMiddle(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }} style={{ width: '300px' }}>
                In the case you have a middle name on your credit report please
                enter here.
              </Typography>
            </Popover>
            {/* {errorMiddleName !== '' && (
              <p className="text-red-500 pl-2">{errorMiddleName}</p>
            )} */}
          </div>
          <div className="flex flex-col text-left w-full  md:mx-5">
            <TextField
              aria-owns={last ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setLast(event.currentTarget)}
              onMouseLeave={() => setLast(null)}
              onMouseDown={() => setLast(null)}
              value={lastName}
              onChange={handleLastName}
              fullWidth
              required
              type="text"
              autoComplete="off"
              //   defaultValue="Normal"
              label="Last name"
              variant="standard"
              InputProps={{
                style: {
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(last)}
              anchorEl={last}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setLast(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }}>
                Please enter your last name.
              </Typography>
            </Popover>
            {/* {errorLastName !== '' && (
              <p className="text-red-500 pl-2">{errorLastName}</p>
            )} */}
          </div>
        </div>
        <div className="w-full flex justify-between flex-col md:flex-row">
          <div className="flex flex-col text-left w-full  md:mx-5">
            <TextField
              aria-owns={emailHover ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setHoverEmail(event.currentTarget)}
              onMouseLeave={() => setHoverEmail(null)}
              onMouseDown={() => setHoverEmail(null)}
              value={emailAddress}
              onChange={handleEmailAddress}
              type="text"
              fullWidth
              required
              autoComplete="off"
              //   defaultValue="Normal"
              label="Email address"
              variant="standard"
              InputProps={{
                style: {
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(emailHover)}
              anchorEl={emailHover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setHoverEmail(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }} style={{ width: '30vw' }}>
                By providing your email you agree to receive notification
                messages from <b>{dealerName}</b> to the provided email address.
              </Typography>
            </Popover>
            {/* {errorEmailAddress !== '' && (
              <p className="text-red-500 pl-2">{errorEmailAddress}</p>
            )} */}
          </div>
          <div className="flex flex-col text-left w-full  md:mx-5">
            <TextField
              aria-owns={phone ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setPhone(event.currentTarget)}
              onMouseLeave={() => setPhone(null)}
              onMouseDown={() => setPhone(null)}
              value={phoneNumber}
              onChange={handlePhoneNumber}
              type="text"
              fullWidth
              required
              autoComplete="off"
              //   defaultValue="Normal"
              label="Phone number"
              variant="standard"
              InputProps={{
                style: {
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(phone)}
              anchorEl={phone}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setPhone(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }} style={{ width: '30vw' }}>
                By providing your phone nuber you agree to receive notification
                messages from <b>{dealerName}</b> to the provided phone number.
              </Typography>
            </Popover>
            {/* {errorPhoneNumber !== '' && (
              <p className="text-red-500 pl-2">{errorPhoneNumber}</p>
            )} */}
          </div>
        </div>
        <div className="w-full flex justify-between items-center flex-col md:flex-row">
          <div className="flex flex-col text-left w-[30%]  md:mx-5">
            <TextField
              aria-owns={social ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={(event) => setSocial(event.currentTarget)}
              onMouseLeave={() => setSocial(null)}
              onMouseDown={() => setSocial(null)}
              value={socialNumber}
              onChange={handleSocialNumber}
              fullWidth
              required
              type="text"
              autoComplete="off"
              //   defaultValue="Normal"
              label="Social security number"
              variant="standard"
              InputProps={{
                style: {
                  // height: '40px', // Set the height of the TextField
                  fontSize: '20px',
                },
              }}
              InputLabelProps={{
                style: {
                  fontSize: '20px',
                },
              }}
            />
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: 'none',
              }}
              open={Boolean(social)}
              anchorEl={social}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={() => setSocial(null)}
              disableRestoreFocus
            >
              <Typography sx={{ p: 2 }} style={{ width: '300px' }}>
                {
                  'We collect your Social Security Number (SSN) to verify your identity and ensure the security and integrity of our services.'
                }
              </Typography>
            </Popover>
            {/* {errorSocialNumber !== '' && (
              <p className="text-red-500 pl-2">{errorSocialNumber}</p>
            )} */}
          </div>
          <div className="flex w-[70%] text-left  md:mx-5 items-center justify-between">
            <p className="">Date Of Birth*</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <select
                value={month}
                onChange={handleMonthChange}
                className="border-gray-300 border-2 rounded-md py-1 px-5"
                required
              >
                <option value="" disabled>
                  MM
                </option>
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select
                value={day}
                onChange={handleDayChange}
                className="border-gray-300 border-2 rounded-md py-1 px-5"
                required
              >
                <option value="" disabled>
                  DD
                </option>
                {Array.from({ length: 31 }, (_, i) => (
                  <option key={i} value={i + 1}>
                    {String(i + 1).padStart(2, '0')}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={handleYearChange}
                className="border-gray-300 border-2 rounded-md py-1 px-5"
                required
              >
                <option value="" disabled>
                  YYYY
                </option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {/* {errorBirthday !== '' && (
              <p className="text-red-500 pl-2">{errorBirthday}</p>
            )} */}
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstPage;
