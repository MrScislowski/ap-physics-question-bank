import { Question } from "./Question";

export const QuestionGroup = (props) => {

  const theGroup = props.group;

  const groupFilename = `${theGroup[0].year}Q${theGroup[0].question}.png`;

  return (
    <>
    <h2>{theGroup[0].year} Q{theGroup[0].question}</h2>
    <img key={groupFilename} src={'/images/' + groupFilename} alt=""></img>
    {theGroup.map(question => {
      return <Question key={`Q${question.filename}`} questionData={question} />
    })}
    </>
  )
}