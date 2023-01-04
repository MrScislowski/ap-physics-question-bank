
// package options:
// csv-parser
// csv
// papa-parse

// https://stackoverflow.com/questions/41776978/how-to-read-csv-file-in-node-js

// import fs from "fs";
const fs = require("fs");
// import parse from "csv-parse";
const parser = require("csv-parse");



function readCategorizationData() {
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
          const filenameRe = new RegExp("([0-9]{2}[B]?)Q([1-9])([a-z]).png");
          const filenameMatches = filenameRe.exec(curRow[0]);
          if (!filenameMatches) {
            console.log(`filename matches failed on filename ${curRow[0]}`)
          } else {
            const topics = curRow[1].split(",").map(el => el.trim());
            const curRecord = {
              "year": filenameMatches[1],
              "question": filenameMatches[2],
              "part": filenameMatches[3],
              "topics": topics,
            };
            data.push(curRecord);
          }
        }
        resolve(data);
      })
    })
  })
}

readCategorizationData()
.then(result => {
  fs.writeFile("Categorization.json", JSON.stringify(result, null, "  "), (err) => {
    console.log('Check contents of Categorization.json');
  });
})
