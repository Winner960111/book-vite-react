import { useCallback, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import ReactGA from 'react-ga4';

// page component
import Home from './pages/Home';
import WebHome from './pages/WebHome';
import Prequalified from './pages/Prequalified';
import Quote from './pages/Quote';
import WebQuote from './pages/WebQuote';
import TradeIn from './pages/TradeIn';
import Full from './pages/Full';
import Appointment from './pages/Appointment';
import WebPrequalified from './pages/WebPrequalified';
import WebPrequalifiedLanding from './pages/WebPrequalifiedLanding';
import WebTrade from './pages/WebTrade';
import { detectAgent } from './api';
import { setRenderType } from './store/reducers/checker';
import Loading from './components/common/Loading';
import WebFullApp from './pages/WebFullApp';
import WebAppointment from './pages/WebAppointment';
import WebCheckApp from './pages/WebCheckApp';
import CheckApp from './pages/CheckApp';
import WebReference from './pages/WebReference';
import Reference from './pages/Reference';
import WebReferenceDoc from './pages/WebReferenceDoc';
import ReferenceDoc from './pages/ReferenceDoc';
import WebIdentityVerify from './pages/WebIdentityVerify';
import WebImages from './pages/WebImages';
import Images from './pages/Images';
import WebFullAppLanding from './pages/WebFullappLanding';
import WebMessage from './pages/WebMessage';
import Message from './pages/Message';

const App = () => {
  const dispatch = useDispatch();
  const { type } = useSelector((state) => state.checker);
  const initialize = useCallback(() => {
    dispatch(detectAgent());
  }, [dispatch]);

  // const [measurementID, setMeasurementID] = useState('G-QR4D12VGLR');

  // Initialize Google Analytics with the current Measurement ID
  // useEffect(() => {
  //   ReactGA.initialize(measurementID);
  // }, []);

  // Function to update the Measurement ID
  // const updateMeasurementID = (newID) => {
  //   setMeasurementID(newID);
  // };

  useEffect(() => {
    if (window !== window.parent) {
      console.log('embedded in iframe or object');
      dispatch(setRenderType('iframe'));
    } else {
      console.log('not embedded or cross-origin');
      initialize();
    }
  }, [dispatch, initialize]);

  console.log('this is type===>', type);
  return (
    <>
      {<Loading loading={type === '' ? true : false} />}
      <Routes>
        <Route
          path="/info-checker/:dealer_id"
          element={type == 'web' ? <WebHome /> : <Home />}
        />
        <Route
          path={`/info-checker/:dealer_id/prequalified`}
          element={type == 'web' ? <WebPrequalified /> : <Prequalified info={"GET PREQUALIFIED"} />}
        />
        <Route
          path={`/info-checker/:dealer_id/prequalified-landing`}
          element={type == 'web' ? <WebPrequalifiedLanding /> : null}
        />
        <Route
          path="/info-checker/:dealer_id/quote"
          element={type == 'web' ? <WebQuote /> : <Quote info={"GET QUOTE"} />}
        />
        <Route
          path="/info-checker/:dealer_id/trade"
          element={type == 'web' ? <WebTrade /> : <TradeIn info = {"TRADE IN VALUE"}/>}
        />
        <Route
          path="/info-checker/:dealer_id/full"
          element={type == 'web' ? <WebFullApp /> : <Full info={"FULL CREDIT APPLICATION"} />}
        />
        <Route
          path="/info-checker/:dealer_id/full-landing"
          element={type == 'web' ? <WebFullAppLanding /> : <null />}
        />
        <Route
          path="/info-checker/:dealer_id/appointment"
          element={type == 'web' ? <WebAppointment /> : <Appointment info = {"APPOINTMENT"}/>}
        />
        <Route
          path="/info-checker/:dealer_id/message"
          element={type == 'web' ? <WebMessage /> : <Message info = {"MESSAGE DEALER"}/>}
        />
        <Route
          path="/info-checker/:dealer_id/check"
          element={type == 'web' ? <WebCheckApp /> : <CheckApp />}
        />
        <Route
          path="/info-checker/reference/:dealer_slug/:customer_slug"
          element={type == 'web' ? <WebReference /> : <Reference />}
        />
        <Route
          path="/trade_in_images/:dealer_slug/:customer_slug/:trade_id"
          element={type == 'web' ? <WebImages /> : <Images />}
        />
        <Route
          path="/info-checker/documents/:dealer_slug/:customer_slug"
          element={type == 'web' ? <WebReferenceDoc /> : <ReferenceDoc />}
        />
        <Route
          path="/verification/:dealer_slug/:customer_slug"
          element={type == 'web' ? <WebIdentityVerify /> : null}
        />
      </Routes>
    </>
  );
};

export default App;
