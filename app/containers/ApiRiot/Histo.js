import React from 'react'

import ChampHisto from './ChampHisto'
import ItemsHisto from './ItemsHisto'

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
                <div key={'div'+i}>
                    <ChampHisto champData={this.props.champId.data} matchData={this.props.matchId.matches[i]} />
                    <ItemsHisto matchData={this.props.matchId.matches[i]} summonerName={this.props.summonerName} spellId={this.props.spellId.data} />
                </div>): <p>ça marche pas </p>
            )
        })

        return (
            <div className="histo">
                {historique}
            </div>
        )
    }
}