import logo from './logo.svg';
import './App.css';
import react, {useState, useRef} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/analytics';

import {useAuthState, useSignInWithGoogle} from 'react-firebase-hooks/auth';

import {useCollectionData} from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  //my configuration
  apiKey: "AIzaSyDcQpeQb7yywUhKdfPFAppMkB6vNkYYVmY",
  authDomain: "taha-chat-app.firebaseapp.com",
  projectId: "taha-chat-app",
  databaseURL: "https:/taha-chat-app.firebaseio.com",
  storageBucket: "taha-chat-app.appspot.com",
  messagingSenderId: "264573993384",
  appId: "1:264573993384:web:ddf71ce335ba8ab57e5d9d",
  measurementId: "G-D06JP04M9W"
})

const auth= firebase.auth();
const firestore=firebase.firestore();

function App() {
  const [user]=useAuthState(auth);
  //this will tell me whether someone has signed in or not...
  
  return (
    <div className="App">
     <header>
      <h1>Let's chat</h1>
      {user && <SignOut />}
     </header>

     <section className='section'>
      {user ? 
      (<div className='chat-container'><ChatRoom/></div> ):( <SignIn /> )}
     </section>
    </div>
  );
  }
  function SignIn(){

    const signInWithGoogle = () => {
      const provider= new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(provider);
    };

    return(
      <>
      <button className="sign-in" onClick={signInWithGoogle}>Sign In</button>
      <p>Connect if you wanna chat</p>
      </>
    )

  }

  function SignOut(){

    return auth.currentUser && (
      <button className="sign-out" onClick={()=> auth.signOut()}>Sign Out</button>
    )
  };

  function ChatRoom(){

    const dummy = useRef();
    const messageRef = firestore.collection('messages');
    const query = messageRef.orderBy('createdAt').limit(100);

    const [messages]=useCollectionData(query,{idField: 'id'});

    const [formValue, setFormValue] = useState('');

    const sendMessage = async (e) => {

      e.preventDefault();

      const {uid, photoURL}= auth.currentUser;


      await messageRef.add({
        text: formValue,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        photoURL
      });
      setFormValue('');
      dummy.current.scrollIntoView({behavior: 'smooth'});
    }

    
    return(

      <>
      {messages && messages.map(msg=> <ChatMessage key = {msg.id} message ={msg}/>)}
      <form onSubmit={sendMessage}>
        <input value={formValue} onChange={(e)=> setFormValue(e.target.value)} placeholder="Type here..." />

        <button type='submit' disabled={!formValue}>Send</button>
      </form>
      <div ref={dummy}></div>
      </>

    )

  };

function ChatMessage(props){
  const {text, uid, photoURL} = props.message;

  const messageClass= uid == auth.currentUser.uid ? 'sent' : 'received'

  return (
    <>
      <div className={`message ${messageClass}`}>

        <img src={photoURL}/>
        <p>{text}</p>

      </div>
    </>
  )
}

export default App;


