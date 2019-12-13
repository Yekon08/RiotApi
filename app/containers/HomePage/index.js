import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components'

// Import
//Test
import PagePerso from '../ApiRiot/PagePerso'
import Rank from '../ApiRiot/Rank'
import Histo from '../ApiRiot/Histo'

// CSS IN JS
const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;

  background: #fefefe;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & h1 {
    margin: 0
  }
`

const SearchBar = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    margin-left: 15px;
  }
`

const ContainerProfil = styled.div`
  width: auto;
  height: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 5%;
  box-shadow: 0 3px 6px rgb(0, 0, 0, 16%);
  border-radius: 5px;
`

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
      searchname: 'PlagiaT',
      profil: {},
      rankData: [{}],
      matchData: [{}],
      champId: [],
      spellId: []
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
        this.handleCallApiChamp()
        this.handleCallApiSpell()
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

  handleCallApiChamp = () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json`
    fetch(url, init)
        .then(response => response.json())
        .then(json => {
            const data = json
            console.log('champId : ', data)
            this.setState({ champId: data })
        })
        .catch(error => console.log(error)) // error json
        .catch(error => console.log(error)) // error api
  }

  handleCallApiSpell = () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/summoner.json`
    fetch(url, init)
        .then(response => response.json())
        .then(json => {
            const data = json
            console.log('spellId : ', data)
            this.setState({ spellId: data })
        })
        .catch(error => console.log(error)) // error json
        .catch(error => console.log(error)) // error api
  }

  render() {
    return (
      <Container>
          <h1>
            <FormattedMessage {...messages.header} />
          </h1>
      
          <SearchBar>
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
          </SearchBar>

          <ContainerProfil>
            { this.state.profil.name ? <PagePerso profil={this.state.profil}/> : <p>aucun personnage</p> }
            { this.state.rankData[0].summonerName ? <Rank profilRank={this.state.rankData} /> : <div>YA RIEN</div> }
          </ContainerProfil>

          { this.state.matchData.accountId ? <Histo champId={this.state.champId} spellId={this.state.spellId} matchId={this.state.matchData} summonerName={this.state.profil.name}/> : <div>uiiiiiiiii</div> }
      </Container>
    )
  }
}
