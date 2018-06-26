import { h } from "preact"
import { connect } from "preact-redux"
import {
  toggle_modal,
  loadData,
  set_Delimiter,
  set_Decimal,
  set_Header,
  load_sample
} from "../../store/actions"
import { Select, CheckBox, FileInput } from "../Inputs"
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
    <div class={`modal ${!closed ? "is-active" : ""}`}>
      <div class="modal-background" />
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Import your data (.csv or .txt)</p>
          <button class="delete" onClick={toggleModal} aria-label="close" />
        </header>
        <section class="modal-card-body">
          <div class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <FileInput handleChange={readFile}>Choose a file</FileInput>
              </div>

              <div class="level-item">
                <Select options={delimiter} handleChange={setDelimiter} />
              </div>

              <div class="level-item">
                <Select options={decimal} handleChange={setDecimal} />
              </div>

              <div class="level-item">
                <CheckBox handleClick={setHeader}>Has header</CheckBox>
              </div>

              <div class="level-item">
                <Select
                  handleChange={loadSample}
                  type="is-dark"
                  options={[
                    "Examples...",
                    "Xbar",
                    "Cusum",
                    "Ewma",
                    "MEWMA",
                    "P",
                    "NP",
                    "C",
                    "U"
                  ]}
                />
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

export default connect(
  state,
  actions
)(Modal)
