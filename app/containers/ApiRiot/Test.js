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
                    tables2.push(champ.name)
                }
            }
        })

        console.log(tables2)

        return(
            <div>
                <ul>
                    {
                        tables2.map((item,i) => {
                            return <li key={item}>{item}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}