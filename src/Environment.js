import React, {Component} from 'react'
import QueueMember from 'QueueMember'

class Environment extends Component {
  render () {
    const {guest, name, queue, onBook} = this.props

    const queueLabel = queue.length === 0
      ? null
      : <span className='environment__queue-label'>on queue</span>

    return (
      <div className='environment u-rounded'>
        <div className='environment__title'>{name}</div>
        <EnvironmentGuest name={guest} />
        <div className='environment__queue'>
          {queueLabel}
          {queue.map((name) => <QueueMember key={name} name={name} />)}
        </div>
        <div
          className='environment__book u-rounded'
          onClick={() => onBook()}
          >Book</div>
      </div>
    )
  }
}
Environment.propTypes = {}

const AVAILABLE_TEXT = '>>> AVAILABLE <<<'
const EnvironmentGuest = ({name}) => {
  if (name.length) {
    return (
      <div className='environment__guest'>
        <span className='environment__label'>used by </span><span>{name}</span>
      </div>
    )
  } else {
    return (
      <div className='environment__guest is-available'>
        <span className='environment__label'>{AVAILABLE_TEXT}</span>
      </div>
    )
  }
}

export default Environment
