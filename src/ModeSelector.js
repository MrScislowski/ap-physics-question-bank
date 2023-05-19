
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

const Button = styled.button`
  text-decoration: ${props => (props.isSelected && 'underline') || 'none'};
  background-color: #bfd7eaff;
  border-radius: 5px;
  flex-grow: 1;
  font-size: 100%;
  font-weight: bolder;
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