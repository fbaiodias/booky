import React from 'react'

const QueueMember = React.createClass({
  getInitialState () {
    return {
      isHover: false
    }
  },
  render () {
    const text = this.state.isHover
      ? this.props.name
      : this.props.name.substr(0, 1)
    return (
      <div
        className='queue-member'
        title={this.props.name}
        onMouseEnter={() => this.setState({isHover: true})}
        onMouseFalse={() => this.setState({isHover: false})}
        >{text}</div>
    )
  }
})

export default QueueMember
