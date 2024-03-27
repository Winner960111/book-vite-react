import { useCallback, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// page component
import Home from './pages/Home';
import WebHome from './pages/WebHome';
import Prequalified from './pages/Prequalified';
import Quote from './pages/Quote';
import WebQuote from './pages/WebQuote';
import TradeIn from './pages/TradeIn';
import Appointment from './pages/Appointment';
import WebPrequalified from './pages/WebPrequalified';
import WebTrade from './pages/WebTrade';
import { detectAgent } from './api';
import { setRenderType } from './store/reducers/checker';
import Loading from './components/common/Loading';
import WebFullApp from './pages/WebFullApp';
import WebAppointment from "./pages/WebAppointment"

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { type } = useSelector((state) => state.checker);

  const initialize = useCallback(() => {
    dispatch(detectAgent());
  }, [dispatch]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const source = queryParams.get('source');
    console.log('this is following', source);
    if (source == 'iframe') {
      console.log('iframe');
      dispatch(setRenderType(source));
    } else {
      initialize();
    }
  }, [dispatch, initialize]);

  // if (!type) return null;

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
          element={type == 'web' ? <WebPrequalified /> : <Prequalified />}
        />
        <Route
          path="/info-checker/:dealer_id/quote"
          element={type == 'web' ? <WebQuote /> : <Quote />}
        />
        <Route
          path="/info-checker/:dealer_id/trade"
          element={type == 'web' ? <WebTrade /> : <TradeIn />}
        />
        <Route
          path="/info-checker/:dealer_id/full"
          element={type == 'web' ? <WebFullApp /> : null}
        />
        <Route
          path="/info-checker/:dealer_id/appointment"
          element={type == 'web' ? <WebAppointment /> : <Appointment/>}
        />
      </Routes>
    </>
  );
};

export default App;
