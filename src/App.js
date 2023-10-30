import data from "./AWS_SAA-C03_Dump.json"
import "./App.css";
import { useState, useEffect } from "react";


function App() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selected, setSelected] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isWarpOpened, setIsWarpOpened] = useState(false);

  const q = data[currentQuestion];
  const idx = currentQuestion + Number(1);

  useEffect(() => {
    setIsSubmitted(false);
    setIsCorrect(false);
    setSelected([]);
  }, [currentQuestion]);

  return (
    <div className="App">
      <p className="title">QuizDump</p>

      <div>
        <p>현재 문제: {idx}</p>

        <button onClick={() => isWarpOpened ? setIsWarpOpened(false) : setIsWarpOpened(true)}>문제 이동하기</button>

        {
          isWarpOpened &&
          <p>
            <input type="text" id="warpNum" placeholder="이동할 문제 번호 입력" defaultValue={currentQuestion + 1} />
            <button onClick={() => {
              let num = parseInt(document.getElementById('warpNum').value);
              if (parseInt(num) <= 0 || parseInt(num) > data.length || isNaN(parseInt(num))) {
                alert("범위를 벗어난 문제입니다. 최대: " + data.length + "문제")
              }
              else {
                setCurrentQuestion(num - 1);
              }
            }
            }>
              이동
            </button>
          </p>
        }


        <div>
          <div className="question">{q.question}</div>

          <div className="answerdiv">

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
                  <div className="answer">
                    <input type="checkbox" checked={isChecked} /> {c.option} : {c.text}
                  </div>
                </div>
              );
            })}
          </div>

        </div>


        <div className="aligncenter">
          <div>
            <button
              onClick={() => {
                if (selected.length === 0) {
                  alert("답을 선택해주세요.");
                  return;
                }

                setIsSubmitted(true);
                setIsCorrect(q.answer === selected.join(""));
                setScore(isCorrect ? score + 1 : score);
              }}
            >
              제출
            </button>
          </div>
          <div>
            {/* {isSubmitted && isCorrect&& <div>정답: {q.answer}</div>} */}
            <div>
              {isSubmitted && isCorrect && <div>정답입니다!</div>}
              {isSubmitted && !isCorrect && <div>오답입니다!</div>}
            </div>
          </div>
        </div>
        <div className="aligncenter">
          {currentQuestion !== 0 && <button className="nextQ" onClick={() => setCurrentQuestion(currentQuestion - 1)}> 이전 문제</button>}
          {currentQuestion <= data.length && <button className="prevQ" onClick={() => setCurrentQuestion(currentQuestion + 1)}> 다음 문제</button>}
        </div>
      </div>
    </div >);
}

export default App;
