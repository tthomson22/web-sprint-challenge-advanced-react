import React from 'react'
import axios from 'axios'

//Im going to try a new approach to this one hopefully its cleaner

const initialData = {
  x: 2,
  y: 2,
  count: 0,
  email: ''
}

export default class AppClass extends React.Component {
  constructor(){
    super()
    this.state = initialData
  }

  render() {
    const { className } = this.props
    const { x, y, count, email, message } = this.state

    const mover = (direction) => {
      const directionMessage = this.setState({
        message: `You can't go ${direction}`
      })
      
      if(direction === 'left'){
        if(x > 1){
          this.setState({
            ...this.state,
            count: this.state.count + 1,
            x: this.state.x - 1,
            message: ''
          })
        } else {
          directionMessage
        }     
      }
      if(direction === 'up'){
        if(y > 1){
          this.setState({
            ...this.state,
            count: this.state.count + 1,
            y: this.state.y - 1,
            message: ''
          })
        } else {
          directionMessage
        } 
      }
      if(direction === 'right'){
        if(x >= 1 && x < 3){
          this.setState({
            ...this.state,
            count: this.state.count + 1,
            x: this.state.x + 1,
            message: ''
          })
        } else {
          directionMessage
        } 
      }
      if(direction === 'down'){
        if(y >= 1 && y < 3){
          this.setState({
            ...this.state,
            count: this.state.count + 1,
            y: this.state.y + 1,
            message: ''
          })
        } else {
          directionMessage
        } 
      }
      if(direction === 'reset'){
        this.setState(initialData)
        this.setState({
          message: ''
        })
      }
    }

    const coordinateCheck = (checkX, checkY) => {
      if(checkX === x && checkY === y){
        return 'square active'
      }
      return 'square'
    }

    const onSubmit = evt => {
      evt.preventDefault()
      const postData = {
        'x': x,
        'y': y,
        'steps': count,
        'email': email
      }
      axios.post('http://localhost:9000/api/result', postData)
      .then(res=> {
        this.setState({...this.state, message: res.data.message})
        this.setState({...this.state, email: ''})
      })
      .catch(err=> {
        this.setState({...this.state, message: err.response.data.message})
      })
      this.setState({
        email: ''
      })
    }
    const onChange = evt => {
      const {value} = evt.target
      this.setState({...this.state, email: value})
    }

    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {`(${x},${y})`}</h3>
          <h3 id="steps">You moved {count} time{count === 1 ? '' : 's'}</h3>
        </div>
        <div id="grid">
          <div className={coordinateCheck(1,1)}>{coordinateCheck(1,1) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(2,1)}>{coordinateCheck(2,1) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(3,1)}>{coordinateCheck(3,1) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(1,2)}>{coordinateCheck(1,2) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(2,2)}>{coordinateCheck(2,2) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(3,2)}>{coordinateCheck(3,2) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(1,3)}>{coordinateCheck(1,3) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(2,3)}>{coordinateCheck(2,3) === 'square active' ? 'B' : ''}</div>
          <div className={coordinateCheck(3,3)}>{coordinateCheck(3,3) === 'square active' ? 'B' : ''}</div>
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button onClick={() => mover('left')} id="left">LEFT</button>
          <button onClick={() => mover('up')} id="up">UP</button>
          <button onClick={() => mover('right')} id="right">RIGHT</button>
          <button onClick={() => mover('down')} id="down">DOWN</button>
          <button onClick={() => mover('reset')} id="reset">reset</button>
        </div>
        <form onSubmit={onSubmit}>
          <input id="email" type="email" placeholder="type email" onChange={onChange} value={this.state.email}></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}