import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import './App.css';

// Add useAuthentication hook from the react firebase hooks auth library
import {useAuthState} from 'react-firebase-hooks/auth';

// Add useState of useCollection data from the firestore library to be able 
// to access collections within firestore (NOSQL)
import {useCollectionData} from 'react-firebase-hooks/firestore';

// from firebase - project settings adding webapp
/*
var firebaseConfig = {
  apiKey: "AIzaSyBS7RMnNi3XEIDvMxGjhb1a7VIEQqO_Ufw",
  authDomain: "giochat-160b7.firebaseapp.com",
  projectId: "giochat-160b7",
  storageBucket: "giochat-160b7.appspot.com",
  messagingSenderId: "463084450667",
  appId: "1:463084450667:web:1889f3ad8955d2b9f4d22e",
  measurementId: "G-RZZ8F0F5PJ"
};*/
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyBS7RMnNi3XEIDvMxGjhb1a7VIEQqO_Ufw",
    authDomain: "giochat-160b7.firebaseapp.com",
    projectId: "giochat-160b7",
    storageBucket: "giochat-160b7.appspot.com",
    messagingSenderId: "463084450667",
    appId: "1:463084450667:web:1889f3ad8955d2b9f4d22e",
    measurementId: "G-RZZ8F0F5PJ"
  })
}


const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      
      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>
    </div>
  );
}

function SignIn() {
  const googleSignIn = () =>{
    const provider = new firebase.auth.GoogleAuthProvider();

    // triggers popup window when user signs in with google
    auth.signInWithPopup(provider);
  }
  // listens to the click event of the button
  return(
    <button onClick={googleSignIn}> Google Authentication Sign In</button>
  )
}

function SignOut(){
  // if there is a user, use the firebase auth library sign out function
  // on sign out button event
  if (auth.currentUser){
    return (<button onClick={() => auth.signOut()}>Sign Out</button>)
  }
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });
  return(
    <>   
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
      <form>
          
      </form>
    </>
  )
}

function ChatMessage(props){
  const {text, userId, photoURL} = props.message;

  const messageClass = userId === auth.currentUser.uid ? 'Message Sent': 'Message Received';

  return(
    <div className={`message ${messageClass}`}>
      <img src={photoURL}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
