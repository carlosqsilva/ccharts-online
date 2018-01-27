import React, { Component } from "react"
import styled from "styled-components"
import "./index.css"

import { Header, Chart, Modal, GitCorner } from "./components"

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr minmax(300px, 1000px) 1fr;
  width: 100vw;
`

const Container = styled.div`
  grid-column: 2;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const Description = styled.div`
  margin-bottom: 30px;
  a {
    color: black;
    font-weight: 700;
    text-decoration: none;
  }
`

const Fragment = React.Fragment

class App extends Component {
  render() {
    return (
      <Fragment>
        <GitCorner />
        <Modal />
        <Header />

        <Wrapper>
          <Container>
            <Description>
              <h2>What is this!?</h2>
              <p>
                The control chart is one of the seven basic tools of quality control. Typically control charts are used
                for time-series data, though they can be used for data that have logical comparability (i.e. you want to
                compare samples that were taken all at the same time, or the performance of different individuals);
                however the type of chart used to do this requires consideration.<a href="https://en.wikipedia.org/wiki/Control_chart">
                  - Wikipedia
                </a>
              </p>
            </Description>

            <Chart />
          </Container>
        </Wrapper>
      </Fragment>
    )
  }
}

export default App
