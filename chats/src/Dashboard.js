import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

import {CTX} from './Store';

const useStyles = makeStyles(theme => ({
  // makestyles render css when page renders
  root: {
    // separation
    margin: '30px',
    padding: theme.spacing(3,2),
  },

  flex:{
    display: 'flex',
    alignItems: 'center'
  },

  topicsWindow:{
    width: '30%',
    height: '300px',
    borderRight: '2.5px solid black',
    background: '#EAEAEA'
  },
  chatWindow:{
    width: '70%',
    height: '300px',
    padding: '20px'
  },
  chatBox:{
    width: '85%',
  },
  button:{
    width: '15%'
  }
}));

export default function Dashboard() {
  const classes = useStyles();

  const {allChats, sendChatAction, user}= React.useContext(CTX);

  const topics = Object.keys(allChats);

  //local state
  const [activeTopic, changeActiveTopic] = React.useState(topics[0])
  const [textValue, changeTextValue] = React.useState('');
  return (
    <div>
      <Paper className={classes.root}>

        <Typography variant="h3" component="h3">
        Shlack
        </Typography>
        <Typography variant="h5" component="h5">
        {activeTopic}
        </Typography>

        <div className = {classes.flex}>

          <div className= {classes.topicsWindow}>
            <List>
              {
                topics.map(topic => (
                  // the onclick below changes the desc below shlack
                  <ListItem onClick={(e) => changeActiveTopic(e.target.innerText)} key = {topic} button>

                    <ListItemText primary={topic} />
                  </ListItem>
                ))
              }
            </List>
          </div>
          <div className= {classes.chatWindow}>
            {
              allChats[activeTopic].map((chat, i) => (
                <div className={classes.flex} key={i}>
                  <Chip label={chat.from}  />
                  <Typography variants='body1' gutterBottom>
                  {chat.msg}
                  </Typography>
                </div>
              ))
            }
          </div>
        </div>


        <div className = {classes.flex}>
        <TextField
          id="standard-basic"
          label="Type Here.."

          className={classes.chatBox}
          value = {textValue}
          onChange = {(e) => changeTextValue(e.target.value)}
        />
        <Button
        variant="contained"
        color="secondary"
        disableElevation
        className={classes.button}
        // endIcon={<Icon>send</Icon>}
        onClick = {() => {
          sendChatAction({from: user,msg: textValue, topic: activeTopic});
          changeTextValue(' ');
        }}
        >
          Send
        </Button>

        </div>
      </Paper>
    </div>
  );
}
