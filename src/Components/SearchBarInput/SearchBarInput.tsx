import React, { ReactElement, useState } from 'react'

export default function SearchBarInput(): ReactElement {

  const [input, setInput] = useState('')

  const handleClick = (e: any):void => {
    e.preventDefault();
    console.log(input);
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
