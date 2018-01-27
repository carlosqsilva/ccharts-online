import React from "react"
import styled from "styled-components"
import close from "./close.png"

const Wrapper = styled.a`
  position: absolute;
  right: 0;

  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  > span {
    color: whitesmoke;
    font-size: 1.5rem;
    transform: translateX(30px);
    opacity: 0;
    transition: all 500ms ease;
  }

  &:hover {
    > span {
      opacity: 1;
      transform: translateX(0);
    }
  }
`

export const Close = props => {
  const { handleClick } = props
  return (
    <Wrapper onClick={handleClick}>
      <span>Close</span>
      <img src={close} alt="close modal" />
    </Wrapper>
  )
}
