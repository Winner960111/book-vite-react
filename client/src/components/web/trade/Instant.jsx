import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addHistory,
  setInstantMake,
  setInstantModel,
  setInstantYear,
} from '../../../store/reducers/checker';
import { instantInfo } from '../../../api/index';

const Instant = () => {
  const [vinState, setVinState] = useState(true);
  const [makeState, setMakeState] = useState(false);
  const [vin, setVin] = useState('');
  const [make, setMake] = useState('');
  const [year, setYear] = useState(null);
  const [model, setModel] = useState('');
  const { dealerId } = useSelector((state) => state.checker);
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  useEffect(() => {
    setError('');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (vinState) {
      if (!vin) {
        setError('Please fill in the input field');
      } else {
        const data = {
          dealer_id: dealerId,
          vin: vin,
        };
        const res = await instantInfo(data);
        console.log('response is =>', res);
        if (res.status === 201) {
          dispatch(setInstantMake(res.data.make));
          dispatch(setInstantModel(res.data.model));
          dispatch(setInstantYear(res.data.year));
          dispatch(addHistory(true));
        } else res;
      }
    } else if (makeState) {
        if (make && year && model) {
          dispatch(setInstantMake(make));
          dispatch(setInstantModel(model));
          dispatch(setInstantYear(year));
        dispatch(addHistory(true));
      } else {
        setError('Please fill in the input field');
      }
    }
  };
  const handleInputVin = (e) => {
    setVin(e.target.value);
    setError('');
  };

  const changeVin = () => {
    setVinState(true);
    setMakeState(false);
  };

  const changeMake = () => {
    setVinState(false);
    setMakeState(true);
  };

  const handleInputYear = (e) => {
    setYear(e.target.value);
    setError('');
  };
  const handleInputMake = (e) => {
    setMake(e.target.value);
    setError('');
  };

  const handleInputModel = (e) => {
    setModel(e.target.value);
    setError('');
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        <p className="w-2/6 text-4xl text-black my-3 mt-36 font-medium">
          <b>Get an instant offer in minute</b>
        </p>
        <form
          onSubmit={handleSubmit}
          className={
            ' w-2/6 text-justify bg-white rounded-3xl p-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg mt-4 font-sans'
          }
        >
          <div className="flex w-full mt-10 justify-center">
            <button
              type="button"
              onClick={() => {
                changeVin();
              }}
              className={
                vinState
                  ? 'bg-gray-100 mx-5 px-6 py-2 border-b-4 border-[#854fff] border-solid'
                  : 'bg-gray-100 mx-5 px-6 py-2'
              }
            >
              By VIN
            </button>
            <button
              type="button"
              onClick={() => {
                changeMake();
              }}
              className={
                makeState
                  ? 'bg-gray-100 mx-5 px-6 py-2 border-b-4 border-[#854fff] border-solid'
                  : 'bg-gray-100 mx-5 px-6 py-2'
              }
            >
              By MAKE
            </button>
          </div>

          {vinState && (
            <>
              <div className="py-2 flex flex-col items-center">
                <input
                  type="text"
                  className="w-full h-20 rounded-md text-center text-sm md:text-lg border my-5"
                  autoFocus
                  placeholder="VIN"
                  value={vin}
                  onChange={(e) => {
                    handleInputVin(e);
                  }}
                />
                {error !== '' ? (
                  <p className="text-red-500 pl-2 text-sm">{error}</p>
                ) : null}
              </div>
              <button
                type="submit"
                className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
              >
                Save Vehicle
              </button>
            </>
          )}
          {makeState && (
            <>
              <div className="py-2 flex flex-col items-center">
                <input
                  type="number"
                  className="w-full h-20 rounded-md text-center text-sm md:text-lg border mt-5"
                  autoFocus
                  placeholder="Year"
                  value={year}
                  onChange={(e) => {
                    handleInputYear(e);
                  }}
                />
              </div>
              <div className="py-2 flex flex-col items-center">
                <input
                  type="text"
                  className="w-full h-20 rounded-md text-center text-sm md:text-lg border"
                  autoFocus
                  placeholder="Make"
                  value={make}
                  onChange={(e) => {
                    handleInputMake(e);
                  }}
                />
              </div>
              <div className="py-2 flex flex-col items-center">
                <input
                  type="text"
                  className="w-full h-20 rounded-md text-center text-sm md:text-lg border"
                  autoFocus
                  placeholder="Model"
                  value={model}
                  onChange={(e) => {
                    handleInputModel(e);
                  }}
                />
              </div>
              {error !== '' ? (
                <p className="text-red-500 pl-2 text-sm">{error}</p>
              ) : null}
              <button
                type="submit"
                className="bg-[#854fff] w-full h-20 px-2 py-1 rounded-2xl text-white text-lg my-8 hover:bg-purple-800"
              >
                Save Vehicle
              </button>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default Instant;
