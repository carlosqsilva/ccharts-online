import React from "react"
import styled from "styled-components"
import { logo } from "../assets"

const Wrapper = styled.header`
  grid-area: header;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Brand = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1.6rem;
  color: #2c2e3e;

  > span {
    opacity: 0;
    transition: all 500ms ease;
    &:last-child {
      opacity: 1;
      display: inline-block;
      transform: translateX(-94px);
    }
  }

  &:hover {
    > span {
      opacity: 1;
      &:last-child {
        transform: translateX(15px);
      }
    }
  }
`

const Header = () => {
  return (
    <Wrapper>
      <Brand>
        <img
          style={{ width: 50, height: 50, marginRight: 10 }}
          src={logo}
          alt="controls chart online"
        />
        C<span>ontrol</span>
        <span>Chart online</span>
      </Brand>
    </Wrapper>
  )
}

export default Header
