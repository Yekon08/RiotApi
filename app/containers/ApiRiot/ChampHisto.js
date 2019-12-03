import React from 'react'

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
                            <p key={'p'+i}>{champ.name}</p>
                            <img key={'img'+i} alt={champ.name+ ' Image'} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/champion/${champ.id}.png`} />
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