import React from 'react'

import './ChampHisto.css'

export default class ChampHisto extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tables = []
        const tables2 = []
        const champDataMap = Object.values(this.props.champData)
        const matches = this.props.matchData.matches.map((matche) => {
            tables.push(matche.champion)
        })

        const champs = champDataMap.map((champ) => {
            for (let i=0; i<tables.length ; i++) {
                if(tables[i] == champ.key) {
                    tables2.push({ name: champ.id, id: i})
                }
            }
        })

        tables2.sort((a, b) => {
            return a.id - b.id
        })

        let champImg = tables2.map((champ,i) => {
            return (
                <div key={'div'+i}>
                    <p key={i}>Nom : {champ.name} ID : {champ.id}</p>
                    <img key={'img'+i} alt={champ.name+ ' Image'} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/champion/${champ.name}.png`} />
                </div>
            )
        })

        return (
            <div className="matchContainer">
                {champImg}
            </div>
        )
    }
}