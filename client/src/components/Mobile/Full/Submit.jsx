import { useState, useEffect, useRef, useCallback } from 'react';
import BotIcon from './BotIcon';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { fullcustomer} from '../../../api/index';
import './Canvas.css';
import { useNavigate } from 'react-router-dom';

const Submit = () => {
  const dispatch = useDispatch();
  const {
    history,
    step,
    dealerName,
    dealerId,
    checkerMobileNumber,
    checkerFirstName,
    checkerMiddleName,
    checkerLastName,
    checkerEmail,
    checkerSocialNumber,
    checkerBirthday,
    usCitizen,
    deviceIP,
    deviceOS,
    deviceCity,
    deviceCountry,
    deviceState,
    deviceDate,
    deviceLat,
    deviceLon,
    deviceBrowser,
    // intentID,
    mileageHour,
    incomeFrequency,
    type,
    jobOccupation,
    employerName,
    employerPhoneNumber,
    jobAddress,
    jobCity,
    jobState,
    jobZipcode,
    jobSalary,
    jobYear,
    jobstatus,
    prevjobOccupation,
    prevemployerName,
    prevemployerPhoneNumber,
    prevJobAddress,
    prevjobCity,
    prevjobState,
    prevjobZipcode,
    prevjobSalary,
    prevjobstatus,
    prevjobYear,
    jobEndDate,
    driverNumber,
    driverDate,
    driverState,
    iDate,
    iIsuer,
    iType,
    checkerAddress,
    checkerState,
    checkerZipcode,
    checkerLocality,
    residentalMonths,
    residentalYears,
    monthlyPay,
    residentalStatus,
    previousResidentalStatus,
    previousCheckerAddress,
    previousCheckerLocality,
    previousCheckerState,
    previousCheckerZipcode,
    previousMonthlyPay,
    previousResidentalYears,
    previousResidentalMonths,
    incomeAmount,
    sourceIncome,
    bankrupcy,
    instantYear,
    instantMake,
    instantModel,
    vehicleCondition,
    vehicleType,
    payDwon,
  } = useSelector((state) => state.checker);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [readStatePara1, setReadStatePara1] = useState(false);
  const [readStatePara2, setReadStatePara2] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()
  const handleResize = () => {
    // Rerun your code to set canvas size based on the new dimensions
    prepareCanvas();
  };

  const clearCanvas = () => {
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  // Add event listener to window
  window.addEventListener('resize', handleResize);

  // Initialize the canvas context
  const prepareCanvas = useCallback(() => {
    if (canvasRef.current) {

      const canvas = canvasRef.current;
      // Get the dimensions of the parent element
      const { width, height } = canvas.parentElement.getBoundingClientRect();

      const dpr = window.devicePixelRatio || 1;

      canvas.width = width * 2 * dpr; // Twice the actual size for high DPI screens
      canvas.height = height * 2 * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const context = canvas.getContext('2d');
      context.scale(dpr * 2, dpr * 2); // Adjust for high DPI
      context.lineCap = 'round';
      context.strokeStyle = 'black';
      context.lineWidth = 5;
      contextRef.current = context;

      const preventScroll = (event) => {
        event.preventDefault();
      };

      // Add event listeners to canvas with preventScroll
      canvasRef.current.addEventListener('touchstart', preventScroll, {
        passive: false,
      });
      canvasRef.current.addEventListener('touchmove', preventScroll, {
        passive: false,
      });
    }
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      prepareCanvas();
    }
  }, [step, prepareCanvas]);

  const getTouchPos = (canvasDom, touchEvent) => {
    if (!canvasDom || !touchEvent.touches.length) return null;

    const rect = canvasDom.getBoundingClientRect();

    return {
      x: touchEvent.touches[0].clientX - rect.left,
      y: touchEvent.touches[0].clientY - rect.top,
    };
  };

  // Start drawing
  const startDrawing = ({ nativeEvent }) => {
    const pos = nativeEvent.type.includes('touch')
      ? getTouchPos(canvasRef.current, nativeEvent)
      : { x: nativeEvent.offsetX, y: nativeEvent.offsetY };

    if (!pos) return; // If position is null, exit

    contextRef.current.beginPath();
    contextRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  // Draw line
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    // Get the position based on event type: mouse or touch
    const rect = canvasRef.current.getBoundingClientRect();

    const offsetX = nativeEvent.type.includes('touch')
      ? nativeEvent.touches[0].clientX - rect.left
      : nativeEvent.offsetX;
    const offsetY = nativeEvent.type.includes('touch')
      ? nativeEvent.touches[0].clientY - rect.top
      : nativeEvent.offsetY;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // End drawing
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const canvas = canvasRef.current;
    const imageDataURL = canvas.toDataURL('image/png');
    const image = new Image();
    image.src = imageDataURL;

    let fullName;
    if (checkerMiddleName !== '') {
      fullName =
        checkerFirstName + ' ' + checkerMiddleName + ' ' + checkerLastName;
    } else {
      fullName = checkerFirstName + ' ' + checkerLastName;
    }

    const data = {
      dealer_id: dealerId,
      performed_by: "Customer",
      source: "Full",
      usr_id: "",
      first_name: checkerFirstName,
      middle_name: checkerMiddleName,
      last_name: checkerLastName,
      email: checkerEmail,
      mobile_phone: checkerMobileNumber,
      ssn: checkerSocialNumber,
      dob: checkerBirthday,
      primary_address2: "",
      primary_address: checkerAddress,
      primary_city: checkerLocality,
      primary_state: checkerState,
      primary_zip_code: checkerZipcode,
      primary_housing_status: residentalStatus,
      primary_housing_time_years: residentalYears,
      primary_housing_time_months: residentalMonths,
      primary_housing_payment_amount: monthlyPay,
      previous_address: previousCheckerAddress,
      previous_address2: '',
      previous_city: previousCheckerLocality,
      previous_state: previousCheckerState,
      previous_zip_code: previousCheckerZipcode,
      previous_housing_time_years: previousResidentalYears,
      previous_housing_time_months: previousResidentalMonths,
      previous_housing_payment_amount: previousMonthlyPay,
      previous_housing_status: previousResidentalStatus,
      employer_occupation: jobOccupation,
      employer_name: employerName,
      employer_address: jobAddress,
      employer_address2: '',
      employer_city: jobCity,
      employer_state: jobState,
      employer_zip_code: jobZipcode,
      employer_phone: employerPhoneNumber,
      employer_salary: jobSalary,
      employer_start_date: jobYear,
      employer_type: jobstatus,
      citizenship: usCitizen,
      previous_employer_occupation: prevjobOccupation,
      previous_employer_name: prevemployerName,
      previous_employer_address: prevJobAddress,
      previous_employer_address2: '',
      previous_employer_city: prevjobCity,
      previous_employer_state: prevjobState,
      previous_employer_zip_code: prevjobZipcode,
      previous_employer_phone: prevemployerPhoneNumber,
      previous_employer_salary: prevjobSalary,
      previous_employer_start_date: prevjobYear,
      previous_employer_end_date: jobEndDate,
      previous_employer_type: prevjobstatus,
      bankruptcy: bankrupcy,
      extra_income: incomeAmount,
      extra_income_frequency: sourceIncome,
      reference1_first_name: '',
      reference1_last_name: '',
      reference1_phone: '',
      reference1_city: '',
      reference1_relationship: "",
      reference1_state: '',
      reference2_first_name: '',
      reference2_last_name: '',
      reference2_phone: '',
      reference2_city: '',
      reference2_relationship: "",
      reference2_state: '',
      signature_img: image.src,
      signature_name: fullName,
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
      driver_licenced_number: driverNumber,
      driver_licenced_exp_date: driverDate,
      driver_licenced_state: driverState,
      secondary_ID_type: iType,
      secondary_ID_exp_date: iDate,
      secondary_ID_issuer: iIsuer,
      vehicle_year: instantYear,
      vehicle_make: instantMake,
      vehicle_model: instantModel,
      vehicle_condition: vehicleCondition,
      vehicle_type: vehicleType,
      vehicle_mileage: mileageHour,
      vehicle_vin: "",
      vehicle_price: 0,
      down_payment: payDwon,
      extra_income_source: incomeFrequency,
    };

    const res = await fullcustomer(data);
    if (res.status == 201) {
      console.log('status CustomerItems_Send', res);
      dispatch(addHistory(true));
      setLoading(false)
      navigate(-1)
    } else {
      console.log('Faild CustomerItems_Send');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 29 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <p className="bg-gray-50 rounded-3xl p-4">We are almost done:</p>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          We are committed to protecting your privacy. The information that you
          provided is only shared with the dealership to assess your credit
          history and not otherwise sold, marketed, or distributed in any way by{' '}
          {dealerName}.
        </p>
        <div className="bg-gray-50 rounded-3xl p-4 mt-2">
          <p
            onClick={() => setReadStatePara1(!readStatePara1)}
            className={
              readStatePara1 == false
                ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                : null
            }
          >
            Please click{' '}
            {step == 29 ? (
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            ) : (
              'here'
            )}{' '}
            to read our Privacy Notice and click{' '}
            {step == 29 ? (
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            ) : (
              'here'
            )}{' '}
            to read our full Privacy Policy. If you would like to opt-out of
            having your information shared at all, please do so now by clicking{' '}
            {step == 29 ? (
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
            ) : (
              'here'
            )}{' '}
            and exiting the application.
          </p>
          <span
            onClick={() => setReadStatePara1(!readStatePara1)}
            className={
              step == 29
                ? 'text-blue-600 text-sm hover:underline cursor-pointer'
                : null
            }
          >
            {readStatePara1 == false ? 'More' : 'Less'}
          </span>
        </div>
        <div className="bg-gray-50 rounded-3xl p-4 mt-2">
          <p
            className={
              readStatePara2 == false
                ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                : null
            }
          >
            By typing my name and clicking submit, I authorize {dealerName} to
            investigate my credit history solely to determine the best available
            offers to fund my loan, I also acknowledge that I have read,
            understand, and agree to be bound by our End User{' '}
            {step == 29 ? (
              <a
                href="https://www.riderflow.app/terms/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of use
              </a>
            ) : (
              'here'
            )}{' '}
            and our{' '}
            {step == 29 ? (
              <a
                href="https://www.riderflow.app/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            ) : (
              'here'
            )}{' '}
            and agree to have the information that I provided shared with
            lenders in accordance therewith. I also understand that if a
            prequalified offer is found by any of our lenders, they will perform
            a hard inquiry which can impact my credit history.
          </p>
          <span
            onClick={() => setReadStatePara2(!readStatePara2)}
            className={
              step == 29
                ? 'text-blue-600 text-sm hover:underline cursor-pointer'
                : null
            }
          >
            {readStatePara2 == false ? 'More' : 'Less'}
          </span>
        </div>

        <div
          className="flex relative md:flex-row md:items-center mt-2"
          style={step >= 29 ? { display: 'none' } : { display: 'block' }}
        >
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            onMouseOut={finishDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={finishDrawing}
          />
          <img src="/refresh-button.png" alt="" className='absolute top-2 right-2 w-6 cursor-pointer' onClick={clearCanvas} />
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please sign in above input field. it will act as your digital
          signature.
        </p>
        <button
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md py-4 text-black hover:bg-black hover:text-white font-medium text-2xl mt-2"
          style={step >= 29 ? { display: 'none' } : { display: 'block' }}
        >
          Submit
        </button>
      </form>
      <div className= {loading? "mt-10 flex justify-center": "mt-10 flex justify-center hidden"}><img src="/ZZ5H.gif" alt="loading.." className='w-10'/></div>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        <p>
          Our team is already working diligently to review your information and
          will get back to you promptly with the next steps.
        </p>
      </div>
    </div>
  );

  return (
    <>
      {step > 27 ? (
        <>
          {history[28] == true ? (
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
export default Submit;
