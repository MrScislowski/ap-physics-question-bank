import { useState } from 'react';

import styled from 'styled-components';
import { QuestionSet } from './QuestionSet';

const CheckboxList = styled.ul`
  list-style-type: none;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  row-gap: 10px;
  column-gap: 10px;
`;



const filterQuestionsByYear = (allQuestions, selectedYears) => {
  return allQuestions.filter(question => selectedYears.includes(question.year));;
}

export const YearSelector = (props) => {
  let topicList = props.topicList;
  const questionList = props.questionList;

  let availableYears = questionList.reduce((prev, cur) => {
    prev.add(cur.year);
    return prev;
  }, new Set());

  availableYears = Array.from(availableYears);

  const [checkboxesState, setCheckboxesState] = useState(new Array(topicList.length).fill(false));


  const selectedYears = availableYears.filter((element, index) => checkboxesState[index] === true);
  const filteredQuestions = filterQuestionsByYear(questionList, selectedYears);

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkboxesState.map((item, index) => 
    index === position ? !item : item);
    setCheckboxesState(updatedCheckedState);
  }


  return (
    <>
      <CheckboxList>
      {availableYears.map((year, index) => {
        return (
          <li key={`custom-checkbox-${index}`}>
          <input
            type="checkbox"
            id={`custom-checkbox-${index}`}
            name={year}
            value={year}
            checked={checkboxesState[index]}
            onChange={() =>
              handleCheckboxChange(index)} 
          />
          <label htmlFor={`custom-checkbox-${index}`}>{year}</label>
          </li>
        );
      })}
      </CheckboxList>

      <QuestionSet questionList={filteredQuestions} />
    </>
  );
}