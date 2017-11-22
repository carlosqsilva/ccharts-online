import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import TextInput from "./components/TextInput";
import ChartComponent from "./components/Chart";
import Controls from "./components/Controls";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Controls />
        <ChartComponent />
      </div>
    );
  }
}

export default App;
