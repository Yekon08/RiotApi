/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';

// Import CSS HomePage
import './HomePage.css'

// Import
import PagePerso from '../ApiRiot/PagePerso'
import Rank from '../ApiRiot/Rank'
import Histo from '../ApiRiot/Histo'

// API Settings

const myheader = new Headers ({
  'Content-Type': 'application/x-www-form-urlencoded',
})

const init = {
  method: 'GET',
  headers: myheader,
  mode: 'cors'
}

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchname: 'Alderiate',
      profil: {},
      rankData: [{}],
      matchData: [{}]
    }
  }

  handleChange = event => {
    this.setState({
      searchname: event.target.value
    })
  }

  handleSearch = () => {
    this.handleCallApi(this.state.searchname)
  }

  handleCallApi = () => {
    const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/summoner/v4/summoners/by-name/${this.state.searchname}?platform=EUW1`
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json
        console.log('data api : ', data)
        this.setState({ profil: data })
        this.handleCallApiRank()
        this.handleCallApiMatch()
      })
      .catch(error => console.log(error)) // error json
      .catch(error => console.log(error)) // error api
  }

  handleCallApiRank = () => {
    const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/league/v4/entries/by-summoner/${this.state.profil.id}?platform=EUW1`
      fetch(url, init)
      .then(response => response.json())
      .then(json => {
          const data = json
          console.log('rank data', data)
          this.setState({ rankData: data })
      })
      .catch(error => console.log(error))
      .catch(error => console.log(error))
  }

  handleCallApiMatch = () => {
    const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/match/v4/matchlists/by-account/${this.state.profil.accountId}?endIndex=10&platform=EUW1`
    fetch(url, init)
    .then(response => response.json())
    .then(json => {
      const data = json
      console.log('Match List : ', data)
      this.setState({ matchData: data })
    })
    .catch(error => console.log(error))
    .catch(error => console.log(error))
  }

  render() {
    return (
      <div className='homePage'>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
      
          <div className='searchbar'>
            <TextField
            id="standard-name"
            label="Name"
            margin="normal"
            value={this.state.searchname}
            onChange={this.handleChange}
            />
    
            <Button
            variant="contained"
            color="primary"
            endIcon={<SearchIcon />}
            onClick={this.handleSearch}
            >
              Search...
            </Button>
          </div>

          { this.state.profil.name ? <PagePerso profil={this.state.profil}/> : <p>aucun personnage</p>}

          { this.state.rankData[0].summonerName ? <Rank profilRank={this.state.rankData} /> : <div>YA RIEN</div> }

          { this.state.matchData.accountId ? <Histo matchId={this.state.matchData} /> : <div>uiiiiiiiii</div> }
      </div>
    )
  }
}
