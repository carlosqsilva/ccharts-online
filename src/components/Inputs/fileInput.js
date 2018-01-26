import React from "react"
import styled from "styled-components"

import file from "./csv.svg"

const Wrapper = styled.label`
  display: flex;
  justify-content: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  background: whitesmoke url(${file}) no-repeat 5% 50%;
  color: #4e4e4e;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  line-height: 1.5rem;
  margin-right: 20px;
  padding: 0.6rem 0.6rem 0.6rem 2rem;

  > input[type="file"] {
    outline: none;
    position: absolute;
    left: 0;
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
  }
`

export const FileInput = props => {
  const { handleChange, children } = props

  return (
    <Wrapper className="fileInput marginRight">
      <input onChange={handleChange} type="file" accept=".csv,.txt" />
      {children}
    </Wrapper>
  )
}
