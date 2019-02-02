import React, { Component } from 'react'

export default class ActionIcon extends Component {
  constructor (props) {
    super(props)
    const styleProps = {
      color: props.color,
      width: props.width,
      height: props.height
    }
    const style = Object.assign({}, { pointerEvents: 'none', display: 'block', width: '100%', height: '100%' }, styleProps)
    this.icons = {
      checkmark: <svg viewBox='0 0 64 64' preserveAspectRatio='xMidYMid meet' style={style}><path fill={style.color} d='M54 8l-30 30-14-14-10 10 24 24 40-40z' /></svg>,
      blocked: <svg viewBox='0 0 64 64' preserveAspectRatio='xMidYMid meet' style={style}><path fill={style.color} d='M54.627 9.373c-6.044-6.044-14.080-9.373-22.628-9.373s-16.583 3.329-22.628 9.373c-6.044 6.044-9.373 14.080-9.373 22.627s3.329 16.583 9.373 22.627c6.044 6.044 14.080 9.373 22.628 9.373s16.583-3.329 22.628-9.373c6.044-6.044 9.373-14.080 9.373-22.628s-3.329-16.583-9.373-22.628zM56 32c0 5.176-1.647 9.974-4.444 13.899l-33.454-33.454c3.925-2.797 8.723-4.444 13.899-4.444 13.234 0 24 10.766 24 24zM8 32c0-5.176 1.647-9.974 4.444-13.899l33.454 33.454c-3.925 2.797-8.723 4.444-13.899 4.444-13.234 0-24-10.766-24-24z' /></svg>,
      close: <svg viewPort="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg"><line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2"/><line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2"/>
 </svg>
    }
  }

  render () {
    return (
      <span className='action-icon' title={this.props.title}>
        {this.icons[this.props.name]}
      </span>
    )
  }
}
