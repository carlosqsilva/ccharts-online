import React from "react"
import { heart } from "../assets"

const Author = () => {
  return (
    <a className="author" href="https://carloseng.com" target="_blank" rel="noopener noreferrer">
      Made with <img src={heart} alt="love" /> by <span>Carlos Silva</span>
    </a>
  )  
}

export default Author