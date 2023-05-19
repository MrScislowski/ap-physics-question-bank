import { useState } from 'react';

import styled from 'styled-components';
import { QuestionSet } from './QuestionSet';

const filterQuestionsByText = (allQuestions, searchText) => {
    if (searchText.trim().length === 0) {
        return [];
    }

    return allQuestions.filter(
        question => question.questionText.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    )
}

const SearchContainer = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
`

const TextSearchBox = styled.input`
flex-grow: 1;
max-width: 80%;
`

export const TextSelector = (props) => {
    let topicList = props.topicList;
    const questionList = props.questionList;

    const [searchText, setSearchText] = useState("");

    const filteredQuestions = filterQuestionsByText(questionList, searchText);

    return (
        <>
        <SearchContainer>
            <TextSearchBox 
                value={searchText} 
                onChange={e => setSearchText(e.target.value)} 
                name="searchTextInput"
                type="text"    
            />
        </SearchContainer>
        <QuestionSet questionList={filteredQuestions} />
        </>
    );
}