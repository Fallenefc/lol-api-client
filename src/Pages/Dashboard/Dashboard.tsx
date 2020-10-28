import React, { ReactElement, useEffect } from 'react'
import SearchBarInput from '../../Components/SearchBarInput/SearchBarInput'
import './styles.css'

export default function Dashboard(): ReactElement {

  return (
    <div className='dashboard-container'>
      <div className='content-container'>
        <SearchBarInput />
      </div>
    </div>
  )
}
