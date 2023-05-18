import { useState } from 'react';
import { QuestionSet } from './QuestionSet';
import { TopicSelector } from './TopicSelector';
import { ModeSelector } from './ModeSelector';
import { DataFrame } from './DataFrame';

import styled from 'styled-components';

// --champagne: #eee0cbff;
// --columbia-blue: #bfd7eaff;
// --khaki: #baa898ff;
// --cambridge-blue: #839788ff;
// --black: #000000ff;

const Wrapper = styled.div`
  background-color: #eee0cbff;
  border-radius: 25px;
  font-family: "Roboto", sans-serif;
`;


// https://stackoverflow.com/questions/58524990/react-relative-imports-outside-of-src-are-not-supported
let questionList = require("./assets/FullCategorization.json")
let topicList = require("./assets/APTopicNames.json");


function App() {

  // topic, year, searchString
  const [filterMode, setFilterMode] = useState('topic');
  
  return (
    <Wrapper>
    <ModeSelector setFilterMode={setFilterMode} />
    <DataFrame filterMode={filterMode} questionList={questionList} topicList={topicList} />
    </Wrapper>
  );
}


export default App;
