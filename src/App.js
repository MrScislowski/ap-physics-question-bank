import { useState } from 'react';
import { QuestionSet } from './QuestionSet';

import styled from 'styled-components';


// https://stackoverflow.com/questions/58524990/react-relative-imports-outside-of-src-are-not-supported
const questionList = require("./assets/Categorization.json")
const topicList = require("./assets/APTopicNames.json")

const filterQuestions = (allQuestions, selectedTopicIds, withContext) => {
  let result = [];
  if (!withContext) {
    result = allQuestions.filter(question => {
      for (let topic of selectedTopicIds) {
        if (question.topics.includes(topic)) {
          return true;
        }
      }
      return false;
    });
  } else {
    // TODO: maybe use array group method
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/group
    const grouped = allQuestions.reduce((group, currentQuestion) => {
      const category = `${currentQuestion.year}Q${currentQuestion.question}`;
      if (!group.hasOwnProperty(category)) {
        group[category] = [];
      }
    
      currentQuestion.topics.forEach(topic => {
        group[category].push(topic);
      });
    
      return group;
    }, {});

    result = allQuestions.filter(question => {
      for (let topic of selectedTopicIds) {
        if (grouped[`${question.year}Q${question.question}`].includes(topic)) {
          return true;
        }
      }
      return false;
    });
  }

  return result;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

function App() {
  const [checkboxesState, setCheckboxesState] = useState(new Array(topicList.length).fill(false));
  const [includeContext, setIncludeContext] = useState(false);

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkboxesState.map((item, index) => 
    index === position ? !item : item);
    setCheckboxesState(updatedCheckedState);
  }

  const selectedTopics = topicList.filter((element, index) => checkboxesState[index] === true);
  const filteredQuestions = filterQuestions(questionList, 
    selectedTopics.map(el => el.ApTopicId), includeContext);
  
  return (
    <>
    <input 
      type="checkbox"
      id="include-context-checkbox"
      name="include question context"
      value="include question context"
      checked={includeContext}
      onChange={() => setIncludeContext(!includeContext)} />
    <label htmlFor="include-context-checkbox">Include question context?</label>

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
      <Wrapper>
        <QuestionSet questionList={filteredQuestions} />
      </Wrapper>
    </>
  );
}


export default App;
