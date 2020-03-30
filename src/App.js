import React, {useState, Fragment} from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';

const App =() => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const searchUsers = async (text) => {
    setLoading(true);
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    const data = await res.data;

    setUsers(data.items);
    setLoading(false);
  }

  const getUser = async (username) => {
    setLoading(true);
    
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    const data = await res.data;

    setUser(data);
    setLoading(false);
  }

  const getUserRepos = async (username) => {
    setLoading(true);
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    const data = await res.data;

    setRepos(data);
    setLoading(false);
  }
  
  const clearUsers = () => {
    setUsers([]);
    setLoading(false);
  }

  const showAlert = (msg, type) => {
    setAlert({msg, type});

    setTimeout(() => {
      setAlert(null);
    }, 2700);
  }
  
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path='/' exact render={props => (
                <Fragment>
                  <Search searchUsers={searchUsers} clearUsers={clearUsers} setAlert={showAlert} showClear={users.length > 0 ? true : false} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route path='/about' exact component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={getUser} getUserRepos={getUserRepos} repos={repos} user={user} loading={loading} />
              )} />
            </Switch>
            <Alert alert={alert} />
          </div>
        </div>
      </Router>
    </GithubState>
  );
}

export default App;