import data from "./AWS_SAA-C03_Dump.json"
import { useState, useEffect } from "react";


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selected, setSelected] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState("");
  const q = data[currentQuestion];

  useEffect(() => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setAnswers("");
  }, [currentQuestion]);

  return (
    <div className="App">
      <p>QuizDump</p>

      <div>
        <p>현재 문제: {currentQuestion}</p>
        <div>
          <p>{q.question}</p>
          {q.choices.map((c, index) => {
            return (
              <div key={index} onClick={()=> {
                setSelected([...selected,c.option])}
              }>
                <p>{c.option} : {c.text}</p>
              </div>
            );
          })}

        </div>
        <div>
          <button
            onClick={() => {
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

          <button onClick={() => setCurrentQuestion(currentQuestion - 1)}>
            이전 문제
          </button>
          <button onClick={() => setCurrentQuestion(currentQuestion + 1)}>
            다음 문제
          </button>
        </div>
      </div>

    </div>);
}

export default App;
