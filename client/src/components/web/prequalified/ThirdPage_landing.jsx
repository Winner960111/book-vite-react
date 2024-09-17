import { useState, useEffect, useRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { classNames } from '../../../utils';
import { signatureImg } from '../../../api/index';
import './Canvas.css';
import { clearHistory } from '../../../store/reducers/checker';
const ThirdPage = () => {
  const {
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
    checkerAddress,
    checkerApt,
    checkerLocality,
    checkerState,
    checkerZipcode,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const navigate = useNavigate();
  const [viewCaptch, setViewCaptcha] = useState(false);
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const handleClick_Check1 = () => setChecked1(!checked1);
  const [checked2, setChecked2] = useState(false);
  const handleClick_Check2 = () => setChecked2(!checked2);
  const [checked3, setChecked3] = useState(false);
  const handleClick_Check3 = () => setChecked3(!checked3);

  const Site_key = import.meta.env.VITE_APP_SITE_KEY;
  const handleCaptchaChange = (value) => {
    console.log('🏅🏅🏅===>', value);
    if (value) {
      setIsCaptchaVerified(true);
    } else {
      setIsCaptchaVerified(false);
    }
  };

  const handleResize = () => {
    // Rerun your code to set canvas size based on the new dimensions
    console.log('web and mobile situation is exchanged.');
    prepareCanvas();
  };

  // Add event listener to window
  window.addEventListener('resize', handleResize);

  // Initialize the canvas context
  const prepareCanvas = useCallback(() => {
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
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      prepareCanvas();
    }
  }, [step, prepareCanvas]);

  // Start drawing
  const startDrawing = ({ nativeEvent }) => {
    const pos = { x: nativeEvent.offsetX, y: nativeEvent.offsetY };

    if (!pos) return; // If position is null, exit

    contextRef.current.beginPath();
    contextRef.current.moveTo(pos.x, pos.y);
    setIsDrawing(true);
  };

  // Draw line
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;

    const offsetX = nativeEvent.offsetX;
    const offsetY = nativeEvent.offsetY;
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
    setViewCaptcha(true);

    if (isCaptchaVerified) {
      // dispatch(setSubmit(true));
      const canvas = canvasRef.current;
      const imageDataURL = canvas.toDataURL('image/png');
      const image = new Image();
      image.src = imageDataURL;
      console.log('This is 0errorImage', image.src);
      let fullName;
      if (checkerMiddleName !== '') {
        fullName =
          checkerFirstName + ' ' + checkerMiddleName + ' ' + checkerLastName;
      } else {
        fullName = checkerFirstName + ' ' + checkerLastName;
      }

      if (
        dealerId &&
        checkerFirstName &&
        checkerLastName &&
        checkerEmail &&
        checkerMobileNumber &&
        checkerSocialNumber &&
        checkerBirthday &&
        checkerAddress &&
        checkerLocality &&
        checkerState &&
        checkerZipcode &&
        checked1 &&
        checked2 &&
        checked3
      ) {
        const data = {
          dealer_id: dealerId,
          first_name: checkerFirstName,
          middle_name: checkerMiddleName,
          last_name: checkerLastName,
          email: checkerEmail,
          mobile_phone: checkerMobileNumber,
          ssn: checkerSocialNumber,
          dob: checkerBirthday,
          primary_address: checkerAddress,
          primary_address2: checkerApt,
          primary_city: checkerLocality,
          primary_state: checkerState,
          primary_zip_code: checkerZipcode,
          signature_name: fullName,
          signature_img: image.src,
          custom_id: '',
          usr_id: '',
        };
        console.log('🏅🏅🏅🏅🏅🏅🏅', data);

        const res = await signatureImg(data);
        if (res.status == 201) {
          console.log('status ImageSend', res);
          navigate(-1);
        } else {
          console.log('Faild ImageSend');
        }
      }
    }
  };
  const Tobegin = () => {
    console.log("I'm here");
    navigate(-1);
    dispatch(clearHistory());
  };

  return (
    <div className="w-full flex flex-col  py-2 text-center">
      <form
        className={classNames(
          'text-justify bg-white rounded-3xl  mt-1 text-[14px] leading-5 font-sans '
        )}
      >
        <p className="text-2xl ml-2 text-gray-500 mt-2 ">
          <b> IMPORTANT INFORMATION</b>
        </p>
        <div className=" leading-8">
          <p className="mt-1 bg-gray-200 rounded-lg p-2">
            <input
              // onClick={handleClick_Check1}
              onChange={handleClick_Check1}
              checked={checked1}
              type="checkbox"
              className="cursor-pointer"
            />{' '}
            I understand that I am providing written instructions to{' '}
            <b>{dealerName}</b> under the Fair Credit Reporting Act. This
            authorization allows <b>{dealerName}</b> to access my personal
            credit profile and any additional documentation I provide. I
            authorize <b>{dealerName}</b> to use this information solely for the
            purpose of prequalifying my request for financing with any of{' '}
            <b>{dealerName}</b>&apos;s available lenders.
          </p>
          <div className="mt-2 bg-gray-200 rounded-lg p-2">
            <p>
              <input
                // onClick={handleClick_Check2}
                onChange={handleClick_Check2}
                checked={checked2}
                type="checkbox"
                className="cursor-pointer"
              />
              Please note, this is not an automated system. One of our
              representatives will personally review your information to ensure
              the best results. Due to this carefull review, there may be a
              delay in providing you with pre-qualification offers. However, we
              will contact you by the next business day.
            </p>
          </div>
          <p>
            Please read our{' '}
            <a
              href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Private Notice
            </a>{' '}
            ,{' '}
            <a
              href="https://www.credit-apps.com/privacy/"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Private Policy
            </a>{' '}
            , and{' '}
            <a
              href="https://www.credit-apps.com/terms/"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              End User Terms of Use
            </a>{' '}
            by clicking the links provided. If you would like to opt-out of
            having your information shared at all, please do so now by clicking
            <span onClick={Tobegin} className="cursor-pointer text-blue-600">
              here
            </span>{' '}
            and exiting the application.
          </p>
          <div className="bg-gray-200 rounded-lg p-2 mt-2">
            <p>
              <input
                // onClick={handleClick_Check3}
                checked={checked3}
                onChange={handleClick_Check3}
                type="checkbox"
                className="cursor-pointer"
              />{' '}
              I acknowledge that I have read, understand, and agree to be bound
              by the{' '}
              <a
                href="https://www.credit-apps.com/terms/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                End User Terms of Use
              </a>{' '}
              and{' '}
              <a
                href="https://www.credit-apps.com/privacy/"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {' '}
                Privacy Policy
              </a>{' '}
              . I consent to having the information I provided to {
                dealerName
              }{' '}
              shared with lenders accordingly. Additionally, I understand that
              if I receive a prequalified offer from any of {dealerName}&apos;s
              lenders, they will perform a hard inquiry, which may impact my
              credit history.
            </p>
          </div>
        </div>
        <p className=" text-[20px] mt-6 text-center text-[#854fff]">
          Please sign on drawbox. it will act as your digital signature.
        </p>
        <div className="w-full mt-2 h-[18vh] flex justify-center ">
          <div className="w-full flex ">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseUp={finishDrawing}
              onMouseMove={draw}
              onMouseOut={finishDrawing}
            />
          </div>
        </div>

        <div className="text-center pt-4 flex flex-col items-center">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-[#854fff] w-full p-2 rounded-lg text-white text-3xl hover:bg-purple-800"
          >
            Submit
          </button>
          <div className="mt-2">
            {viewCaptch && (
              <ReCAPTCHA sitekey={Site_key} onChange={handleCaptchaChange} />
            )}
          </div>
        </div>
      </form>
    </div>
  );
};
export default ThirdPage;
