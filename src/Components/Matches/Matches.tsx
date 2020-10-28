import React, { ReactElement, useEffect } from 'react'

export default function Info(match: any): any {

  useEffect(() => {

    console.log(match)

  }, [])

  return (
    <div className="match-list-container">
      <div>
          {match.gameId}
          <br></br>
          {match.champion}
      </div>
    </div>
  )
}