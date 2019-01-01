import React, { Component } from 'react';
import './App.css';
import Welcome from './Weclome';
import styled, {css} from 'styled-components';
import AppLayout from './AppLayout';

const MyButton = styled.div`
  display: inline-block;
  border-radius: 3px;
  padding: 0.5rem 0;
  margin: 0.5rem 1rem;
  width: 11rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  ${props => props.primary && css`
    background: white;
    color: palevioletred;
  `}
`

const TomatoButton = styled(MyButton)`
  color: tomato;
`

class App extends Component {
  render() {
    return (
      <AppLayout>
        <Welcome name={"guest"} />
        <MyButton>hello </MyButton>
        <MyButton primary>hello </MyButton>
        <TomatoButton primary>hello </TomatoButton>
      </AppLayout>
    );
  }
}

export default App;
