import React from "react"
import styled, { keyframes } from "styled-components"
import { heart } from "../assets"

const beat = keyframes`
  to {
    transform: scale(1.4)
  }
`

const Wrapper = styled.a`
  position: fixed;
  bottom: 0;
  right: 10px;

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
    animation: ${beat} 1.2s infinite alternate;
  }
`

const Author = () => {
  return (
    <Wrapper href="https://carloseng.com" target="_blank" rel="noopener noreferrer">
      Made with <img src={heart} alt="love" /> by Carlos Silva
    </Wrapper>
  )
}

export default Author
