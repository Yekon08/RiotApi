import React from 'react'

import './Histo.css'

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
        this.state = {
            winTest: ""
        }
    }

    onChangeWin = (e) => {
        // if(this.state.winTest.length > 10) {
        //     this.setState({
        //         winTest: [e]
        //     })
        // } else {
        //     this.setState({
        //         winTest: [...this.state.winTest,e]
        //     })
        // }
            this.setState({
                winTest: e
            })


        console.log('onchange : ', this.state.winTest)

        // Styled Components intéragir avec du css de contenu parent
    }

    render() {

        let historique = this.props.matchId.matches.map((histo, i) => {
            return (
                this.props.champId.data ? (
                <div key={'div'+i} className={this.state.winTest}>
                    <ChampHisto champData={this.props.champId.data} matchData={this.props.matchId.matches[i]} />
                    <ItemsHisto onChangeWin={this.onChangeWin} matchData={this.props.matchId.matches[i]} summonerName={this.props.summonerName} spellId={this.props.spellId.data} />
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