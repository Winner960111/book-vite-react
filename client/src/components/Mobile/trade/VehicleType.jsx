import { useState, useEffect } from 'react';
import BotIcon from './BotIcon';
import { useDispatch, useSelector, } from 'react-redux';
import { classNames } from '../../../utils';
import {
  addHistory,
  setVehicleType,
  removeHistory,

} from '../../../store/reducers/checker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MdModeEditOutline } from "react-icons/md";

const VehicleType = () => {
  const {
    step,
    vehicleType,
    history,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  // const [vehicles, setVehicles] = useState([])
  const [select, setSelect] = useState('')
  const [error, setError] = useState('');
  const vehicles = ["BOAT", "CAR", "TRUCK", "ATV"]

  // const vehicleListGet = async () => {
  //   const vehicleLists = await vehicleList(dealer_id)
  //   setVehicles(vehicleLists.data.sold_by_dealer)
  // }
  useEffect(() => {
    setError('');
    setSelect('');
  }, [step]);

  // useEffect(() => {
  //   vehicleListGet()
  // }, [])

  const editFunction = () => {
    dispatch(removeHistory())
  }

  const handleSubmit = async () => {
    if (!select) {
      setError('*Required')
    }
    else {
      dispatch(setVehicleType(select))
      dispatch(addHistory(true));
    }
  }
  const renderDescription = () => (
    <>
      <BotIcon />
      <div
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 5 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="flex flex-col md:flex-row md:items-center"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          <FormControl variant="filled" sx={{ minWidth: 120, width: '100%' }}>
            <InputLabel id="demo-simple-select-standard-label" style={{ fontSize: '15px' }}>Type</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={select}
              onChange={(e) => setSelect(e.target.value)}
            >
              {vehicles.map((item, index) => (
                <MenuItem key={index} value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
          {error !== '' ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4">
          What vehicle are you interested in?
        </p>
        <button
          type="button"
          onClick={handleSubmit}
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 5 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </div>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white relative">
        {vehicleType}
<MdModeEditOutline style={{ color: 'white', fontSize: ' 15px' }} onClick={editFunction} className='cursor-pointer absolute right-2' />

      </div>
    </div>
  );

  return (
    <>
      {step > 3 ? (
        <>
          {history[4] == true ? (
            <>
              {renderDescription()}
              {renderReply()}
            </>
          ) : (
            renderDescription()
          )}
        </>
      ) : null}
    </>
  );
};
export default VehicleType;
