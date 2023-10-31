const Datasheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Data");
const Viewsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("View");

const DqNumCol = 'A';
const DqCol = 'B';
const DansCol = 'C';

function genQuestion(qNum) {
  const q = DqCol + qNum;
  const ans = DansCol + qNum;
  let qCellStr = Datasheet.getRange(q).getValue().split("\n");
  let qObj = {
    questionNum: qNum,
    question: '',
    choices: [],
    answer: ''
  };
  let qStr = "";

  for (let i = 0; i < qCellStr.length; i++) {
    if (qCellStr[i].match(/^[A-F]\./)) { // 첫 문자가 A., B., C., D. 중 하나인 경우. 다중 선택지면 regex 수정
      let choice = {};
      choice.option = qCellStr[i].charAt(0)
      choice.text= qCellStr[i].substring(2).trim();
      qObj.choices.push(choice);
    } else {
      qObj.question += qCellStr[i].trim();
    }
  }
  qObj.answer = Datasheet.getRange(ans).getValue(); // 답변을 가져옴

  return qObj;
}

//문제 수 바꿔주시고
const dump = []
for(let i = 1; i<=271; i++){
  dump.push(genQuestion(i))
}

// JSON 파일로 저장
const jsonDump = JSON.stringify(dump);
const fileName = "questions4.json"; // 파일 이름
const folder = DriveApp.getFolderById("1PUPgDw8CEdrfKColgoSMVdc5AINJkC9Z"); // 저장할 Google 드라이브 폴더 ID

folder.createFile(fileName, jsonDump, MimeType.PLAIN_TEXT);
