import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    margin-right: 2%;

    @media screen and (max-width: 1050px) {
        height: auto;
        margin-right: 0;
    }
`

const ChampName = styled.h3`
    text-align: center;
    font-size: 1.5rem;
    margin: 10px 0 0 0;

    @media screen and (max-width: 1050px) {
        font-size: 1.25rem;
    }
`

const ChampImg = styled.img`
    width: 138px;
    height: auto;
    border-radius: 5%;
    box-shadow: 0 3px 6px rgb(0, 0, 0, 16%);

    @media screen and (max-width: 1050px) {
        width: auto;
    }
`



export default class ChampHisto extends React.Component {
        constructor(props) {
            super(props)
        }
    
        render() {
           
            const champDataMap = Object.values(this.props.champData)
            const champs = champDataMap.map((champ, i) => {
                if (champ.key == this.props.matchData.champion) {
                    return (
                        <div key={'div'+i}>
                            <ChampImg key={'img'+i} alt={champ.name+ ' Image'} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/champion/${champ.id}.png`} />
                            <ChampName key={'h3'+i}>{champ.name}</ChampName>
                        </div>
                    )
                }
            })

            return (
                <Container>
                    {champs}
                </Container>
            )
        }
    }