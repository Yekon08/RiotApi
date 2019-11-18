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

// Import Test
import PagePerso from '../ApiRiot/PagePerso'

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
      searchname: 'Yekon',
      profil: {},
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
    const url = `http://ec2-15-188-118-182.eu-west-3.compute.amazonaws.com/lol/summoner/v4/summoners/by-name/${this.state.searchname}?platform=EUW1`
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json
        console.log('data api : ', data)
        this.setState({ profil: data })
      })
      .catch(error => console.log(error)) // error json
      .catch(error => console.log(error)) // error api
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
      </div>
    );
  }
}
