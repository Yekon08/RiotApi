import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: column;

  & img {
    max-width: 250px;
    margin-bottom: 10px;
  }

  & p {
    margin: 0;
     font-size: 1.125rem;
     text-align: center;
  }

  @media screen and (max-width: 767px) {
      width: auto;
      height: auto;
      margin-top: 15px;
  }
`

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  & p {
    margin-right: 10px;

    &:nth-last-child(1) {
      margin-right: 0;
    }
  }

  @media screen and (max-width: 767px) {
    & p {
      margin-right: 7px;
      font-size: 1rem;
    }
  }
`

const Win = styled.p`
  color: #61b3d4;
  font-weight: bold;
`

const Lose = styled.p`
  color: #c6443e;
  font-weight: bold;
`

const Elo = styled.p`
  font-weight: bold;

  &:nth-last-child(1) {
    font-weight: 500;
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
              profilRank[i].tier == "SILVER" ? Silver :
              profilRank[i].tier == "GOLD" ? Gold :
              profilRank[i].tier == "PLATINUM" ? Platinum :
              profilRank[i].tier == "DIAMOND" ? Diamond :
              profilRank[i].tier == "MASTER" ? Master :
              profilRank[i].tier == "GRANDMASTER" ? Grandmaster :
              profilRank[i].tier == "CHALLENGER" ? Challenger : Uranked } />
    
            <Flex>
              <Elo>{profilRank[i].tier}</Elo>
              <Elo>{profilRank[i].rank}</Elo>
            </Flex>

            <Flex>
              <Elo>{profilRank[i].leaguePoints}LP</Elo>
              <Win>{profilRank[i].wins}V</Win>
              <Lose>{profilRank[i].losses}D</Lose>
            </Flex>

            <Elo>Winrate: {winRate}%</Elo>
          </Container>
        )
      }
    }
  }


  return (
    <RankDetails />
  )
}