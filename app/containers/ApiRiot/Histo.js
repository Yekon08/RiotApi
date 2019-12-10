import React from 'react'
import styled from 'styled-components'
import ChampHisto from './ChampHisto'
import ItemsHisto from './ItemsHisto'

const Wrapper = styled.div`
    width: 85%;
    height: auto;
`

const Content = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    padding: 5%;
    box-shadow: 0 3px 6px rgb(0, 0, 0, 16%);
    margin-top: 35px;

    &:nth-child(1) {
        margin-top: 0;
    }
`

// API Settings

const myheader = new Headers ({
    'Content-Type': 'application/x-www-form-urlencoded',
})
  
const init = {
    method: 'GET',
    headers: myheader,
    mode: 'cors'
}

export default class Histo extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        let historique = this.props.matchId.matches.map((histo, i) => {
            return (
                this.props.champId.data ? (
                <Content key={'div'+i}>
                    <ChampHisto champData={this.props.champId.data} matchData={this.props.matchId.matches[i]} />
                    <ItemsHisto onChangeWin={this.onChangeWin} matchData={this.props.matchId.matches[i]} summonerName={this.props.summonerName} spellId={this.props.spellId.data} />
                </Content>): <p>ça marche pas </p>
            )
        })

        return (
            <Wrapper className="histo">
                {historique}
            </Wrapper>
        )
    }
}