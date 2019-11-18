import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

// Import CSS Profile Page
import './PagePerso.css'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.primary,
  },
}));

export default function SimpleCard(props) {
  const { profil } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className='profileContainer'>
          <img alt='profile Icon' className='imgIcon' src={`http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/${profil.profileIconId}.png`}/>
          <img alt='Profile Icon Border' className='imgBorder' src={
            profil.summonerLevel <= 29  ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-1-solid-border.png' :
            profil.summonerLevel <= 49 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-2-solid-border.png' : 
            profil.summonerLevel <= 74 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-3-solid-border.png' :
            profil.summonerLevel <= 99 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-4-solid-border.png' :
            profil.summonerLevel <= 124 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-5-solid-border.png' : 
            profil.summonerLevel <= 149 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-6-solid-border.png' : 
            profil.summonerLevel <= 174 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-7-solid-border.png' : 
            profil.summonerLevel <= 199 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-8-solid-border.png' : 
            profil.summonerLevel <= 224  ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-9-solid-border.png' :
            profil.summonerLevel <= 249 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-10-solid-border.png' : 
            profil.summonerLevel <= 274 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-11-solid-border.png' :
            profil.summonerLevel <= 299 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-12-solid-border.png' :
            profil.summonerLevel <= 324 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-13-solid-border.png' : 
            profil.summonerLevel <= 349 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-14-solid-border.png' : 
            profil.summonerLevel <= 374 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-15-solid-border.png' : 
            profil.summonerLevel <= 399 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-16-solid-border.png' :
            profil.summonerLevel <= 424 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-17-solid-border.png' :
            profil.summonerLevel <= 449 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-18-solid-border.png' :
            profil.summonerLevel <= 474 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-19-solid-border.png' :
            profil.summonerLevel <= 499 ? 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-20-solid-border.png' :
            'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-21-solid-border.png'
          }/>
          <p className='lvlBorder'>{profil.summonerLevel}</p>
        </div>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>{profil.name}</Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper className={classes.paper}>xs=6</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
      <Grid item xs={3}>
        <Paper className={classes.paper}>xs=3</Paper>
      </Grid>
    </Grid>
  </div>
  );
}