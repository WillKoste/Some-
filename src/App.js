import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import AlertState from './context/alert/AlertState';

const App =() => {
return (
    <GithubState>
    <AlertState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path='/' exact render={props => (
                <Fragment>
                  <Search />
                  <Users />
                </Fragment>
              )} />
              <Route path='/about' exact component={About} />
              <Route exact path='/user/:login' component={User} />
            </Switch>
            <Alert />
          </div>
        </div>
      </Router>
    </AlertState>
    </GithubState>
  );
}

export default App;