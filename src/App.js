import { useState } from 'react';
import { QuestionSet } from './QuestionSet';
import { TopicSelector } from './TopicSelector';

import styled from 'styled-components';

// https://stackoverflow.com/questions/58524990/react-relative-imports-outside-of-src-are-not-supported
const questionList = require("./assets/Categorization.json");
let topicList = require("./assets/APTopicNames.json");


function App() {
  
  return (
    <>
    <TopicSelector questionList={questionList} topicList={topicList} />
    </>
  );
}


export default App;
