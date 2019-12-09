import React from 'react'

import './ChampHisto.css'

export default class ChampHisto extends React.Component {
        constructor(props) {
            super(props)
        }
    
        render() {
           
            const champDataMap = Object.values(this.props.champData)
            const champs = champDataMap.map((champ, i) => {
                if (champ.key == this.props.matchData.champion) {
                    return (
                        <div key={'div'+i}>
                            <img key={'img'+i} alt={champ.name+ ' Image'} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/champion/${champ.id}.png`} />
                            <h3 key={'h3'+i}>{champ.name}</h3>
                        </div>
                    )
                }
            })

            return (
                <div className="ChampContainer">
                    {champs}
                </div>
            )
        }
    }