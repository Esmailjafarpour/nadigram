import './App.css';
import {Route , Switch} from "react-router-dom";

//componenets
import Login from './componenets/Login';
import Chats from './componenets/Chats';

//Context
import AuthContextProvider from "./contexts/AuthContextProvider";

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Switch>
          <Route path="/chats" component={Chats}/>
          <Route path="/" component={Login}/>
        </Switch>
      </AuthContextProvider>
    </div>
  );
}

export default App;
