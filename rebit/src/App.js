import React from 'react';
import './App.css';
import {
  BrowserRouter ,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Login from './Components/Login/Login'
import Signup from './Components/SignUp/SignUp'
import Files from './Components/FIles/Files'
import Recycle from './Components/Recycle/Recycle'
import Reports from './Components/Reports/Reports'
import HomePage from './Components/HomePage/HomePage';
function App() {
  const ifExist = localStorage.getItem("email")
  return (
    <div >
      <BrowserRouter forceRefresh = {true} >

        <Switch>
          <Route exact path="/">
            <Login />
          </Route>

          <Route path="/home">
          {ifExist ? <HomePage/> : <Redirect to = {{ pathname: "/"}}/>}
           {/* {ifExist ? <HomePage/> : <Login/>}  */}
        {/* <HomePage/> */}
          </Route>

          
          <Route path="/signup">
            <Signup />
          </Route>


          <Route path="/files">
          {/* {ifExist ? <Files/> : <Redirect to = {{pathname: "/"}}/>} */}
          <Files/>
          </Route>

          <Route path="/report">
          {ifExist ? <Reports/> : <Redirect to = {{pathname: "/"}}/>}
          {/* <Reports/>  */}
          </Route>


          <Route path="/recycle">
          {ifExist ? <Recycle/> : <Redirect to = {{pathname: "/"}}/>}
          </Route>


        </Switch>

      </BrowserRouter >

    </div>
  );
}

export default App;
