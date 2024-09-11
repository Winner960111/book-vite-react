import { useState, useEffect, useRef, useCallback } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { classNames } from '../../../utils';
import { signatureImg } from '../../../api/index';
import './Canvas.css';
import { clearHistory, setSubmit } from '../../../store/reducers/checker';
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
      dispatch(setSubmit(true));
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
  };
  const Tobegin = () => {
    console.log("I'm here");
    navigate(-1);
    dispatch(clearHistory());
  };

  return (
    <div className="w-full flex flex-col  py-2 px-6 text-center">
      <form
        className={classNames(
          'text-justify bg-white rounded-3xl  mt-1 text-[14px] leading-5 font-sans '
        )}
      ><div className=''>

        <p className="mt-1">
          We are committed to protecting your privacy. The information that you
          provided is only shared with the dealership to assess your credit
          history and not otherwise sold, marketed, or distributed in any way by{' '}
          {dealerName}.
        </p>
        <div className=" rounded-3xl mt-2">
          <p>
            Please click{' '}
            <a
              href="https://d2i2zqim3ahl97.cloudfront.net/home/Credit-AppsPrivacyNotice.pdf"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{' '}
            to read our Privacy Notice and click{' '}
            <a
              href="https://www.credit-apps.com/privacy/"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>{' '}
            to read our full Privacy Policy. If you would like to opt-out of
            having your information shared at all, please do so now by clicking{' '}
            <span onClick={Tobegin} className="cursor-pointer text-blue-600">
              here
            </span>{' '}
            and exiting the application.
          </p>
          <span
            // onClick={() => setReadStatePara1(!readStatePara1)}
            className={'text-blue-600 text-md hover:underline cursor-pointer'}
          >
            {/* {readStatePara1 == false ? 'More' : 'Less'} */}
          </span>
        </div>
        <div className="rounded-3xl mt-2">
          <p
          // className={
          //   readStatePara2 == false
          //     ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
          //     : null
          // }
          >
            By typing my name and clicking submit, I authorize {dealerName} to
            investigate my credit history solely to determine the best available
            offers to fund my loan, I also acknowledge that I have read,
            understand, and agree to be bound by our End User{' '}
            <a
              href="https://www.credit-apps.com/terms/"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms of use
            </a>{' '}
            and our{' '}
            <a
              href="https://www.credit-apps.com/privacy/"
              style={{ color: 'blue' }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              Privacy Policy
            </a>{' '}
            and agree to have the information that I provided shared with
            lenders in accordance therewith. I also understand that if a
            prequalified offer is found by any of our lenders, they will perform
            a hard inquiry which can impact my credit history.
          </p>
          <span
            className={'text-blue-600 text-sm hover:underline cursor-pointer'}
          ></span>
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
