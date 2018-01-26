import React, { Component } from "react"
import "./styles/index.css"

import { Author, Header, Chart, Modal, GitCorner } from "./components"

const Fragment = React.Fragment

class App extends Component {
  render() {
    return (
      <Fragment>
        <Modal />
        <Header />
        <Chart />
        <Author />
        <GitCorner />
      </Fragment>
    )
  }
}

export default App
