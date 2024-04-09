import { useState, useEffect } from 'react';
import { addHistory, setRefRelation, setRefCity} from '../../../store/reducers/checker';
import { useDispatch, useSelector } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const FirstPage = () => {
  const {
    step,
    customerName,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [relation, setRelation] = useState('')
  const [errorRelation, setErrorRelation] = useState('')
  const [city, setCity] = useState('')
  const [errorCity, setErrorCity] = useState('')
  
  const handleCity = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      setCity(base64String)
    };

    reader.readAsDataURL(file);
    setErrorCity('');
  };
  const handleRelation = (e) => {
    setRelation(e.target.value);
    setErrorRelation('');
  };
  useEffect(() => {
    setErrorRelation('');
    setErrorCity('');
  }, [step]);

  const handlesubmit = async () => {
    let pass = 0;

    if (!city) {
      setErrorCity('*Required');
    } else {
      pass += 1;
    }

    if (!relation) {
      setErrorRelation('*Required');
    } else {
      pass += 1;
    }
    if (pass == 2) {
      dispatch(setRefRelation(relation));
      dispatch(setRefCity(city));
      dispatch(addHistory(true));
    }
  };

  return (
    <>
      <div className="flex bg-gray-50 w-full justify-center items-center">
        <div className=" w-2/3 flex flex-col mt-28 mx-20">
          <p className="w-full text-3xl my-3 font-medium">
            Hi, <b>{customerName}</b> thanks for coming back, please select the
            document type and upload it.
          </p>
          <div className="w-full text-justify bg-white rounded-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg flex flex-col items-center font-sans">
            <div className="w-full p-5 flex justify-between flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-[45%] mt-4 md:mx-5">
                <FormControl variant="filled" sx={{ my: 1, minwidth: 120 }}>
                  <InputLabel
                    id="demo-simple-select-standard-label"
                    style={{ fontSize: '15px' }}
                  >
                    Document Type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={relation}
                    onChange={handleRelation}
                  >
                    <MenuItem value={'Credit Athorization'}>
                      Credit Athorization
                    </MenuItem>
                    <MenuItem value={'Driver License'}>Driver License</MenuItem>
                    <MenuItem value={'Proof Of Income'}>
                      Proof Of Income
                    </MenuItem>
                    <MenuItem value={'Proof Of Identity'}>
                      Proof Of Identity
                    </MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
                </FormControl>
                {errorRelation !== '' && (
                  <p className="text-red-500 pl-2">{errorRelation}</p>
                )}
              </div>
              <div className="flex flex-col w-full md:w-[55%] my-3 md:mx-5">
                <div className="flex flex-row w-full">
                  <input
                    accept=".pdf,.png,.jpeg"
                    onChange={handleCity}
                    type="file"
                    hidden
                    id="upload"
                  />
                  <label
                    htmlFor="upload"
                    className="bg-[#854fff] w-full md:w-[30%] md:mx-4 rounded-lg text-white text-xl text-center hover:bg-purple-800 p-3 mt-4"
                  >
                    Upload
                  </label>
                  <div className="bg-gray-100 w-full md:w-[70%] rounded-lg text-black text-xl p-3 mt-4 overflow-hidden">
                    {city}
                  </div>
                </div>
                {errorCity !== '' && (
                  <p className="text-red-500 pl-2">{errorCity}</p>
                )}
              </div>
            </div>
            <div className="w-full p-5 flex justify-end">
              <button
                type="button"
                onClick={handlesubmit}
                className="bg-[#854fff] w-full md:w-[30%] h-16 md:mx-4 rounded-lg text-white text-xl  hover:bg-purple-800"
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
