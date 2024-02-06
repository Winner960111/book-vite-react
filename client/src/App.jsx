import { Routes, Route } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';

// page component
import Home from './pages/Home';
import WebHome from './pages/WebHome';
import Prequalified from './pages/Prequalified';
import Quote from './pages/Quote';
import WebQuote from './pages/WebQuote';
import WebPrequalified from './pages/WebPrequalified';



// redux store
import store from './store';

function App() {
  console.log(window.innerWidth)
  return (
    <ReduxProvider store={store}>
      <Routes>
        <Route
          exact
          path="/info-checker/:dealer_id"
          element={window.innerWidth >= '750' ? <WebHome /> : <Home />}
        />
        <Route
          path={`/info-checker/:dealer_id/prequalified`}
          element={<Prequalified />}
        />
        <Route path="/info-checker/:dealer_id/quote" element={<Quote />} />
        <Route
          path="/info-checker/:dealer_id/webquote"
          element={<WebQuote />}
        />
        <Route
          path="/info-checker/:dealer_id/webprequalified"
          element={<WebPrequalified />}
        />
      </Routes>
    </ReduxProvider>
  );
}

export default App;
