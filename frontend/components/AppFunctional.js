import React, { useState } from 'react'


export default function AppFunctional(props) {
  const [x, setX] = useState(2)
  const [y, setY] = useState(2)
  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates {`(${x}, ${y})`}</h3>
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
        <button onClick={() => setX(x - 1)} id="left">LEFT</button>
        <button onClick={() => setY(y + 1)} id="up">UP</button>
        <button onClick={() => setX(x + 1)} id="right">RIGHT</button>
        <button onClick={() => setY(y - 1)} id="down">DOWN</button>
        <button onClick={() => setX(2) && setY(2)} id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  )
}