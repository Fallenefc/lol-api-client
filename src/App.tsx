import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import SummonerInfo from './Pages/SummonerInfo/SummonerInfo';

function App() {

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path='/:sumName'>
           <SummonerInfo />
          </Route>
          <Route exact path='/'>
            <Dashboard/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
