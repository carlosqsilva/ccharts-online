import React from "react"
import styled from "styled-components"
import logo from "./logo.svg"
import heart from "./heart.svg"

const Wrapper = styled.header`
  display: grid;
  grid-template-columns: 1fr minmax(300px, 1000px) 1fr;
  min-height: 55px;
  margin-bottom: 30px;
`

const Container = styled.div`
  grid-column: 2;
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

const Author = styled.a`
  align-self: center;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: black;
  font-size: 0.9rem;

  > img {
    width: 10px;
    height: 10px;
    margin: 0 5px;
    animation: beat 1.2s infinite alternate;
  }
`

const Header = () => {
  return (
    <Wrapper>
      <Container>
        <Brand>
          <img style={{ width: 50, height: 50, marginRight: 10 }} src={logo} alt="controls chart online" />
          C<span>ontrol</span>
          <span>Chart online</span>
        </Brand>

        <Author href="https://carloseng.com" target="_blank" rel="noopener noreferrer">
          Made with <img src={heart} alt="love" /> by Carlos Silva
        </Author>
      </Container>
    </Wrapper>
  )
}

export default Header
