import { useState } from 'react';

import styled from 'styled-components';
import { QuestionSet } from './QuestionSet';

const filterQuestionsByText = (allQuestions, searchText) => {
    return allQuestions.filter(
        question => question.questionText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    )
}

export const TextSelector = (props) => {
    let topicList = props.topicList;
    const questionList = props.questionList;

    const [searchText, setSearchText] = useState("");

    const filteredQuestions = filterQuestionsByText(questionList, searchText);

    return (
        <>
            <input 
                value={searchText} 
                onChange={e => setSearchText(e.target.value)} 
                name="searchTextInput"
                type="text"    
            />
            <QuestionSet questionList={filteredQuestions} />
        </>
    );
}