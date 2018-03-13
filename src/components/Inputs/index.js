import React from "react"
import file from "./csv.svg"

export const Button = ({ handleClick, children, ...props }) => (
  <a onClick={handleClick} className={`button ${props.className}`}>
    {children}
  </a>
)

export const CheckBox = ({ handleClick, children }) => (
  <label className="checkbox">
    <input onClick={handleClick} type="checkbox" />
    {children}
  </label>
)

export const FileInput = ({ handleChange, children }) => (
  <div className="file">
    <label className="file-label">
      <input
        className="file-input"
        type="file"
        onChange={handleChange}
        accept=".csv,.txt"
        name="resume"
      />
      <span className="file-cta">
        <span className="file-icon">
          <img src={file} alt="" />
        </span>
        <span className="file-label">{children}</span>
      </span>
    </label>
  </div>
)

export const Select = ({ options, handleChange }) => (
  <div className="select">
    <select onChange={handleChange}>
      {options.map((option, i) => <option key={i}>{option}</option>)}
    </select>
  </div>
)
