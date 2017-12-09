import React from "react"
import { github, logo } from "../assets"

const Header = () => {
  return (
    <header className="header">
      
      <div className="logo" >
      <img src={logo} alt="controls chart online" />
      C<span className="hide">ontrol</span>
      <div className="last">Chart online</div></div>
      
      <a className="repo" href="https://github.com/carlosqsilva/ccharts-online">Github
        <img src={github} alt="Github" />
      </a>

    </header>
  )
}

export default Header