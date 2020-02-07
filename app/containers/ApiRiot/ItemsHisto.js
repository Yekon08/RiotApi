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

    @media screen and (max-width: 1050px) {
        & p {
            font-size: 1rem;
        }
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

    @media screen and (max-width: 1050px) {
        width: 55px;
        height: 55px;
        margin-right: 10px;
        margin-top: 10px;
    }
`

const ItemsContainer = styled.div`
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
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

    @media screen and (max-width: 1050px) {
        margin-right: 0;
        justify-content: center;
        align-items: center;

        & img {
            width: 55px;
            height: 55px;
            margin-right: 10px;
            margin-top: 10px;
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

    @media screen and (max-width: 1050px) {
        flex-direction: row;
        justify-content: center;
        width: auto;
        margin: 10px 0;

        & img {
            width: 55px;
            height: 55px;
        }

        & img:nth-last-child(1) {
            margin-top: 0;
            margin-left: 10px
        }
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

    @media screen and (max-width: 1050px) {
        flex-wrap: wrap; 
        justify-content: center;
        margin: 10px 0;

        & p {
            margin-right: 10px;
        }
    }
`

const Bold  = styled.p`
    font-weight: bold;
`

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 1050px) {
        justify-content: center;
        flex-direction: column;
    }
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
            spellsImg1: "",
            spellsImg2: "",
            stats: {},
        }
    }

    componentDidMount() {
        const url = `http://15.188.6.8/lol/match/v4/matches/${this.props.matchData.gameId}?platform=EUW1`
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
            const url = `http://15.188.6.8/lol/match/v4/matches/${this.props.matchData.gameId}?platform=EUW1`
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
                            this.setState({ spellsImg1: spell.id })
                        }
                        if (spell.key == info.spell2Id) {
                            this.setState({ spellsImg2: spell.id })
                        }
                    })
                    console.log('spellsImg1: ', this.state.spellsImg1)
                    console.log('spellsImg2: ', this.state.spellsImg2)
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

        return (
            <Wrapper win={this.state.win}>
                <Flex>
                    <SpellsContainer>
                        {this.state.spellsImg1.length > 0 ? <img alt={'Summoner Spell : '+this.state.spellsImg1} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/spell/${this.state.spellsImg1}.png`} /> : ''}
                        {this.state.spellsImg2.length > 0 ? <img alt={'Summoner Spell : '+this.state.spellsImg2} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/spell/${this.state.spellsImg2}.png`} /> : ''}
                    </SpellsContainer>
                    <KdaContainer>
                        <p>Niveau : </p>
                        <Bold>{this.state.stats.champLvl}</Bold>
                        <p>KDA : </p>
                        <Bold>{this.state.stats.kills}</Bold>
                        <p>/</p>
                        <Bold>{this.state.stats.assists}</Bold>
                        <p>/</p>
                        <Bold>{this.state.stats.deaths}</Bold>
                        <p>CS : </p>
                        <Bold>{this.state.stats.cs}</Bold>
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
