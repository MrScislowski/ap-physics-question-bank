import { fs } from "fs";

const rawQuestionList = require("./assets/Categorization.json");


const addSingleOCRToCategorization = (filename, categorizationData) => {
  return new Promise((resolve, reject) => {
    const filenameRegex = new RegExp("([0-9][0-9]B?)Q([1-9])([a-z]?).txt");
    if (!filenameRegex.test(filename)) {
      console.log(`Error: ${filename} does not match expected filename for OCR containing file`);
      reject(`Error: ${filename} does not match expected filename for OCR containing file`);
    }
    const matchObj = filenameRegex.exec(filename);
    const year = matchObj[1];
    const questionNumber = matchObj[2];
    let questionPart = matchObj[3];

    fs.readFile(`${filename}`, 'utf8', (err, ocrText) => {
      if (err) {
        console.log(err);
        console.log(`while processing ${filename}`)
        reject(err);
      }

      if (!questionPart) {
        questionPart = "a";
      }

      const selectedQuestionData = categorizationData.find(el => el.year === year &&
        el.question === questionNumber &&
        el.part === questionPart);

      if (!selectedQuestionData) {
        console.log(`can't find question corresponding to ${filename}`);
        reject(`can't find question corresponding to ${filename}`)
      }

      if (!selectedQuestionData["questionText"]) {
        selectedQuestionData["questionText"] = ocrText;
      } else {
        selectedQuestionData["questionText"] += "\n\n";
        selectedQuestionData["questionText"] += ocrText;
      }
      console.log(`Just added to ${filename}`)
      resolve(categorizationData);
    })
  })
}

const addAllOCRData = async () => {
  return Promise.all(
    fs.readdirSync(".")
    .filter(filename => filename.includes(".txt"))
    .map(filename => addSingleOCRToCategorization(filename, rawQuestionList))
  )
}

const questionList = await addAllOCRData();

module.exports = {
  questionList
} 
  