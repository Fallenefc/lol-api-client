import React, { ReactElement, useEffect } from 'react'

export default function Info(summonerInfo: any): any {

  useEffect(() => {

    console.log(summonerInfo)

  }, [])

  return (
    <div className="ranked-queue">
    <div className='ranked-container'>
      <div className='ranked-image'>
        <img src='https://img.rankedboost.com/wp-content/uploads/2014/09/Season_2019_-_Gold_1.png' width='150px' height='160px'></img>
      </div>
      <div className="ranked-info">
        <div>
          {summonerInfo.queueType === "RANKED_FLEX_SR"
            ? "Ranked Flex"
            : "Ranked Solo"}
        </div>
        <div>
          {summonerInfo.tier} {summonerInfo.rank}
        </div>
        <div>Wins: {summonerInfo.wins}</div>
        <div>Losses: {summonerInfo.losses}</div>
            Win Rate:{" "}
            {Math.round((summonerInfo.wins / (summonerInfo.losses + summonerInfo.wins)) * 100)}%
      </div>
    </div>
    <div>
    </div>
    <br></br>
  </div>
  )
}