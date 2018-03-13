import { h } from "preact"
import { connect } from "react-redux"
import {
  toggle_modal,
  loadData,
  set_Delimiter,
  set_Decimal,
  set_Header,
  load_sample
} from "../../store/actions"
import { Select, CheckBox, FileInput, Button } from "../Inputs"
import { DataTable } from "./table"

const Modal = ({
  toggleModal,
  readFile,
  loadSample,
  setHeader,
  setDelimiter,
  setDecimal,
  closed,
  columns,
  data
}) => {
  const delimiter = ["Delimiter", "Comma", "empty space", "Colon", "Semicolon"]
  const decimal = ["Decimal", 'Option "."', 'Option ","']

  return (
    <div className={`modal ${!closed && "is-active"}`}>
      <div className="modal-background" />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">Import your data (.csv or .txt)</p>
          <button className="delete" onClick={toggleModal} aria-label="close" />
        </header>
        <section className="modal-card-body">
          <div className="level is-mobile">
            <div className="level-left">
              <div className="level-item">
                <FileInput handleChange={readFile}>Choose a file</FileInput>
              </div>

              <div className="level-item">
                <Select options={delimiter} handleChange={setDelimiter} />
              </div>

              <div className="level-item">
                <Select options={decimal} handleChange={setDecimal} />
              </div>

              <div className="level-item">
                <CheckBox handleClick={setHeader}>Has header</CheckBox>
              </div>

              <div className="level-item">
                <Button handleClick={loadSample} className="is-dark">
                  Import Example
                </Button>
              </div>
            </div>
          </div>

          <DataTable data={data} columns={columns} />
        </section>
      </div>
    </div>
  )
}

const state = ({ data }) => ({
  closed: data.closed,
  columns: data.columns,
  data: data.data
})

const actions = {
  toggleModal: toggle_modal,
  readFile: loadData,
  setHeader: set_Header,
  setDelimiter: set_Delimiter,
  setDecimal: set_Decimal,
  loadSample: load_sample
}

export default connect(state, actions)(Modal)
