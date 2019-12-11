import React from 'react'
import styled from 'styled-components'
import convert from 'convert-seconds'
import date from 'date-and-time'

const Wrapper = styled.div`
    width: 100%;
    height: auto;

    & p {
        font-size: 1.125rem;
    }
`

const NoItem = styled.div`
    width: 65px;
    height: 65px;
    opacity: 0.3;
    border-radius: 5%;
    background: #A0C5E8;
    display: inline-block;
    margin-right: 15px;
`

const ItemsContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 65px;

    & img {
        margin-right: 15px;
        border-radius: 5%;
        box-shadow: 0 3px 6px rgb(0, 0, 0, 16%);

        &:nth-last-child(1) {
            margin-right: 0
        }
    }
`

const SpellsContainer = styled.div`
    width: 65px;
    height: auto;
    display: flex;
    flex-direction: column;

    & img {
        border-radius: 5%;
        box-shadow: 0 3px 6px rgb(0, 0, 0, 16%)
    }

    & img:nth-last-child(1) {
        margin-top: 10px;
    }
`

const KdaContainer = styled.div`
    display: flex;
    align-items: center;
    width: auto;
    height: auto;

    & p {
        margin: 0 15px 0 0;
        text-align: center;

        &:nth-last-child(1) {
            margin: 0
        }
    }
`
const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const WinColor = styled.p`
    text-align: center;
    color: ${props => props.win == "win" ? '#61b3d4' : '#c6443e'};
    margin: 0;
`

const Container = styled.div`
    & p {
        margin: 0;
    }
`

const GameDurationContainer = styled.div`
    display: flex;
    justify-content: center;

    & p {
        margin: 0;
        text-align: center;
    }
`

const GameDate = styled.p`
    &&& {
        font-size: 1rem;
        text-align: center
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

export default class ItemsHisto extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            gameId: [],
            participantId: Number,
            participantTeamId: Number,
            win: "",
            gameDuration: {},
            gameDate: "",
            itemsImg: [],
            spellsImg: [],
            stats: {},
        }
    }

    componentDidMount() {
        const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/match/v4/matches/${this.props.matchData.gameId}?platform=EUW1`
        fetch(url, init)
            .then(response => response.json())
            .then(json => {
                const data = json
                console.log('gameId : ', data)
                this.setState({ gameId: data })
                this.itemsFunction()
                this.win()
                this.durationGame()
            })
            .catch(error => console.log(error)) // error json
            .catch(error => console.log(error)) // error api
    }

    componentDidUpdate(prevProps) {
        if(prevProps.matchData !== this.props.matchData) {
            console.log('update')
            const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/match/v4/matches/${this.props.matchData.gameId}?platform=EUW1`
            fetch(url, init)
                .then(response => response.json())
                .then(json => {
                    const data = json
                    console.log('gameId : ', data)
                    this.setState({ gameId: data })
                    this.itemsFunction()
                    this.win()
                    this.durationGame()
                })
                .catch(error => console.log(error)) // error json
                .catch(error => console.log(error)) // error api
        }
    }

    itemsFunction = () => {
        this.state.gameId.participantIdentities.map((info) => {
            if (info.player.summonerName == this.props.summonerName) {
                this.setState({ participantId: info.participantId })
            }
        })

        if(this.state.participantId >= 0){
            this.state.gameId.participants.map((info) => {
                if(info.participantId == this.state.participantId) {
                    this.setState({
                        itemsImg: [
                        info.stats.item0,
                        info.stats.item1,
                        info.stats.item2,
                        info.stats.item3,
                        info.stats.item4,
                        info.stats.item5,
                        info.stats.item6 ]
                    })

                    this.setState({
                        participantTeamId: info.teamId
                    })

                    this.setState({
                        stats: {
                            champLvl: info.stats.champLevel,
                            assists: info.stats.assists,
                            deaths: info.stats.deaths,
                            kills: info.stats.kills,
                            cs: info.stats.totalMinionsKilled
                        }
                    })

                    const spellDataMap = Object.values(this.props.spellId)
                    const spells = spellDataMap.map((spell, i) => {
                        if (spell.key == info.spell1Id) {
                            this.setState({ spellsImg: [...this.state.spellsImg, spell.id] })
                        }
                        if (spell.key == info.spell2Id) {
                            this.setState({ spellsImg: [...this.state.spellsImg, spell.id] })
                        }
                    })
                }
            })
        }
    }

    win = () => {
        this.state.gameId.teams.map((team) => {
            if(team.teamId == this.state.participantTeamId) {
                this.setState({
                    win: team.win
                })
            }
        })
    }

    durationGame = () => {
        this.setState({
            gameDuration: convert(this.state.gameId.gameDuration)
        })

        this.setState({
            gameDate: date.format(new Date(this.props.timestamp), 'DD/MM/YYYY')
        })
    }

    render() {

        let items = this.state.itemsImg.map((item, i) => {
            if(item == undefined) {
                return  <NoItem key={'div'+i}></NoItem> 
            } else {
                return <img key={'img'+i} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/item/${item}.png`} />
            }
        });

        let spells = this.state.spellsImg.map((spell, i) => {
            return (
                    <img key={'img'+i} alt={'Summoner Spell : '+spell} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/spell/${spell}.png`} />
                )
        })

        return (
            <Wrapper win={this.state.win}>
                <Flex>
                    <SpellsContainer>
                        {spells}
                    </SpellsContainer>
                    <KdaContainer>
                        <p>Niveau : {this.state.stats.champLvl}</p>
                        <p>KDA : </p>
                        <p>{this.state.stats.kills}</p>
                        <p>/</p>
                        <p>{this.state.stats.assists}</p>
                        <p>/</p>
                        <p>{this.state.stats.deaths}</p>
                        <p>CS : {this.state.stats.cs}</p>
                    </KdaContainer>

                    <Container>
                        {this.state.win == "Win" ? <WinColor win="win">Victoire</WinColor> : <WinColor>Défaite</WinColor>}
                        <GameDurationContainer>
                            {this.state.gameDuration.hours > 0 ? <p>{this.state.gameDuration.hours}</p> : ''}
                            {this.state.gameDuration.hours > 0 ? <p>:</p> : ''}
                            <p>{this.state.gameDuration.minutes}</p>
                            <p>:</p>
                            <p>{this.state.gameDuration.seconds}</p>
                        </GameDurationContainer>
                        <GameDate>
                            {this.state.gameDate}
                        </GameDate>
                    </Container>
                </Flex>
                
                <ItemsContainer>
                    {items}
                </ItemsContainer>
            </Wrapper>
        )
    }
}