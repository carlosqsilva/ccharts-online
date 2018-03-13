import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import root from "./store"
import registerServiceWorker from "./registerServiceWorker"

import "./index.css"
import { Header, Chart, Modal } from "./components"

const store = createStore(root, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <React.Fragment>
      <Header />
      <Modal />
      <Chart />
    </React.Fragment>
  </Provider>,
  document.getElementById("root")
)

registerServiceWorker()
