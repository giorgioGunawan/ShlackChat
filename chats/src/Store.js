import React from 'react';
import io from 'socket.io-client'

export const CTX = React.createContext();

export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE"

const initState = {
  General: [
    {from: 'user01', msg: 'Yo Welcome to Shlack Chat'},
    {from: 'user45', msg: 'Yo'},
    {from: 'user80', msg: 'Hulllo'}

  ],
  Programming:[
    {from: 'user45', msg: 'whats a string?'},
    {from: 'user57', msg: 'are u serious'},
    {from: 'user90', msg: 'in what language are u asking?'}
  ]
}
function reducer(state, action){

  const {from, msg, topic} = action.payload;
  switch(action.type){
    case RECEIVE_MESSAGE:

      return{
        ...state,
        [topic]:[...state[topic],{from,msg}]
      };
    default:
      return state;
  }
};


let socket;

function sendChatAction(value){
  socket.emit('chat message', value);
}

const Store = props =>{
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  //const [allChats] = React.useReducer(reducer, initState);
  if(!socket){
    socket = io(':3001')
    socket.on('chat message', function(msg){
      //console.log({msg});

      dispatch({ type:RECEIVE_MESSAGE, payload: msg });
    });
  }

  const user = 'user' + Math.random(100).toFixed(2)*100



  return(
    <CTX.Provider value={{allChats, sendChatAction, user}}>
      {props.children}
    </CTX.Provider>
  );
};

export default Store;
