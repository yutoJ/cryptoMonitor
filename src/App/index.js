import React, { Component } from 'react';
import './App.css';
import Welcome from './Weclome';

class App extends Component {
  render() {
    return (
      <Welcome name={"guest"}/>
    );
  }
}

export default App;
