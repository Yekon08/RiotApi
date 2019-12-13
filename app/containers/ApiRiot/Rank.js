import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;
  /* padding: 5%;
  box-shadow: 0 3px 6px rgb(0, 0, 0, 16%);
  border-radius: 5px; */
  margin-top: 35px;

  & img {
    max-width: 250px;
  }

  & p {
    margin: 0;
     font-size: 1.125rem;
     text-align: center;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  & p {
    margin-right: 10px;

    &:nth-last-child(1) {
      margin-right: 0;
    }
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
        const winRate = (profilRank[i].wins/(profilRank[i].wins + profilRank[i].losses)).toString().slice(2,4)
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
    
            <Flex>
              <p>{profilRank[i].tier}</p>
              <p>{profilRank[i].rank}</p>
            </Flex>

            <Flex>
              <p>{profilRank[i].leaguePoints} LP</p>
              <p>{profilRank[i].losses}</p>
              <p>{profilRank[i].wins}</p>
            </Flex>

            <p>Winrate: {winRate}%</p>
          </Container>
        )
      }
    }
  }


  return (
    <RankDetails />
  )
}