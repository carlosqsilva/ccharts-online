import React, { Component } from 'react';
import './styles/index.css';

import { Author, Header, Chart, Modal } from "./components"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Modal />
        <Header />
        <Chart />
        <Author />
      </div>
    );
  }
}

export default App;
