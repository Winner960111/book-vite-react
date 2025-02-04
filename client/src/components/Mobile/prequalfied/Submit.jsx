import { useState, useEffect, useRef, useCallback } from 'react';
import BotIcon from './BotIcon';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { signatureImg } from '../../../api/index';
import './Canvas.css';

const Submit = () => {
  const dispatch = useDispatch();
  const {
    step,
    history,
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

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [readStatePara1, setReadStatePara1] = useState(false);
  const [readStatePara2, setReadStatePara2] = useState(false);
  const [loading, setLoading] = useState(false);


  const handleResize = () => {
    // Rerun your code to set canvas size based on the new dimensions
    console.log('web and mobile situation is exchanged.');
    prepareCanvas();
  };

  const clearCanvas = () => {
    // Clear the canvas when clicked
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
      first_name: checkerFirstName,
      middle_name: checkerMiddleName,
      last_name: checkerLastName,
      email: checkerEmail,
      mobile_phone: checkerMobileNumber,
      status: "Opportunity",
      source: "Short",
      interested_in: "",
      ssn: checkerSocialNumber,
      dob: checkerBirthday,
      performed_by: "Customer",
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
      dispatch(addHistory(true));
      setLoading(false)
    } else {
      console.log('Faild ImageSend');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step > 10 ? 'text-slate-400' : 'text-slate-800'
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
            {step == 10 ? (
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
            {step == 10 ? (
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
            {step == 10 ? (
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
              step == 10
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
            {step == 10 ? (
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
            {step == 10 ? (
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
              step == 10
                ? 'text-blue-600 text-sm hover:underline cursor-pointer'
                : null
            }
          >
            {readStatePara2 == false ? 'More' : 'Less'}
          </span>
        </div>

        <div
          className="flex relative md:flex-row md:items-center mt-2"
          style={step >= 11 ? { display: 'none' } : { display: 'block' }}
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
          <img src="/refresh-button.png" alt="png" className='absolute top-2 right-2 w-6 active:background-black' onClick={clearCanvas} />
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please sign in above input field. it will act as your digital
          signature.
        </p>
        <button
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md px-16 py-4 text-black hover:bg-black hover:text-white font-medium text-lg mt-2"
          style={step >= 11 ? { display: 'none' } : { display: 'block' }}
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
      {step > 9 ? (
        <>
          {renderDescription()}
          {history[10] == true ? renderReply() : null}
        </>
      ) : null}
    </>
  );
};
export default Submit;
