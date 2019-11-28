import React from 'react'
import { number } from 'prop-types'

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
            participantId: Number
        }
        console.log('itemsHisto: ', this.props.matchData.matches)
        console.log('nom: ', this.props.summonerName)
    }

    componentDidMount() {
        const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/match/v4/matches/${this.props.matchData.matches[0].gameId}?platform=EUW1`
        fetch(url, init)
            .then(response => response.json())
            .then(json => {
                const data = json
                console.log('gameId : ', data)
                this.setState({ gameId: data })
                this.test1()
            })
            .catch(error => console.log(error)) // error json
            .catch(error => console.log(error)) // error api
    }

    test1 = () => {
        console.log('ParticipantID 0 ', this.state.gameId.participants[0].participantId) // Participant ID
        console.log('participant identities: ', this.state.gameId.participantIdentities)

        this.state.gameId.participantIdentities.map((info) => {
            console.log('infos: ', info.player.summonerName)

            if(info.player.summonerName == this.props.summonerName) {
                console.log('ok :', info.participantId)
                this.setState({ participantId: info.participantId })
            }
        })

        console.log('Participant ID :', this.state.participantId)
    }

    render() {

        const tables = []
        if(this.state.participantId >= 0){
            this.state.gameId.participants.map((info) => {
                console.log('stats: ', info.championId)
    
                if(info.participantId == this.state.participantId) {
                    tables.push(
                        info.stats.item0,
                        info.stats.item1,
                        info.stats.item2,
                        info.stats.item3,
                        info.stats.item4,
                        info.stats.item5,
                        info.stats.item6,
                    )
                }
            })
        }

        console.log('tableaux items: ', tables)

        let items = tables.map((item) => {
            return (
                <img src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/item/${item}.png`} />
            )
        })

        return(
            <div className="itemsHisto">
                <p>test Items</p>
                {items}
            </div>
        )
    }
}