import React, { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./styles.css";
import { API_KEY } from "../../Environment";
import Info from "../../Components/Info/Info";
import Matches from "../../Components/Matches/Matches";
import { API_URLS } from '../../Utils/URLs'

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

interface MatchInterface {
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
  const [matchList, setMatchList] = useState<MatchInterface[] | null>(null);

  useEffect(() => {
    // Setting the CORS variable
    const cors = "https://cors-anywhere.herokuapp.com/";
    let sumId = "";
    let accId = '';

    // First API call, to fetch the unique ID
    axios
      .get(
        `${cors}${API_URLS.GET_NAME}${params.sumName}?api_key=${API_KEY}`
      )
      .then((res) => {
        sumId = res.data.id;
        accId = res.data.accountId;
      })
      .catch((err) => {
        console.error(err);
        setSummonerInfo(null);
      })
      // Second API call, to fetch the summoner information
      .then(() => {
        axios
          .get(
            `${cors}${API_URLS.SUMMONER_INFO}${sumId}?api_key=${API_KEY}`
          )
          .then((res) => {
            setSummonerInfo(res.data);
          })
          .catch((err) => console.error(err));

        axios
          .get(
            `${cors}${API_URLS.MATCH_LIST}${accId}?api_key=${API_KEY}`
          )
          .then((res) => {
            const data: [] = res.data.matches.slice(0,5);
            console.log(data);
            setMatchList(data);
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
      <div>Loading Ranked Info</div>
      }
      <div className='match-list'>
        {matchList ?
          matchList.map((match, index) => {
            return <Matches {...match} key={index}/>
          })
          : <div>Loading Matches</div>
        }
      </div>
    </div>
  );
}
