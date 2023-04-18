import { useState } from 'react';
import { QuestionSet } from './QuestionSet';


// https://stackoverflow.com/questions/58524990/react-relative-imports-outside-of-src-are-not-supported
const questionList = require("./assets/Categorization.json")
const topicList = require("./assets/APTopicNames.json")

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
  const [checkboxesState, setCheckboxesState] = useState(new Array(topicList.length).fill(false));
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [additionalTopics, setAdditionalTopics] = useState([]);

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkboxesState.map((item, index) => 
    index === position ? !item : item);
    setCheckboxesState(updatedCheckedState);
  }

  const filteredQuestions = filterQuestions(questionList, selectedTopics, additionalTopics);

  return (
    <>
      {topicList.map((topicInfo, index) => {
        return (
          <li key={`custom-checkbox-${index}`}>
          <input
            type="checkbox"
            id={`custom-checkbox-${index}`}
            name={topicInfo["TopicDescription"]}
            value={topicInfo["ApTopicId"]}
            checked={checkboxesState[index]}
            onChange={() =>
              handleCheckboxChange(index)} 
          />
          <label htmlFor={`custom-checkbox-${index}`}>{`${topicInfo["ApTopicId"]} - ${topicInfo["TopicDescription"]}`}</label>
          </li>
        )
        
      })}
      <QuestionSet questionList={filteredQuestions} />
    </>
  );
}


export default App;
