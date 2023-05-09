import { QuestionGroup } from "./QuestionGroup";

const questionComparison = (a, b) => {
  if (a.year > b.year) {
    return -1;
  } else if (a.year < b.year) {
    return 1;
  }

  if (a.question > b.question) {
    return 1;
  } else if (a.question < b.question) {
    return -1;
  }

  if (a.part > b.part) {
    return 1;
  } else if (a.part < b.part) {
    return -1;
  }

  return 0;
}

const partitionIntoGroups = (questionList) => {
  if (questionList.length === 0) {
    return [];
  }

  // sort list
  questionList.sort(questionComparison);
  
  // group them
  const questionGroups = [];
  let curGroup = [];
  let curYear = questionList[0].year;
  let curQuestion = questionList[0].question;

  for (let questionPart of questionList) {
    if (questionPart.year === curYear && questionPart.question === curQuestion) {
      curGroup.push(questionPart);
    } else {
      questionGroups.push(curGroup);
      curGroup = []
      curYear = questionPart.year;
      curQuestion = questionPart.question;
      curGroup.push(questionPart);
    }
  }

  questionGroups.push(curGroup);

  // return the groups
  return questionGroups;
}

export const QuestionSet = (props) => {
  const questionGroups = partitionIntoGroups(props.questionList);

  return (
    <>
    {questionGroups.map((questionGroup, index) => {
      return <QuestionGroup key={`QG${index}`} group={questionGroup} />
    })}
    </>
  )
}