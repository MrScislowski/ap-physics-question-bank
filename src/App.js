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


const filterQuestions = (allQuestions, selectedTopics) => {
  const result = [];
  for (let question of allQuestions) {
    for (let topic of question.topics) {
      if (selectedTopics.includes(topic)) {
        result.push(question);
        break;
      }
    }
  }
  return result;
}


function App() {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const filteredQuestions = filterQuestions(questionList, selectedTopics);

  return (
    <>
    <form onSubmit={(event) => {event.preventDefault()}}>
      <input 
        value={selectedTopics} 
        onChange={(event) => 
        setSelectedTopics(event.target.value.split(",").map(el => el.trim()))} />
      <button type="submit">Re-load</button>
    </form>

    <QuestionSet questionList={filteredQuestions} />
    </>
  );
}

const getFilteredQuestions = () => {
  const result = [];
  for (let question of questionList) {

  }
}

export default App;
