import { useState } from 'react';
import { QuestionSet } from './QuestionSet';


// https://stackoverflow.com/questions/58524990/react-relative-imports-outside-of-src-are-not-supported
const questionList = require("./assets/Categorization.json")

const allTopics = new Set();
questionList.forEach(question => {
  question.topics.forEach(topic => {
    allTopics.add(topic);
  })
})


const filterQuestions = (allQuestions, selectedTopics, additionalTopics) => {
  const result = [];
  for (let question of allQuestions) {
    if (additionalTopics.map(topic => question.topics.includes(topic)).includes(false)) {
      // do nothing
    } else {
      for (let topic of question.topics) {
        if (selectedTopics.includes(topic)) {
          result.push(question);
          break;
        }
      }
    }
  }
  return result;
}


function App() {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [additionalTopics, setAdditionalTopics] = useState([]);

  const filteredQuestions = filterQuestions(questionList, selectedTopics, additionalTopics);

  return (
    <>
      <form onSubmit={(event) => { event.preventDefault() }}>
        <input
          value={selectedTopics}
          onChange={(event) =>
            setSelectedTopics(event.target.value.split(",").map(el => el.trim()))} />

        <input
          value={additionalTopics}
          onChange={(event) =>
            setAdditionalTopics(event.target.value.split(",").map(el => el.trim()))} />
      </form>

      <QuestionSet questionList={filteredQuestions} />
    </>
  );
}


export default App;
