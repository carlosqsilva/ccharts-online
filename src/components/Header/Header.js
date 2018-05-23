import { h } from "preact"
import { Link } from "../Utils"
import logo from "./logo.svg"

const NavBar = () => (
  <nav class="navbar">
    <div class="container">
      <div class="navbar-brand">
        <div class="navbar-item">
          <div class="brand">
            <img class="brand__logo" src={logo} alt="logo" />
            <h1 class="brand__title has-text-white">SPC online</h1>
          </div>
        </div>
      </div>
      <div class="navbar-end">
        <Link
          class="navbar-item"
          href="https://github.com/carlosqsilva/ccharts-online"
        >
          Github
        </Link>
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
        <h1 className="title is-spaced">What is this!?</h1>
        <h2 className="subtitle">
          The control chart is one of the seven basic tools of quality control.
          Typically control charts are used for time-series data, though they
          can be used for data that have logical comparability (i.e. you want to
          compare samples that were taken all at the same time, or the
          performance of different individuals); however the type of chart used
          to do this requires consideration.{" "}
          <Link href="https://en.wikipedia.org/wiki/Control_chart">
            - Wikipedia
          </Link>
        </h2>
      </div>
    </div>
  </section>
)

export default Header
