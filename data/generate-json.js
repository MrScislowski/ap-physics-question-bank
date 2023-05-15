
// package options:
// csv-parser
// csv
// papa-parse

// https://stackoverflow.com/questions/41776978/how-to-read-csv-file-in-node-js

// import fs from "fs";
const fs = require("fs");
// import parse from "csv-parse";
const parser = require("csv-parse");



async function readCategorizationData() {
  return new Promise((resolve, reject) => {
    fs.readFile("Categorization.csv", 'utf8', (err, fileData) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      parser.parse(fileData, { columns: false, trim: true }, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        // 'rows' is the entire data structure, and looks something like this:
        // [
        //   [ 'Filename', 'Category' ],
        //   [ '00Q1a.png', '1.2' ],
        //   [ '00Q1b.png', '1.2' ],
        //   [ '00Q1c.png', '1.2' ],
        //   [ '00Q1d.png', '1.2' ],
        //   [ '00Q1e.png', '1.1, 4.1' ],
        //   ...
        // ]
        const data = [];
        for (let curRow of rows.slice(1)) {
          const actualFilename = curRow[0];
          const filenameRe = new RegExp("([0-9]{2}[B]?)Q([1-9])([a-z]).png");
          const filenameMatches = filenameRe.exec(actualFilename);
          if (!filenameMatches) {
            console.log(`filename matches failed on filename ${actualFilename}`)
          } else {
            const topics = curRow[1].split(",").map(el => el.trim());
            const curRecord = {
              "year": filenameMatches[1],
              "question": filenameMatches[2],
              "part": filenameMatches[3],
              "topics": topics,
              "filename": actualFilename,
            };
            data.push(curRecord);
          }
        }
        resolve(data);
      })
    })
  })
}

async function readTopicData() {
  return new Promise((resolve, reject) => {
    fs.readFile("APTopicNames.csv", 'utf8', (err, fileData) => {
      if (err) {
        console.log(err);
        reject(err);
      }
      parser.parse(fileData, { columns: false, trim: true }, (err, rows) => {
        if (err) {
          console.log(err);
          reject(err);
        }

        const data = [];
        for (let curRow of rows.slice(1)) {
          const curRecord = {
            "ApTopicId": curRow[0],
            "TopicDescription": curRow[1],
          };
          data.push(curRecord);
        }
        resolve(data);
      })
    })
  })
}

// readCategorizationData()
// .then(result => {
//   fs.writeFile("../src/assets/Categorization.json", JSON.stringify(result, null, "  "), (err) => {
//     console.log('Check contents of ~/src/assets/Categorization.json');
//   });
// })

// readTopicData()
// .then(result => {
//   fs.writeFile("../src/assets/APTopicNames.json", JSON.stringify(result, null, "  "), (err) => {
//     console.log('Check contents of ~/src/assets/APTopicNames.json');
//   });
// })

const rawQuestionList = require("../src/assets/Categorization.json");

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
    fs.readdirSync("./ocr")
    .filter(filename => filename.includes(".txt"))
    .map(filename => addSingleOCRToCategorization("./ocr/" + filename, rawQuestionList))
  )
}

addAllOCRData()
.then(response => {
  fs.writeFile("../src/assets/FullCategorization.json", JSON.stringify(rawQuestionList, null, "  "), (err) => {
    console.log('Check contents of ~/src/assets/Categorization.json');
  });
});
