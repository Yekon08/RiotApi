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
            itemsImg: []
        }
        console.log('itemsHisto: ', this.props.matchData.matches)
        console.log('nom: ', this.props.summonerName)
    }

    componentDidMount() {
        const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/match/v4/matches/${this.props.matchData.matches[4].gameId}?platform=EUW1`
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

    componentDidUpdate(prevProps) {
        if(prevProps.matchData !== this.props.matchData) {
            console.log('update')
            const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/match/v4/matches/${this.props.matchData.matches[4].gameId}?platform=EUW1`
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
    }

    test1 = () => {
        console.log('participant identities: ', this.state.gameId.participantIdentities)

        this.state.gameId.participantIdentities.map((info) => {
            console.log('infos: ', info.player.summonerName)

            if(info.player.summonerName == this.props.summonerName) {
                this.setState({ participantId: info.participantId })
            }
        })

        console.log('Participant ID :', this.state.participantId)
        this.test2()
    }

    test2 = () => {
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
                }
            })
        }
        console.log('State img item: ', this.state.itemsImg)
    }

    render() {

        let items = this.state.itemsImg.map((item) => {
            console.log('item: ', item)
            if(item == undefined) {
                return  <div className="noItem"></div> 
            } else {
                return <img src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/item/${item}.png`} />
            }

        })

        return(
            <div className="itemsHisto">
                {items}
            </div>
        )
    }
}