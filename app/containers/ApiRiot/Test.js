import React from 'react'

export default class Test extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const tables = []
        const champDataMap = Object.values(this.props.champData)
        const tests = this.props.matchData.matches.map((test) => {
            tables.push(test.champion)
        })

        console.log('test', tables)

        const champs = champDataMap.map((champ) => {
            for (let i=0; i<10 ; i++) {
                if(champ.key == tables[i]) {
                    return (
                        <li key={champ.key}>{champ.id}</li>
                    )
                }
            }
        })

        console.log('champs',champs)

        return(
            <div>
               <ul>
                   {champs}
               </ul>
            </div>
        )
    }
}