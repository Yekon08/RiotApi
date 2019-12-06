import React from 'react'

import './ItemsHisto.css'

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
            itemsImg: [],
            spellsImg: [],
            stats: {}
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
                this.test()
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
                    this.test()
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

    test = () => {
        this.state.gameId.teams.map((team) => {
            if(team.teamId == this.state.participantTeamId) {
                this.setState({
                    win: team.win
                })
            }
        })

        console.log('test', this.state.win)

        this.props.onChangeWin(this.state.win)
    }

    render() {

        let items = this.state.itemsImg.map((item, i) => {
            if(item == undefined) {
                return  <div key={'div'+i} className="noItem"></div> 
            } else {
                return <img key={'img'+i} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/item/${item}.png`} />
            }
        })

        let spells = this.state.spellsImg.map((spell, i) => {
            return <img key={'img'+i} alt={'Summoner Spell : '+spell} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/spell/${spell}.png`} />
        })

        return (
            <div className="itemsHisto">
                {items}
                {spells}
                <p>Niveau {this.state.stats.champLvl}</p>
                <p>Assists {this.state.stats.assists}</p>
                <p>Morts {this.state.stats.deaths}</p>
                <p>Kills {this.state.stats.kills}</p>
                <p>CS {this.state.stats.cs}</p>
                {this.state.win == "Win" ? <p>Victoire</p> : <p>Défaite</p>}
            </div>
        )
    }
}