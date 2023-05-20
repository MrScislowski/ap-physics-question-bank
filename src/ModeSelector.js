
// is this just for react native...? should i be using a web app version...?
// (the example with react navigation just look so good that I don't want to mess with
// <a> or <ul> tabs myself...)

// https://reactnavigation.org/docs/getting-started/
// https://dev.to/sokaribosenibo/how-to-create-a-bottom-tab-navigator-using-react-navigation-in-react-native-4ff1


import styled from 'styled-components';

const TopNavbar = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
`;

// text-decoration-line: ${props => (props.isSelected && 'underline') || 'none'};
// text-decoration-thickness: 15px;

const Button = styled.button`
border: none;
flex-grow: 1;
font-size: 100%;
font-weight: ${props => (props.isSelected && 'bolder') || 'normal'};
padding-top: 20px;
padding-bottom: 20px;
&:hover {
  background-color: #baa898ff;
}
`;

const buttonList = [
  { typeId: 'topic', text: "BY TOPIC" },
  { typeId: 'year', text: "BY YEAR" },
  { typeId: 'text', text: "SEARCH TEXT" },
];

export const ModeSelector = (props) => {
  const filterMode = props.filterMode;
  const setFilterMode = props.setFilterMode;

  return (
    <>
      <TopNavbar>
        {buttonList.map((button, index) => {
          return <Button isSelected={filterMode === button.typeId} key={index} onClick={() => { setFilterMode(button.typeId) }}>
            {button.text}
          </Button>
        })}
      </TopNavbar>
    </>
  )
}