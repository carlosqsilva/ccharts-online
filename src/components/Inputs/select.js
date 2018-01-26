import React from "react"
import styled from "styled-components"

import arrow from "./arrow.svg"

const Wrapper = styled.select`
  background: whitesmoke url(${arrow}) no-repeat 92% 50%;
  font-family: "Space Mono", monospace, sans-serif;
  appearance: none;
  border: none;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  line-height: 1.5rem;
  padding: 0.6rem;
  color: #4e4e4e;
  width: 150px;
  margin-right: 20px;
  overflow: hidden;
`

export const Select = props => {
  const { options, handleChange } = props
  return (
    <Wrapper onChange={handleChange}>
      {options.map((option, index) => <option key={index}>{option}</option>)}
    </Wrapper>
  )
}
