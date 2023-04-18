import { useState } from 'react';
import { QuestionSet } from './QuestionSet';


// https://stackoverflow.com/questions/58524990/react-relative-imports-outside-of-src-are-not-supported
const questionList = require("./assets/Categorization.json")
const topicList = require("./assets/APTopicNames.json")

const filterQuestions = (allQuestions, selectedTopicIds) => {
  const result = allQuestions.filter(question => {
    for (let topic of selectedTopicIds) {
      if (question.topics.includes(topic)) {
        return true;
      }
    }
    return false;
  });

  return result;
}

function App() {
  const [checkboxesState, setCheckboxesState] = useState(new Array(topicList.length).fill(false));

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkboxesState.map((item, index) => 
    index === position ? !item : item);
    setCheckboxesState(updatedCheckedState);
  }

  const selectedTopics = topicList.filter((element, index) => checkboxesState[index] === true);
  const filteredQuestions = filterQuestions(questionList, 
    selectedTopics.map(el => el.ApTopicId));

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
