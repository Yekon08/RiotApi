import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;

    & img {
      max-width: 300px;
    }

    & p {
      margin-left: 25px;
    }
`

import Uranked from '../../images/rankIcone/Emblem_Unranked.png'
import Iron from '../../images/rankIcone/Emblem_Iron.png'
import Bronze from '../../images/rankIcone/Emblem_Bronze.png'
import Silver from '../../images/rankIcone/Emblem_Silver.png'
import Gold from '../../images/rankIcone/Emblem_Gold.png'
import Platinum from '../../images/rankIcone/Emblem_Platinum.png'
import Diamond from '../../images/rankIcone/Emblem_Diamond.png'
import Master from '../../images/rankIcone/Emblem_Master.png'
import Grandmaster from '../../images/rankIcone/Emblem_Grandmaster.png'
import Challenger from '../../images/rankIcone/Emblem_Challenger.png'

export default function Rank(props) {
  const { profilRank } = props

  let RankDetails = () => {
    for (let i=0; i<3; i++) {
      if (profilRank[i].queueType == "RANKED_SOLO_5x5") {
        return(
          <Container>
            <img alt={profilRank[i].tier + ' Emblem'} src={
              profilRank[i].tier == "IRON" ? Iron :
              profilRank[i].tier == "BRONZE" ? Bronze :
              profilRank[i].tier == "Silver" ? Silver :
              profilRank[i].tier == "GOLD" ? Gold :
              profilRank[i].tier == "PLATINUM" ? Platinum :
              profilRank[i].tier == "DIAMOND" ? Diamond :
              profilRank[i].tier == "MASTER" ? Master :
              profilRank[i].tier == "GRANDMASTER" ? Grandmaster :
              profilRank[i].tier == "CHALLENGER" ? Challenger : Uranked } />
    
            <p>{profilRank[i].queueType}</p>
            <p>{profilRank[i].tier}</p>
            <p>{profilRank[i].rank}</p>
            <p>{profilRank[i].leaguePoints} LP</p>
            <p>{profilRank[i].losses}</p>
            <p>{profilRank[i].wins}</p>
          </Container>
        )
      }
    }
  }


  return (
    <RankDetails />
  )
}