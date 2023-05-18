
// is this just for react native...? should i be using a web app version...?
// (the example with react navigation just look so good that I don't want to mess with
// <a> or <ul> tabs myself...)

// https://reactnavigation.org/docs/getting-started/
// https://dev.to/sokaribosenibo/how-to-create-a-bottom-tab-navigator-using-react-navigation-in-react-native-4ff1


import styled from 'styled-components';

const Button = styled.button`
  background-color: #bfd7eaff;
  border-radius: 5px;
`;

export const ModeSelector = (props) => {
  const setFilterMode = props.setFilterMode;

  return (
    <>
      <Button onClick={() => {setFilterMode('topic')}}> By Topic </Button>
      <Button onClick={() => {setFilterMode('year')}}> By Year </Button>
      <Button onClick={() => {setFilterMode('text')}}> Search Text </Button>

    </>
  )
}