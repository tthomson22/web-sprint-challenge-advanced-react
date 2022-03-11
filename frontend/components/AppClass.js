import React from 'react'
import axios from 'axios'

const URL = 'http://localhost:9000/api/result'

const initialData = {
  x: 2,
  y: 2,
  steps: 0,
  email: '',
} 

export default class AppClass extends React.Component {
  constructor(props){
    super(props)
    this.state = initialData
  }


  postData = () => {
    preventDefault()
    const newInput = {
      x: this.state.x,
      y: this.state.y,
      steps: this.state.steps,
      email: this.state.email,
    }
    axios.post(URL, newInput)
      .then(res => {
        console.log(res.message)
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates (2, 2)</h3>
          <h3 id="steps">You moved 0 times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button id="left">LEFT</button>
          <button id="up">UP</button>
          <button id="right">RIGHT</button>
          <button id="down">DOWN</button>
          <button id="reset">reset</button>
        </div>
        <form onSubmit={this.postData}>
          <input id="email" type="email" placeholder="type email"></input>
          <input id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
