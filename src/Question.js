import styled from "styled-components";

const QuestionImage = styled.img`
max-width: 100%;
`

export const Question = (props) => {
  const question = props.questionData;
  return (
    <>
      <QuestionImage key={question.filename} src={'/images/' + question.filename} alt=""></QuestionImage>
      <hr></hr>
    </>
  )
}