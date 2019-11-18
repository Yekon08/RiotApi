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
  const test = 4

  console.log('profil data: ', profil)

  return (
    <div className={classes.root}>
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <div className='profileContainer'>
          <img alt='profile Icon' className='imgIcon' src={`http://ddragon.leagueoflegends.com/cdn/9.21.1/img/profileicon/${profil.profileIconId}.png`}/>

          <img alt='Profile Icon Border' className='imgBorder' src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-uikit/global/default/images/theme-${test}-solid-border.png`} />
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