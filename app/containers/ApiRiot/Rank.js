import React, { useState, useEffect } from 'react';

import Gold from '../../images/rankIcone/Emblem_Gold.png'
import Iron from '../../images/rankIcone/Emblem_Iron.png'
import Unranked from '../../images/rankIcone/Emblem_Challenger.png'

export default function Rank(props) {
  const { profilRank } = props

  return (
    <div>
      <p>BONJOUR</p>
      { profilRank.tier = "gold" ? <img src={Gold} /> : 
        <img src={Unranked} />
      }
      <p>{profilRank.tier}</p>
    </div>
  )
}

// export default class Rank extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       rankData: [{}]
//     }
//   }

//   componentDidMount() {
//     const url = `http://ec2-15-188-118-182.eu-west-3.compute.amazonaws.com/lol/league/v4/entries/by-summoner/${this.props.profilId}?platform=EUW1`
//     fetch(url, init)
//     .then(response => response.json())
//     .then(json => {
//         const rankData = json
//         console.log('rank data', rankData)
//         this.setState({ rankData: rankData })
//     })
//     .catch(error => console.log(error))
//     .catch(error => console.log(error))
//   }

//   componentDidUpdate(prevState) {
//     if ( prevState.rankData[0] !== this.state.rankData[0] ) {
//       const url = `http://ec2-15-188-118-182.eu-west-3.compute.amazonaws.com/lol/league/v4/entries/by-summoner/${this.props.profilId}?platform=EUW1`
//       fetch(url, init)
//       .then(response => response.json())
//       .then(json => {
//           const rankData = json
//           console.log('rank data', rankData)
//           this.setState({ rankData: rankData })
//       })
//       .catch(error => console.log(error))
//       .catch(error => console.log(error))
//     }
//   }

//   render() {
//     return (
//       <div className="rankContainer">
//         { this.state.rankData[0] = "gold" ? <img src={Gold} /> : 
//           <img src={Unranked} />
//         }
//       </div>
//     );
//   }
// }
