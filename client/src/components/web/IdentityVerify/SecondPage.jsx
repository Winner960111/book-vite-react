import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from '../../../utils';
import { addHistory } from '../../../store/reducers/checker';
import Questionaire from '../../web/IdentityVerify/Questionaire';
import { identifyInfo, identification } from '../../../api/index';

const SecondPage = () => {
  const { identifyId, dealerId, customerId } = useSelector(
    (state) => state.checker
  );
  const dispatch = useDispatch();
  const [answer, setAnswer] = useState({});
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);
  const [temp_data, setTemp] = useState([]);

  useEffect(() => {
    ('useEffect===>');
    identifyInfo(identifyId).then((res) => {
      setQuestion(res.questions);
      setTemp(res);
    });
  }, []);
  ('thisisi data question ===>', question)(
    'thisisi data temp data ===>',
    temp_data
  );

  useEffect(() => {
    let double = -1;
    if (answer.ans) {
      if (answers.length) {
        for (var i = 0; i <= answers.length - 1; i++) {
          if (answers[i].questionID === answer.index) {
            double = i;
            break;
          }
        }
        if (double != -1) {
          ("I'm here");
          answers[double].answer = answer.ans;
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
  }, [answer])('this is answers==>', answers);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      dealer_id: dealerId,
      customer_id: customerId,
      kba_status: temp_data.kba_status,
      dl_status: temp_data.dl_status,
      questionAnswers: answers,
      completed: temp_data.completed,
    };

    const res = await identification(data, identifyId)(
      'this is status',
      res.status
    );
    if (res.status == 200) {
      ('Success');
      dispatch(addHistory(true));
    } else {
      ('failed');
    }
  };

  return (
    <div className="flex bg-gray-50 w-full justify-center items-center">
      <div className="w-2/3 flex flex-col mt-10 mx-20 justify-center items-center">
        <p className="w-full text-4xl text-black my-3 font-medium">
          Please answer following questions.
        </p>
        <form
          className={classNames(
            ' w-full text-justify bg-white rounded-3xl p-8 mt-4 shadow-[5px_5px_10px_rgba(0,0,0,0.3)] text-lg font-sans'
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
