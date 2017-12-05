import React from "react"
import { github, heart } from "../assets"

const Navbar = () => {
  return (
    <header className="header">
      
      <a className="author" href="https://carlosqsilva.github.io" target="_blank" rel="noopener noreferrer">
        Made<br/>with
        <img className="headerImage pulse" src={heart} alt="love" />by
        <br/>Carlos Silva</a>

      <div className="logo" >
      C<span className="hide">ontrol</span>
      <div className="last">Chart online</div></div>


      <a className="repo" >Github
        <img className="headerImage" src={github} alt="Github" />
      </a>

    </header>
  )
}

export default Navbar