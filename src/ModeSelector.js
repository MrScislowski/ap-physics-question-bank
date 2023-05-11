
// is this just for react native...? should i be using a web app version...?
// (the example with react navigation just look so good that I don't want to mess with
// <a> or <ul> tabs myself...)

// https://reactnavigation.org/docs/getting-started/
// https://dev.to/sokaribosenibo/how-to-create-a-bottom-tab-navigator-using-react-navigation-in-react-native-4ff1


import styled from 'styled-components';

export const ModeSelector = (props) => {
  const setFilterMode = props.setFilterMode;

  return (
    <>
      <button onClick={() => {setFilterMode('topic')}}> By Topic </button>
      <button onClick={() => {setFilterMode('year')}}> By Year </button>
    </>
  )
}