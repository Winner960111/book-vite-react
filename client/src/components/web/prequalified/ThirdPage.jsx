import { useState, useEffect, useRef, useCallback } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { signatureImg } from '../../../api/index';
import './Canvas.css';

const ThirdPage = () => {
  const dispatch = useDispatch();
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

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [readStatePara1, setReadStatePara1] = useState(false);
  const [readStatePara2, setReadStatePara2] = useState(false);

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
    };

    const res = await signatureImg(data);
    if (res.status == 201) {
      console.log('status ImageSend', res);
    } else {
      console.log('Faild ImageSend');
    }
  };

  return (
    <div className="flex bg-gray-100 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20">
        <p className="w-2/3 text-4xl text-black my-3 font-medium">
          Please Sign on DrawBox
        </p>
        <form
          className={classNames(
            'text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
          )}
        >
          <p className="bg-gray-100 rounded-3xl p-4 mt-2">
            We are committed to protecting your privacy. The information that
            you provided is only shared with the dealership to assess your
            credit history and not otherwise sold, marketed, or distributed in
            any way by {dealerName}.
          </p>
          <div className="bg-gray-100 rounded-3xl p-4 mt-2">
            <p
              onClick={() => setReadStatePara1(!readStatePara1)}
              className={
                readStatePara1 == false
                  ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                  : null
              }
            >
              Please click{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              to read our Privacy Notice and click{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              to read our full Privacy Policy. If you would like to opt-out of
              having your information shared at all, please do so now by
              clicking{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              and exiting the application.
            </p>
            <span
              onClick={() => setReadStatePara1(!readStatePara1)}
              className={'text-blue-600 text-sm hover:underline cursor-pointer'}
            >
              {readStatePara1 == false ? 'More' : 'Less'}
            </span>
          </div>
          <div className="bg-gray-100 rounded-3xl p-4 mt-2">
            <p
              className={
                readStatePara2 == false
                  ? 'w-full whitespace-nowrap text-ellipsis overflow-hidden'
                  : null
              }
            >
              By typing my name and clicking submit, I authorize {dealerName} to
              investigate my credit history solely to determine the best
              available offers to fund my loan, I also acknowledge that I have
              read, understand, and agree to be bound by our End User{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of use
              </a>
              and our{' '}
              <a
                href="https://www.credit-apps.com/static/home/Credit-AppsPrivacyNotice.pdf"
                style={{ color: 'blue' }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              and agree to have the information that I provided shared with
              lenders in accordance therewith. I also understand that if a
              prequalified offer is found by any of our lenders, they will
              perform a hard inquiry which can impact my credit history.
            </p>
            <span
              onClick={() => setReadStatePara2(!readStatePara2)}
              className={'text-blue-600 text-sm hover:underline cursor-pointer'}
            >
              {readStatePara2 == false ? 'More' : 'Less'}
            </span>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-3/5 w-full h-[200px] mt-2">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseOut={finishDrawing}
              />
            </div>
            <div className="md:w-2/5 w-full h-[200px] flex flex-col mt-2 mx-1 justify-between">
              <p className="bg-gray-100 rounded-3xl p-4">
                Please sign on drawbox. it will act as your digital signature.
              </p>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-[#854fff] w-full h-20 p-2 rounded-lg text-white text-xl  hover:bg-purple-800"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ThirdPage;
