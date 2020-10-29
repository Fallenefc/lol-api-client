import React, { ReactElement, useState } from 'react'
import { useHistory } from "react-router-dom";

export default function SearchBarInput(): ReactElement {

  const [input, setInput] = useState('')
  const history = useHistory();

  const handleClick = (e: any):void => {
    e.preventDefault();
    history.push(`/${input}`)
  }

  const handleChange = (e: any):void => {
    setInput(e.target.value);
  }

  return (
    <div>
      <form onSubmit={handleClick}>
        <input type="text" value={input} onChange={handleChange}/>
        <button onClick={handleClick}>Search</button>
      </form>
    </div>
  )
}

