import React, { useState } from 'react'



export default function AppFunctional(props) {
  const [x, setX] = useState(2)
  const [y, setY] = useState(2)
  const [count, setCount] = useState(0)

  function coordinateCheck(xAct, yAct){
    if(x === xAct && y === yAct){
      return 'square active'
    }
    return 'square'
  }

  function checkB(xAct, yAct){
    if(x === xAct && y === yAct){
      return 'B'
    }
    return ''
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {`(${x},${y})`}</h3>
        <h3 id="steps">You moved {count} times</h3>
      </div>
      <div id="grid">
        <div className={coordinateCheck(1,1)}>{checkB(1,1)}</div>
        <div className={coordinateCheck(2,1)}>{checkB(2,1)}</div>
        <div className={coordinateCheck(3,1)}>{checkB(3,1)}</div>
        <div className={coordinateCheck(1,2)}>{checkB(1,2)}</div>
        <div className={coordinateCheck(2,2)}>{checkB(2,2)}</div>
        <div className={coordinateCheck(3,2)}>{checkB(3,2)}</div>
        <div className={coordinateCheck(1,3)}>{checkB(1,3)}</div>
        <div className={coordinateCheck(2,3)}>{checkB(2,3)}</div>
        <div className={coordinateCheck(3,3)}>{checkB(3,3)}</div>
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button onClick={() => {setX(x - 1); setCount(count + 1)}} id="left">LEFT</button>
        <button onClick={() => {setY(y - 1); setCount(count + 1)}} id="up">UP</button>
        <button onClick={() => {setX(x + 1); setCount(count + 1)}} id="right">RIGHT</button>
        <button onClick={() => {setY(y + 1); setCount(count + 1)}} id="down">DOWN</button>
        <button onClick={() => {setX(2); setY(2); setCount(0)}} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}