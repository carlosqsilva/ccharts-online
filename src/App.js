import React, { Component } from 'react';
import './styles/index.css';
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import ChartComponent from "./components/Chart";
import Controls from "./components/Controls";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Modal />
        <Navbar />
        <Controls />
        <ChartComponent />
      </div>
    );
  }
}

export default App;
