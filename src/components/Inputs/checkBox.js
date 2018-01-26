import React from "react"
import styled from "styled-components"

const Wrapper = styled.label`
  border: 1px solid #dbdbdb;
  background-color: whitesmoke;
  color: #4e4e4e;
  margin-right: 20px;
  padding: 0.6rem;
  border-radius: 3px;
  cursor: pointer;

  > input[type="checkbox"] {
    margin-right: 0.5rem;
    // vertical-align: middle;
  }
`

export const CheckBox = props => {
  const { handleClick, children } = props

  return (
    <Wrapper>
      <input onClick={handleClick} type="checkbox" />
      {children}
    </Wrapper>
  )
}
