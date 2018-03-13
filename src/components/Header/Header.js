import { h } from "preact"
import logo from "./logo.svg"

const NavBar = () => (
  <nav className="navbar">
    <div className="container">
      <div className="level is-mobile">
        <div className="brand">
          <img src={logo} alt="controls chart online" />
          C<span>ontrol</span>
          <span>
            Chart online<a
              className="author"
              href="https://carloseng.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              by Carlos Silva
            </a>
          </span>
        </div>
        <a
          className="button is-rounded is-success"
          href="https://github.com/carlosqsilva/ccharts-online"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
    </div>
  </nav>
)

const Header = () => (
  <section className="hero is-dark">
    <div className="hero-head">
      <NavBar />
    </div>
    <div className="hero-body">
      <div className="container has-text-centered">
        <h1 className="title">What is this!?</h1>
        <h2 className="subtitle">
          The control chart is one of the seven basic tools of quality control.
          Typically control charts are used for time-series data, though they
          can be used for data that have logical comparability (i.e. you want to
          compare samples that were taken all at the same time, or the
          performance of different individuals); however the type of chart used
          to do this requires consideration.{" "}
          <a href="https://en.wikipedia.org/wiki/Control_chart">- Wikipedia</a>
        </h2>
      </div>
    </div>
  </section>
)

export default Header
