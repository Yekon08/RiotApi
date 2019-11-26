import React from 'react'
import Test2 from './Test2'

export default class Test extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tables = []
        const tables2 = []
        const champDataMap = Object.values(this.props.champData)
        const tests = this.props.matchData.matches.map((test) => {
            tables.push(test.champion)
        })

        console.log('test', tables)

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

        console.log('tables2: ',tables2)

        console.log('champData: ',this.props.champData)

        return (
            <div>
                {
                    tables2.map((champ,i) => {
                        return (
                            <div>
                                <p key={i}>Nom : {champ.name} ID : {champ.id}</p>
                                <img key={'img'+i} alt={champ.name+ ' Image'} src={`http://ddragon.leagueoflegends.com/cdn/9.23.1/img/champion/${champ.name}.png`} />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}