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
                }
            })
        }
    }

    render() {

        let items = this.state.itemsImg.map((item, i) => {
            if(item == undefined) {
                return  <div key={'div'+i} className="noItem"></div> 
            } else {
                return <img key={'img'+i} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/item/${item}.png`} />
            }
        })

        const spellDataMap = Object.values(this.props.spellId)
        console.log('spells: ', spellDataMap[2])

        return (
            <div className="itemsHisto">
                {items}
            </div>
        )
    }
}