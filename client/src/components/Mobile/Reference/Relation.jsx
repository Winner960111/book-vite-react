import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BotIcon from './BotIcon';
import {
  addHistory,
  setRefRelation1,
} from '../../../store/reducers/checker';
import { classNames } from '../../../utils';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

const InputRelation = () => {
  const { step, history, refRelation1 } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();

  const [Relation, setRelation] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [step]);

  const handleChangeInput = (e) => {
    setRelation(e.target.value);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Relation.length === 0) {
      setError('The Relationship field is required');
    } else if (!/^[A-Za-z]+$/.test(Relation)) {
      setError('The Relationship contains only characters');
    } else {
      dispatch(addHistory(true));
      dispatch(setRefRelation1(Relation));
      setRelation('');
    }
  };

  const renderDescription = () => (
    <>
      <BotIcon />
      <form
        onSubmit={handleSubmit}
        className={classNames(
          'text-justify bg-white rounded-tr-3xl rounded-b-3xl p-4 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-sm md:text-lg',
          step >= 15 ? 'text-slate-400' : 'text-slate-800'
        )}
      >
        <div
          className="my-2 flex flex-col md:flex-row md:items-center"
          style={step >= 15 ? { display: 'none' } : { display: 'block' }}
        >
          <FormControl variant="filled" sx={{ my: 1, width: "100%" }}>
            <InputLabel
              id="demo-simple-select-standard-label"
              style={{ fontSize: '15px' }}
            >
              RelationShip
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={Relation}
              onChange={handleChangeInput}
            >
              <MenuItem value={'Spouse'}>Spouse</MenuItem>
              <MenuItem value={'Employeer'}>Employeer</MenuItem>
              <MenuItem value={'Relative'}>Relative</MenuItem>
              <MenuItem value={'Friend'}>Friend</MenuItem>
              <MenuItem value={'Other'}>Other</MenuItem>
            </Select>
          </FormControl>
          {error !== null ? <p className="text-red-500 pl-2">{error}</p> : null}
        </div>
        <p className="bg-gray-50 rounded-3xl p-4 mt-2">
          Please enter relationship with reference person.
        </p>
        <button
          type="submit"
          className="w-full border-black border-2 rounded-md text-black hover:bg-black hover:text-white font-medium text-2xl mt-2 py-4"
          style={step >= 15 ? { display: 'none' } : { display: 'block' }}
        >
          CONTINUE
        </button>
      </form>
    </>
  );

  const renderReply = () => (
    <div className="mt-4 flex justify-end text-lg">
      <div className="p-4 text-sm md:text-lg bg-slate-600 rounded-tl-xl rounded-b-xl text-white">
        {refRelation1}
      </div>
    </div>
  );

  return (
    <>
      {step > 13 ? (
        <>
          {history[14] == true ? (
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
export default InputRelation;
