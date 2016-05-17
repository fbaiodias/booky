import React, {Component} from 'react'
import {deepFreeze} from 'freezr'
import Environment from 'Environment'
import EnvironmentCreator from 'EnvironmentCreator'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userName: '',
      environments: deepFreeze([
        {name: 'a', guest: 'foo', queue: []},
        {name: 'b', guest: '', queue: []},
        {name: 'c', guest: 'bar', queue: ['tar']}
      ])
    }
  }
  render () {
    const {userName, environments, addingEnviroment} = this.state
    return (
      <div className='app'>
        <h1 className='title'>Booking environment</h1>
        <div className='user-name'>
          <input
            type='text'
            className='user-name__input'
            placeholder='and you are…'
            value={userName}
            onChange={(e) => this.setState({userName: e.target.value})}
          />
        </div>
        <div className='environments'>
          {environments.map((env, index) =>
            <Environment
              key={index}
              {...env}
              isOwner={userName.toLowerCase() === env.guest.toLowerCase()}
              onBook={() => this.book(index)}
              />
          )}
          <EnvironmentCreator
            onBlur={() => this.setState({addingEnviroment: false})}
            onClick={() => this.setState({addingEnviroment: true})}
            showInput={addingEnviroment}
            onAddEnvironment={(name) => this.addEnviroment(name)}
          />
        </div>
      </div>
    )
  }
  addEnviroment (environmentName) {
    const environments = this.state.environments.push(deepFreeze({
      name: environmentName,
      guest: '',
      queue: []
    }))
    this.setState({ environments, addEnviroment: false })
  }
  book (environmentIndex) {
    const {userName} = this.state
    if (userName.length === 0) return
    const environments = this.state.environments.updateIn(
      [environmentIndex],
      (environment) => {
        if (environment.guest.length) {
          if (!environment.queue.includes(userName) && environment.guest.toLowerCase() !== userName) {
            return environment.set('queue', environment.queue.push(userName))
          } else {
            return environment
          }
        } else {
          return environment.set('guest', userName)
        }
      }
    )

    this.setState({environments})
  }
}
App.propTypes = {}

export default App
