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
  const [isRandom, setIsRandom] = useState(false);
  const [history, setHistory] = useState([]);
  const [O, setO] = useState([]);
  const [X, setX] = useState([]);
  const [ShowXBox, setShowXBox] = useState(false);

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

        <p>
          <input type="checkbox" id="random" onClick={() => isRandom ? setIsRandom(false) : setIsRandom(true)} />
          무작위로 문제 풀기
        </p>

        <p>
          <input type="checkbox" checked={ShowXBox} id="showXBox" onClick={() => ShowXBox ? setShowXBox(false) : setShowXBox(true)} />
          틀린문제 보기
          {
            ShowXBox && <div>
              <div className="XBox">
                <div className="XBoxContent">
                  {X.map((x, index) => {
                    return (
                      <button onClick={() => {
                        setCurrentQuestion(x);
                        setShowXBox(false);
                      }} key={index}>
                        {x + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          }
        </p>

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
                    setSelected(([...selected, c.option]).sort());
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
                isCorrect ? setO([...O, idx]) : setX([...X, idx]);
                setScore(isCorrect ? score + 1 : score);
                setHistory([...history, currentQuestion]);
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
          {currentQuestion !== 0 && <button className="prevQ" onClick={() => {
            setCurrentQuestion(history.pop());
          }

          }> 이전 문제</button>
          }

          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

          {currentQuestion <= data.length && <button className="nextQ" onClick={() => {
            if (isRandom) {
              setHistory([...history, currentQuestion]);
              let num = Math.floor(Math.random() * data.length);
              while (history.includes(num)) {
                num = Math.floor(Math.random() * data.length);
              }
              setCurrentQuestion(num);
            }
            else {
              setCurrentQuestion(currentQuestion + 1)
            }
          }
          }> 다음 문제</button>}
        </div>
      </div>
    </div >);
}

export default App;
