import React , {useState , useEffect , useContext} from 'react';
import { auth } from "../firebase";
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import axios from "axios";


//Components
import Navbar from "./Navbar";

//styles
import styles from "./Chats.module.css";

//Context
import {AuthContext} from "../contexts/AuthContextProvider";

const Chats = () => {

     const [loading , setLoading] = useState(true);
     const user = useContext(AuthContext);
     const history = useHistory();

     useEffect(() => {

       // No user information
       if(!user){
          history.push("/")
          return
       }

       //Check the existence of an account in the chat engine
       axios.get("https://api.chatengine.io/users/me",{
          headers : {
               "project-id" : "22354ce5-d2a8-43b1-95ad-62f99fe06bb2" ,
               "user-name" : user.email,
               "user-secret" : user.uid
          }
       })

       .then(() => {
          setLoading(false)
       })

       //If we don't have an account, we create an account for this user.

       .catch(() => {
          let formdata = new FormData();
          formdata.append("email" , user.email);
          formdata.append("username" , user.email);
          formdata.append("secret" , user.uid);
          getFile(user.photoURL)
          .then(avatar => {
               formdata.append("avatar" , avatar , avatar.name)
               axios.post("https://api.chatengine.io/users/" , formdata , {

                    headers : {
                         "private-key" : "902d19cf-a437-4eca-b62d-8c008c776026"
                    }
               })

               .then(() => setLoading(false))
               .catch(error => console.log(error))
          })
       })

     }, [user , history]);

     const getFile = async (url) => {
          const response = await fetch(url);
          const data = await response.blob();
          return new File([data] , "userPhoto.jpg" , {type : "image/jpeg"})
     }


     const logoutHandler = async () => {
          await auth.signOut();
          history.push("/")
     }

     if(!user || loading) return "loading ...";

     return (
          <div className={styles.container}>

               <Navbar logoutHandler={logoutHandler}/>

               <ChatEngine 
                    height="calc(100vh - 50px)"
                    projectID="22354ce5-d2a8-43b1-95ad-62f99fe06bb2"
                    userName={user.email}
                    userSecret={user.uid}
               />
               
          </div>
     );
}

export default Chats;
