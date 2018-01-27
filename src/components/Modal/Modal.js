import React from "react"
import styled from "styled-components"
import { connect } from "react-redux"
import { toggle_modal, loadData, set_Delimiter, set_Decimal, set_Header, load_sample } from "../../store/actions"
import { Select } from "../Inputs/select"
import { CheckBox } from "../Inputs/checkBox"
import { FileInput } from "../Inputs/fileInput"
import { Button } from "../Inputs/button"
import { DataTable } from "./table"
import { Close } from "./closeModal"

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.85);
  padding: 50px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr minmax(800px, 1200px) 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas:
    "   .   options    ."
    "   .   datagrid   .";
  animation: fadeIn 500ms ease;
`

const Container = styled.div`
  grid-area: options;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

const Modal = props => {
  const { toggleModal, readFile, loadSample, setHeader, setDelimiter, setDecimal, modal } = props

  if (!modal.closed) {
    return (
      <Wrapper>
        <Container>
          <FileInput handleChange={readFile}>Choose a file</FileInput>

          <Select options={["Delimiter", "Comma", "empty space", "Colon", "Semicolon"]} handleChange={setDelimiter} />

          <Select options={["Decimal", 'Option "."', 'Option ","']} handleChange={setDecimal} />

          <CheckBox handleClick={setHeader}>Has header</CheckBox>

          <Button handleClick={loadSample} style={{ backgroundColor: "#393E46", color: "#FBFBFB" }}>
            Import Example
          </Button>

          <Close handleClick={toggleModal} />
        </Container>

        <DataTable modal={modal} />
      </Wrapper>
    )
  }
  return null
}

const state = state => ({
  modal: state.data
})

const actions = dispatch => ({
  toggleModal: () => dispatch(toggle_modal()),
  readFile: e => dispatch(loadData(e)),
  setHeader: e => dispatch(set_Header(e)),
  setDelimiter: e => dispatch(set_Delimiter(e)),
  setDecimal: e => dispatch(set_Decimal(e)),
  loadSample: () => dispatch(load_sample())
})

export default connect(state, actions)(Modal)
