import React from "react"
import styled from "styled-components"

const Wrapper = styled.a`
  appearance: none;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  line-height: 1;
  color: #4e4e4e;
  border-radius: 3px;
  border: 1px solid #dbdbdb;
  background-color: whitesmoke;
  margin-right: 20px;
  padding: 0.6rem;
`

export class ButtonDownload extends React.Component {
  onDownload = e => {
    this.element.href = this.props.dataUrl()
    this.element.download = "ControlCharts.png"
  }

  render() {
    const { children } = this.props
    return (
      <Wrapper
        onClick={this.onDownload}
        innerRef={el => {
          this.element = el
        }}
      >
        {children}
      </Wrapper>
    )
  }
}

export const Button = props => {
  const { handleClick, children, ...other } = props
  return (
    <Wrapper onClick={handleClick} {...other}>
      {children}
    </Wrapper>
  )
}
