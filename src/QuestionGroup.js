import { Question } from "./Question";

import styled from "styled-components";

const QuestionImage = styled.img`
max-width: 100%;
`

export const QuestionGroup = (props) => {

  const theGroup = props.group;

  const groupFilename = `${theGroup[0].year}Q${theGroup[0].question}.png`;
  const questionData = {filename: groupFilename}

  return (
    <>
    <h2>{theGroup[0].year} Q{theGroup[0].question}</h2>
    <Question key={groupFilename} questionData={questionData}></Question>
    <br/>
    {theGroup.map(question => {
      return <Question key={`Q${question.filename}`} questionData={question} />
    })}
    </>
  )
}