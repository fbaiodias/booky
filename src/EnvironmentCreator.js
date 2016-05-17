import React, {Component} from 'react'

class EnvironmentCreator extends Component {
  constructor (props) {
    super(props)
    this.state = {
      environmentName: ''
    }
  }
  componentDidUpdate () {
    if (this.props.showInput) {
      this.refs.input.focus()
    }
  }
  render () {
    const {onClick, onAddEnvironment, showInput, onBlur} = this.props
    const content = showInput === true
      ? <input
        ref='input'
        type='text'
        className='environment-creator__input'
        placeholder='Type a name and press ENTER'
        value={this.state.environmentName}
        onBlur={() => onBlur()}
        onChange={(e) => this.setState({environmentName: e.target.value})}
        onKeyDown={(e) => this.keyDownPressed(e)}
        />
      : 'Add Environment'
    return (
      <div
        className='environment-creator u-rounded'
        onClick={() => onClick()}
        >{content}</div>
    )
  }
  keyDownPressed (e) {
    const keyPressed = e.which
    if (keyPressed === 13) {
      // enter!
      this.props.onAddEnvironment(this.state.environmentName)
      this.setState({environmentName: ''})
    } else if (keyPressed === 27) {
      // escape
      this.refs.input.blur()
    }
  }
}

export default EnvironmentCreator
