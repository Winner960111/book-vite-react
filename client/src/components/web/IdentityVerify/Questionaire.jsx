/* eslint-disable react/prop-types */
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

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
      <div className="w-full flex justify-between bg-gray-50 items-center py-5 px-2 mt-2 rounded-xl">
        <FormControl style={{ width: '100%' }}>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            style={{ padding: '0 5px', fontSize: '25px', margin: '0 15px' }}
          >
            {question.questionText}
          </FormLabel>

          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{
              margin: '10px 0 0 30px',
              display: 'flex',
              flexWrap: 'wrap',
            }}
            onChange={(e) => {
              setAnswerItem(e.target.value);
            }}
          >
            {question.choices.map((item, key) => (
              <>
                <div className="hover:bg-violet-200 border-[1px] border-gray-300 border-solid rounded-xl py-1 px-2 m-1">
                  <FormControlLabel
                    key={key}
                    value={item.choiceText}
                    control={<Radio />}
                    label={item.choiceText}
                  />
                </div>
              </>
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
};
export default Questionaire;
