import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styles.css";
import { API_KEY } from "../../Environment";

interface Props {}

interface Params {
  sumName: string;
}

interface Info {
  tier: string;
  losses: number;
  wins: number;
  rank: string;
  summonerName: string;
  queueType: string;
}

export default function SummonerInfo({}: Props): ReactElement {
  let params: Params = useParams();
  const [summonerInfo, setSummonerInfo] = useState<Info[] | null>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Setting the CORS variable
    const cors = "https://cors-anywhere.herokuapp.com/";
    let sumId = "";

    // First API call, to fetch the unique ID
    axios
      .get(
        `${cors}https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${params.sumName}?api_key=${API_KEY}`
      )
      .then((res) => {
        sumId = res.data.id;
      })
      .catch((err) => {
        console.error(err);
        setSummonerInfo(null);
      })
      // Second API call, to fetch the summoner information
      .then(() => {
        axios
          .get(
            `${cors}https://br1.api.riotgames.com/lol/league/v4/entries/by-summoner/${sumId}?api_key=${API_KEY}`
          )
          .then((res) => {
            const data: [] = res.data;
            console.log(data);
            setSummonerInfo(data);
          })
          .catch((err) => console.error(err));
      });
  }, []);

  return (
    <div className="summoner-info">
      {summonerInfo ? (
        summonerInfo.map((info, index) => {
          console.log(info);
          return (
            <div key={index} className="ranked-queue">
              <div className='ranked-container'>
                <div className='ranked-image'>
                  <img src='https://img.rankedboost.com/wp-content/uploads/2014/09/Season_2019_-_Gold_1.png'></img>
                </div>
                <div className="ranked-info">
                  <div>
                    {info.queueType === "RANKED_FLEX_SR"
                      ? "Ranked Flex"
                      : "Ranked Solo"}
                  </div>
                  <div>
                    {info.tier} {info.rank}
                  </div>
                  <div>Wins: {info.wins}</div>
                  <div>Losses: {info.losses}</div>
                      Win%:{" "}
                      {Math.round((info.wins / (info.losses + info.wins)) * 100)}%
                </div>

              </div>
              <br></br>
            </div>
          );
        })
      ) : (
        <div>No such summoner!</div>
      )}
    </div>
  );
}
