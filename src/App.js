import data from "./AWS_SAA-C03_Dump.json"
import { useState, useEffect } from "react";


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selected, setSelected] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState("");
  const q = data[currentQuestion];

  useEffect(() => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setAnswers("");
    setSelected([]);
  }, [currentQuestion]);

  return (
    <div className="App">
      <p>QuizDump</p>

      <div>
        <p>현재 문제: <textarea value={currentQuestion} onChange={
          (e) => {
            if (parseInt(e.target.value) <= 0 || parseInt(e.target.value) >= data.length || isNaN(parseInt(e.target.value))) {
              alert("범위를 벗어난 문제입니다.")
            }
            else setCurrentQuestion(parseInt(e.target.value))
          }

        }></textarea> </p>
        <div>
          <p>{q.question}</p>
          {q.choices.map((c, index) => {
            const isChecked = selected.includes(c.option);
            return (
              <div key={index} onClick={() => {
                if (isChecked) {
                  setSelected(selected.filter((option) => option !== c.option));
                } else {
                  setSelected([...selected, c.option]);
                }
              }}>
                <p>
                  <input type="checkbox" checked={isChecked} /> {c.option} : {c.text}
                </p>
              </div>
            );
          })}

        </div>
        <div>
          <button
            onClick={() => {
              if (selected.length === 0){
                alert("답을 선택해주세요.");
                return;
              }

              setIsSubmitted(true);
              setIsCorrect(q.answer === answers);
              setScore(isCorrect ? score + 1 : score);
            }}
          >
            제출
          </button><div>
            {isSubmitted && <p>정답: {q.answer}</p>}
            {isSubmitted && isCorrect && <p>정답입니다!</p>}
            {isSubmitted && !isCorrect && <p>오답입니다!</p>}
          </div>

          {currentQuestion !== 0 && <button onClick={() => setCurrentQuestion(currentQuestion - 1)}> 이전 문제</button>}
          {currentQuestion <= data.length && <button onClick={() => setCurrentQuestion(currentQuestion + 1)}> 다음 문제</button>}
        </div>
      </div>

    </div>);
}

export default App;
