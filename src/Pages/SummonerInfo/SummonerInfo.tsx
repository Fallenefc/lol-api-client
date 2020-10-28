import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styles.css";
import { API_KEY } from "../../Environment";
import Info from "../../Components/Info/Info";

interface Props {}

interface Params {
  sumName: string;
}

interface InfoInterface {
  tier: string;
  losses: number;
  wins: number;
  rank: string;
  summonerName: string;
  queueType: string;
}

interface Match {
  platformId: string,
  gameId: number,
  champion: number,
  queue: number,
  season: number,
  timestamp: number,
  role: string,
  lane: string
}

export default function SummonerInfo({}: Props): ReactElement {
  let params: Params = useParams();
  const [summonerInfo, setSummonerInfo] = useState<InfoInterface[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [matchList, setMatchList] = useState<Match[] | null>(null);

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
    <div>
      {summonerInfo ? summonerInfo[0].summonerName : <div></div>}
      {summonerInfo ?
      summonerInfo.map((value, index) => {
        return <Info {...value} key={index}/>
      })
      :
      <div>Loading</div>
      }
    </div>
  );
}
