export const Question = (props) => {
  const question = props.questionData;
  return (
    <>
      <img key={question.filename} src={'/images/' + question.filename} alt=""></img>
      <hr></hr>
    </>
  )

}