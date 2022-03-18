// import React from 'react'

// export default class AppClass extends React.Component {
//   render() {
//     const { className } = this.props
//     return (
//       <div id="wrapper" className={className}>
//         <div className="info">
//           <h3 id="coordinates">Coordinates (2, 2)</h3>
//           <h3 id="steps">You moved 0 times</h3>
//         </div>
//         <div id="grid">
//           <div className="square"></div>
//           <div className="square"></div>
//           <div className="square"></div>
//           <div className="square"></div>
//           <div className="square active">B</div>
//           <div className="square"></div>
//           <div className="square"></div>
//           <div className="square"></div>
//           <div className="square"></div>
//         </div>
//         <div className="info">
//           <h3 id="message"></h3>
//         </div>
//         <div id="keypad">
//           <button id="left">LEFT</button>
//           <button id="up">UP</button>
//           <button id="right">RIGHT</button>
//           <button id="down">DOWN</button>
//           <button id="reset">reset</button>
//         </div>
//         <form>
//           <input id="email" type="email" placeholder="type email"></input>
//           <input id="submit" type="submit"></input>
//         </form>
//       </div>
//     )
//   }
// }
import React, { useState } from 'react'
import axios from 'axios'

export default function AppFunctional(props) {
  const URL = 'http://localhost:9000/api/result'
  const grid = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]
  const [cell, setCell] = useState(4)
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const res = getCoordinates(grid, cell)

  function onSubmit(evt){
    evt.preventDefault();
    const useData = {
      'x': res.x + 1,
      'y': res.y + 1,
      'steps': count,
      'email': email
    }
    axios.post(URL, useData)
      .then((res) => {
        console.log(res.data)
        setMessage(res.data.message)
        setEmail(email)
      })
      .catch(err => {
        setMessage(err.response.data.message)
      })
      .finally((res) => {
        setEmail('')
      })
  }
  function onChange(evt){
    const {value} = evt.target
    setEmail(value)
  }

  // function postMessage() {
  //   // const postData = {
  //   //   x: res.x,
  //   //   y: res.y,
  //   //   steps: count,
  //   //   email: email
  //   // }
  //   const postData = {
  //     x: 1,
  //     y: 2,
  //     steps: 3,
  //     email: "lady@gaga.com"
  //   }
  //   axios.post(URL, postData)
  //     .then(res => {
  //       console.log(res)
  //     })
  // }
  
  function getCoordinates(grid, cell){
    for(let y = 0; y < grid.length; y++) {
      for(let x = 0; x < grid[y].length; x++) {
        if(grid[y][x] === cell){
          return { x, y }
        }
      }
    }
  }

  function coordinateCheck(xAct, yAct){
    if(res.x === xAct && res.y === yAct){
      return 'square active'
    }
    return 'square'
  }

  function checkB(xAct, yAct){
    if(res.x === xAct && res.y === yAct){
      return 'B'
    }
    return ''
  }


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {`(${(res.x)+1},${(res.y)+1})`}</h3>
        <h3 id="steps">You moved {count} times</h3>
      </div>
      <div id="grid">
        <div className={coordinateCheck(0,0)}>{checkB(0,0)}</div>
        <div className={coordinateCheck(1,0)}>{checkB(1,0)}</div>
        <div className={coordinateCheck(2,0)}>{checkB(2,0)}</div>
        <div className={coordinateCheck(0,1)}>{checkB(0,1)}</div>
        <div className={coordinateCheck(1,1)}>{checkB(1,1)}</div>
        <div className={coordinateCheck(2,1)}>{checkB(2,1)}</div>
        <div className={coordinateCheck(0,2)}>{checkB(0,2)}</div>
        <div className={coordinateCheck(1,2)}>{checkB(1,2)}</div>
        <div className={coordinateCheck(2,2)}>{checkB(2,2)}</div>
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => {
          cell === 0 || cell === 3 || cell === 6 ? setCell(cell) : setCell(cell - 1); 
          cell === 0 || cell === 3 || cell === 6 ? setCount(count) : setCount(count + 1);
          cell === 0 || cell === 3 || cell === 6 ? setMessage("You can't go left") : setMessage('')}} 
          id="left">LEFT</button>
        <button onClick={() => {
          cell === 0 || cell === 1 || cell === 2 ? setCell(cell) : setCell(cell - 3);
          cell === 0 || cell === 1 || cell === 2 ? setCount(count) : setCount(count + 1)
          cell === 0 || cell === 1 || cell === 2 ? setMessage("You can't go up") : setMessage('')}} 
          id="up">UP</button>
        <button onClick={() => {
          cell === 2 || cell === 5 || cell === 8 ? setCell(cell) : setCell(cell + 1);
          cell === 2 || cell === 5 || cell === 8 ? setCount(count) : setCount(count + 1)
          cell === 2 || cell === 5 || cell === 8 ? setMessage("You can't go right") : setMessage('')}} 
          id="right">RIGHT</button>
        <button onClick={() => {
          cell === 6 || cell === 7 || cell === 8 ? setCell(cell) : setCell(cell + 3);
          cell === 6 || cell === 7 || cell === 8 ? setCount(count) : setCount(count + 1)
          cell === 6 || cell === 7 || cell === 8 ? setMessage("You can't go down") : setMessage('')}} 
          id="down">DOWN</button>
        <button onClick={() => {setCell(4); setCount(0); setMessage('')}} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" onChange={onChange} value={email}></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}