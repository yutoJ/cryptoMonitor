import React, { Component } from 'react';
import './App.css';
import styled, {css} from 'styled-components';
import AppLayout from './AppLayout';
import AppBar from './AppBar';
import {AppProvider} from './AppProvider';
import Settings from '../Settings'
import Dashboard from '../Dashboard'
import Content from '../Shared/Content'

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
        <AppProvider>
          <AppBar />
          <Content>
            <Settings />
            <Dashboard />
          </Content>
          <TomatoButton primary>hello </TomatoButton>
        </AppProvider>
      </AppLayout>
    );
  }
}

export default App;
