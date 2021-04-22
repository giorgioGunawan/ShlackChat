import React, {useState, useRef} from 'react';
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
// firebase console - giochat (not giochat2)

firebase.initializeApp({
  apiKey: "AIzaSyBS7RMnNi3XEIDvMxGjhb1a7VIEQqO_Ufw",
  authDomain: "giochat-160b7.firebaseapp.com",
  projectId: "giochat-160b7",
  storageBucket: "giochat-160b7.appspot.com",
  messagingSenderId: "463084450667",
  appId: "1:463084450667:web:1889f3ad8955d2b9f4d22e",
  measurementId: "G-RZZ8F0F5PJ"
})



const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {

  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>
        giochat
      </header>
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

/*
function SignOut(){
  // if there is a user, use the firebase auth library sign out function
  // on sign out button event
  if (auth.currentUser){
    return (<button onClick={() => auth.signOut()}>Sign Out</button>)
  }
}*/

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const scrollDown = useRef();

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');
  // bind state to form input in the form 
  // when user submits the text (submits the form), 
  // we listen to the onsubmitform event on the form 
  // and trigger a function sending an event
  const sendMessage = async(e) =>{
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;
    // create new document to nosql database
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    });

    // set the form value to empty again to await for next event
    setFormValue('');

    scrollDown.current.scrollIntoView();
  }
  return(
    <>   
      <main>

        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        <div ref={scrollDown}>

        </div>
      </main>
      
      <form onSubmit={sendMessage}>

          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button type="submit">>Submit</button>
      </form>
    </>
  )
}

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent': 'received';
  console.log(uid)
  console.log(auth.currentUser.uid === uid)
  return(
    <div className={`message ${messageClass}`}>
      <img alt={} src={photoURL || 'https://media.timeout.com/images/103491793/750/422/image.jpg'}/>
      <p>{text}</p>
    </div>
  )
}

export default App;
