import React from 'react';
import { FormattedMessage } from 'react-intl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import messages from './messages';

// Import
import PagePerso from '../ApiRiot/PagePerso';
import Rank from '../ApiRiot/Rank';
import Histo from '../ApiRiot/Histo';

// import bgContainer from '../../images/test.png'

// CSS IN JS

const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;

  /* background: url(${bgContainer}) no-repeat fixed;
  background-position: bottom right;
  background-size: 40%; */

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  & h1 {
    margin: 0;
    text-transform: uppercase;
    text-align: center;
    font-weight: 500;
  }

  @media screen and (max-width: 767px) {
    padding: 7%;
  }
`;

const SearchBar = styled.form`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  & button {
    margin-left: 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 1rem;
  }

  & input {
    width: 250px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.125rem;
  }

  @media screen and (max-width: 767px) {
    & input {
      width: auto;
      font-size: 1rem;
    }

    & button {
      font-size: 0.85rem;
    }
  }
`;

const ContainerProfil = styled.div`
  width: 55%;
  height: auto;
  margin: 30px 0;
  background: #fefefe;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3%;
  box-shadow: 0 3px 6px rgb(0, 0, 0, 16%);
  border-radius: 5px;

  @media screen and (max-width: 767px) {
    flex-direction: column;
    width: auto;
    padding: 5%;
  }

  @media screen and (max-width: 1250px) {
    width: 90%;
    padding: 5% 0;
  }
`;

const TextIntro = styled.p`
  max-width: 600px;
  font-size: 1.125rem;
  font-weight: lighter;
  text-align: center;
`;

// API Settings

const myheader = new Headers({
  'Content-Type': 'application/x-www-form-urlencoded',
});

const init = {
  method: 'GET',
  headers: myheader,
  mode: 'cors',
};

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchname: 'yekon',
      profil: {},
      rankData: [{}],
      matchData: [{}],
      champId: [],
      spellId: [],
    };
  }

  handleChange = event => {
    this.setState({
      searchname: event.target.value,
    });
  };

  handleSearch = e => {
    e.preventDefault();
    if (this.state.searchname.length >= 3) {
      this.handleCallApi(this.state.searchname);
    } else {
      alert('Veuillez rechercher un pseudo valide !');
    }
  };

  handleCallApi = () => {
    const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/summoner/v4/summoners/by-name/${
      this.state.searchname
    }?platform=EUW1`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        console.log('data api : ', data);
        this.setState({ profil: data });
        this.handleCallApiRank();
        this.handleCallApiMatch();
        this.handleCallApiChamp();
        this.handleCallApiSpell();
      })
      .catch(error => console.log(error)) // error json
      .catch(error => console.log(error)); // error api
  };

  handleCallApiRank = () => {
    const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/league/v4/entries/by-summoner/${
      this.state.profil.id
    }?platform=EUW1`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        console.log('rank data', data);
        this.setState({ rankData: data });
      })
      .catch(error => console.log(error))
      .catch(error => console.log(error));
  };

  handleCallApiMatch = () => {
    const url = `http://ec2-52-47-60-225.eu-west-3.compute.amazonaws.com/lol/match/v4/matchlists/by-account/${
      this.state.profil.accountId
    }?endIndex=10&platform=EUW1`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        console.log('Match List : ', data);
        this.setState({ matchData: data });
      })
      .catch(error => console.log(error))
      .catch(error => console.log(error));
  };

  handleCallApiChamp = () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/champion.json`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        console.log('champId : ', data);
        this.setState({ champId: data });
      })
      .catch(error => console.log(error)) // error json
      .catch(error => console.log(error)); // error api
  };

  handleCallApiSpell = () => {
    const url = `http://ddragon.leagueoflegends.com/cdn/9.23.1/data/en_US/summoner.json`;
    fetch(url, init)
      .then(response => response.json())
      .then(json => {
        const data = json;
        console.log('spellId : ', data);
        this.setState({ spellId: data });
      })
      .catch(error => console.log(error)) // error json
      .catch(error => console.log(error)); // error api
  };

  render() {
    return (
      <Container>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>

        <SearchBar onSubmit={this.handleSearch}>
          <TextField
            id="standard-name"
            label="Pseudo..."
            value={this.state.searchname}
            onChange={this.handleChange}
          />

          <Button
            variant="contained"
            color="primary"
            endIcon={<SearchIcon />}
            type="submit"
          >
            Search
          </Button>
        </SearchBar>

        {this.state.profil.name ? (
          <ContainerProfil>
            <PagePerso profil={this.state.profil} />
            {this.state.rankData[0].summonerName ? (
              <Rank profilRank={this.state.rankData} />
            ) : null}
          </ContainerProfil>
        ) : (
          <TextIntro>
            Recherchez le pseudo d'un joueur de LoL ( ex: Plagiat ) du serveur
            EUW afin d'avoir accès à ses statistiques ( Icone de profil, rang,
            historique, champions ... ) !
          </TextIntro>
        )}

        {this.state.matchData.accountId ? (
          <Histo
            champId={this.state.champId}
            spellId={this.state.spellId}
            matchId={this.state.matchData}
            summonerName={this.state.profil.name}
          />
        ) : null}
      </Container>
    );
  }
}
