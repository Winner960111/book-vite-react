import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory } from '../../../store/reducers/checker';
import Questionaire from '../../web/IdentityVerify/Questionaire';

const SecondPage = () => {
  const {
    dealerId,
    customerId,
    refRelation,
    refCity,
  } = useSelector((state) => state.checker);
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState({});
  const [answers, setAnswers] = useState([])
  const question = [{ "question": 'what is your name?', "answer": ["Alex", "HaoMing", "Alexis"] }, { "question": "what is your last occupation?", "answer": ["developer", "client", "assistant"] }, { "question": "Hou much salary do you expect for our company?", "answer":["700~900USD", "900~1100USD", "1100~1300USD"] }]

 
  useEffect(() => {
    let double = -1
    if (answer.ans) {
      if (answers.length) {
        for (var i = 0; i <= answers.length - 1; i++) {
          if (answers[i].questionID === answer.index) {
            double = i;
            break;
          }
        }
        if (double != -1) {
          console.log("I'm here")
          answers[double].answer = answer.ans
        } else {
          const newobject = {
            answer: answer.ans,
            questionID: answer.index,
          };
          setAnswers([...answers, newobject]);
        }
      } else {
        const newobject = {
          answer: answer.ans,
          questionID: answer.index,
        };
        setAnswers([...answers, newobject]);
      }
      
      
    }

  }, [answer])
    console.log('this is answers==>', answers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    dispatch(addHistory(true));

  };

  return (
    <div className="flex bg-gray-50 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20 justify-center items-center">
        <p className="w-[70%] text-4xl text-black my-3 font-medium">
          Please answer following questions.
        </p>
        <form
          className={classNames(
            ' w-[70%] text-justify bg-white rounded-3xl p-8 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
          )}
        >
          <div className="flex flex-col overflow-auto">
            {question.map((que, index) => (
              <Questionaire
                key={index}
                question={que}
                answer={(ans) => setAnswer({ ans, index })}
              />
            ))}
            
          </div>
          <div className="w-full mt-5 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              className="bg-[#854fff] w-2/6 h-16 p-2 rounded-lg text-white text-xl  hover:bg-purple-800"
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SecondPage;
