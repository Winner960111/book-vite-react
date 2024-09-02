import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { identifyInfo } from '../../../api/index';

const SecondPage = () => {
  const { identifyId } = useSelector((state) => state.checker);
  const [url, setURL] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);
  useEffect(() => {
    ('useEffect===>');
    identifyInfo(identifyId).then((res) => {
      setURL(res.docupass_link);
    });
  }, []);

  const handleLoad = useCallback((event) => {
    const iframe = event.target;
    try {
      const url = new URL(iframe.contentWindow.location.href);
      if (url.pathname === '/verificatoin_sucess') {
        setVerificationStatus('success');
      } else if (url.pathname === '/verification_failed') {
        setVerificationStatus('failed');
      }
    } catch (error) {
      console.error('Error accessing iframe URL:', error);
    }
  }, []);

  return (
    <div className="flex bg-gray-50 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20 justify-center items-center">
        <p className="w-[70%] text-4xl text-black my-3 font-medium">
          Verify your identity.
        </p>
        <form
          className={classNames(
            ' w-[70%] text-justify bg-white rounded-3xl p-8 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
          )}
        >
          {verificationStatus === null ? (
            <iframe
              src={url}
              title="Embedded Content"
              width="100%"
              height="500"
              onLoad={handleLoad}
            />
          ) : verificationStatus === 'success' ? (
            'thi is success ++++'
          ) : (
            'this is failed _______'
          )}
        </form>
      </div>
    </div>
  );
};
export default SecondPage;
