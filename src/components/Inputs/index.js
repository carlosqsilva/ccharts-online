import { h } from "preact"

export const Button = ({ handleClick, children, ...props }) => (
  <a onClick={handleClick} class={`button ${props.class}`}>
    {children}
  </a>
)

export const CheckBox = ({ handleClick, children }) => (
  <label class="checkbox">
    <input onClick={handleClick} type="checkbox" />
    {children}
  </label>
)

export const FileInput = ({ handleChange, children }) => (
  <div class="file">
    <label class="file-label">
      <input
        class="file-input"
        type="file"
        onChange={handleChange}
        accept=".csv,.txt"
        name="resume"
      />
      <span class="file-cta">
        <span class="file-label">{children}</span>
      </span>
    </label>
  </div>
)

export const Select = ({ options, handleChange }) => (
  <div class="select">
    <select onChange={handleChange}>
      {options.map((option, i) => <option key={i}>{option}</option>)}
    </select>
  </div>
)
