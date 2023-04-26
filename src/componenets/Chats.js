import React from 'react';
import { auth } from "../firebase";
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';


//Components
import Navbar from "./Navbar";

//styles
import styles from "./Chats.module.css";

const Chats = () => {

     const history = useHistory();

     const logoutHandler = async () => {
          await auth.signOut();
          history.push("/")
     }

     return (
          <div className={styles.container}>

               <Navbar logoutHandler={logoutHandler}/>

               <ChatEngine 
                    height="calc(100vh - 50px)"
                    projectID="22354ce5-d2a8-43b1-95ad-62f99fe06bb2"
                    userName="."
                    userSecret="."
               />
               
          </div>
     );
}

export default Chats;
