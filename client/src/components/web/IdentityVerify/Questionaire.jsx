/* eslint-disable react/prop-types */
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';

const Questionaire = ({ question, answer }) => {
  const [answerItem, setAnswerItem] = useState('');
  useEffect(() => {
    if (answerItem) {
      return answer(answerItem);
    }
  }, [answerItem]);
  return (
    <>
      <p className="text-2xl my-2">{question.question}</p>
      <FormControl variant="filled" sx={{ my: 1, width: '100%' }}>
        <InputLabel
          id="demo-simple-select-standard-label"
          style={{ fontSize: '20px' }}
        >
          Select correct answer
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={answerItem}
          onChange={(e) => {
              setAnswerItem(e.target.value);
          }}
          style={{ fontSize: '20px' }}
        >
          {question.answer.map((item, index) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
export default Questionaire;
