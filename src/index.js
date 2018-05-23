import { h, render } from "preact"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import root from "./store"
import registerServiceWorker from "./registerServiceWorker"

import "./index.scss"
import { Header, Chart, Modal, Footer } from "./components"

const store = createStore(root, applyMiddleware(thunk))

const App = () => (
  <div>
    <Header />
    <Modal />
    <Chart />
    <Footer />
  </div>
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.body
)

registerServiceWorker()
