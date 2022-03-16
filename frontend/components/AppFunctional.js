import React, { useState } from 'react'
import axios from 'axios'

export default function AppFunctional(props) {
  const URL = 'http://localhost:9000/api/result'
  const grid = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8]
  ]
  const [status, setStatus] = useState()
  const [cell, setCell] = useState(4)
  const [count, setCount] = useState(0)
  const res = getCoordinates(grid, cell)

  const [data, setData] = useState({
    x: res.x,
    y: res.y,
    steps: count,
    email: ''
  })


  function onSubmit(evt){
    evt.preventDefault();
    const useData = {
      x: data.x,
      y: data.y,
      steps: data.count,
      email: data.email
    }
    axios.post(URL, useData)
      .then((res) => {
        console.log(res)
      })
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

  function errorMessage(status){
    if(message === 'left'){
      return "You can't go left"
    }
    else if(message === 'up'){
      return "You can't go up"
    }
    else if(message === 'right'){
      return "You can't go right"
    }
    else if(message === 'down'){
      return "You can't go down"
    }
    else {
      return ''
    }
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
        <h3 id="message">{status}</h3>
      </div>
      <div id="keypad">
        <button onClick={() => {
          cell === 0 || cell === 3 || cell === 6 ? setCell(cell) : setCell(cell - 1); 
          cell === 0 || cell === 3 || cell === 6 ? setCount(count) : setCount(count + 1);
          cell === 0 || cell === 3 || cell === 6 ? setStatus("You can't go left") : setStatus('')}} 
          id="left">LEFT</button>
        <button onClick={() => {
          cell === 0 || cell === 1 || cell === 2 ? errorMessage('up') : setCell(cell - 3);
          cell === 0 || cell === 1 || cell === 2 ? setCount(count) : setCount(count + 1)
          cell === 0 || cell === 1 || cell === 2 ? setStatus("You can't go up") : setStatus('')}} 
          id="up">UP</button>
        <button onClick={() => {
          cell === 2 || cell === 5 || cell === 8 ? errorMessage('right') : setCell(cell + 1);
          cell === 2 || cell === 5 || cell === 8 ? setCount(count) : setCount(count + 1)
          cell === 2 || cell === 5 || cell === 8 ? setStatus("You can't go right") : setStatus('')}} 
          id="right">RIGHT</button>
        <button onClick={() => {
          cell === 6 || cell === 7 || cell === 8 ? errorMessage('down') : setCell(cell + 3);
          cell === 6 || cell === 7 || cell === 8 ? setCount(count) : setCount(count + 1)
          cell === 6 || cell === 7 || cell === 8 ? setStatus("You can't go down") : setStatus('')}} 
          id="down">DOWN</button>
        <button onClick={() => {setCell(4); setCount(0); setStatus('')}} id="reset">reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}