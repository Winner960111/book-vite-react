import { useState, useEffect } from 'react';
import { addHistory } from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckerFirstName } from '../../../store/reducers/checker';

const FirstPage = () => {
  const { step } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [error, setError] = useState({
    first_name: '',
    last_name: '',
    birth_day: '',
    email: '',
    ssn: '',
  });
  const [firstName, setFirstName] = useState();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setError({
      first_name: '',
    });
  };

  useEffect(() => {
    setError({});
  }, [step]);

  const handlesubmit = () => {
    if (!firstName.trim()) {
      setError({ first_name: 'The first name field is required' });
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setError({ first_name: 'The first name contains only characters' });
    } else {
      dispatch(addHistory(true));
      dispatch(setCheckerFirstName(firstName));
      setFirstName('');
    }
  };
  return (
    <>
      <div className="flex bg-gray-100 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-10 mx-20">
          <p className="w-2/3 text-4xl text-black my-3 font-medium">
            We need to your some information
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center">
            <div className="w-full p-5 flex justify-between">
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                autoFocus
                placeholder="First Name"
                type="text"
                value={firstName}
                onChange={handleFirstName}
              />
              {error['firstName'] !== '' ? (
                <p className="text-red-500 pl-2">{error['first_name']}</p>
              ) : null}
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Middle Initial(optional)"
                type="text"
              />
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Last Name"
                type="text"
              />
            </div>
            <div className="w-full flex p-5 justify-between">
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Birthday"
                type="text"
              />
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Email Address"
                type="text"
              />
              <input
                className="w-full h-20 rounded-md text-center text-2xl border-2 my-3 mx-5"
                id="autocomplete"
                placeholder="Social security number"
                type="text"
              />
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-1/4 h-20 p-2 mx-5 rounded-lg text-white text-xl  hover:bg-purple-800"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default FirstPage;
