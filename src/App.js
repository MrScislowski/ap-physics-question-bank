import { useState } from 'react';
import { QuestionSet } from './QuestionSet';
import { TopicSelector } from './TopicSelector';
import { ModeSelector } from './ModeSelector';
import { DataFrame } from './DataFrame';

import styled from 'styled-components';

// https://stackoverflow.com/questions/58524990/react-relative-imports-outside-of-src-are-not-supported
import { questionList } from './questionList';


let topicList = require("./assets/APTopicNames.json");


function App() {

  // topic, year, searchString
  const [filterMode, setFilterMode] = useState('topic');
  
  return (
    <>
    <ModeSelector setFilterMode={setFilterMode} />
    <DataFrame filterMode={filterMode} questionList={questionList} topicList={topicList} />
    </>
  );
}


export default App;
