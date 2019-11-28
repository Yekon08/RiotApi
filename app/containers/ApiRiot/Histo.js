import React from 'react'

import Match from './Match'

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
        this.state = {
            champId: []
        }
    }

    componentDidMount() {
        const url = `http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json`
        fetch(url, init)
            .then(response => response.json())
            .then(json => {
                const data = json
                console.log('champId : ', data)
                this.setState({ champId: data })
            })
            .catch(error => console.log(error)) // error json
            .catch(error => console.log(error)) // error api
    }

    render() {
        return (
            <div className="histo">
                {this.state.champId.data ? <Match champData={this.state.champId.data} matchData={this.props.matchId} /> : <p>ça marche pas </p> }
            </div>
        )
    }
}