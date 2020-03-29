import React, {Component, Fragment} from 'react';
import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import User from './components/users/User';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';

class App extends Component{
  state = {
    users: [],
    repos: [],
    user: {},
    loading: false,
    alert: null
  }
  
  // async componentDidMount(){ 
  //   this.setState({loading: true});
    
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
  //   const data = await res.data;
    
  //   this.setState({users: data, loading: false});
  // }

  searchUsers = async (text) => {
    this.setState({loading: true});
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    const data = await res.data;

    this.setState({users: data.items, loading: false});
  }

  getUser = async (username) => {
    this.setState({loading: true});
    
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    const data = await res.data;

    this.setState({user: data, loading: false});
  }

  getUserRepos = async (username) => {
    this.setState({loading: true});
    
    const res = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`); 
    const data = await res.data;

    this.setState({repos: data, loading: false});
  }
  
  clearUsers = () => {
    this.setState({users: [], loading: false});
  }

  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});

    setTimeout(() => {
      this.setState({alert: null});
    }, 2700);
  }
  
  render(){
    const {users, loading, user, repos} = this.state;
    
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Switch>
              <Route path='/' exact render={props => (
                <Fragment>
                  <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} setAlert={this.setAlert} showClear={users.length > 0 ? true : false} />
                  <Users loading={loading} users={users} />
                </Fragment>
              )} />
              <Route path='/about' exact component={About} />
              <Route exact path='/user/:login' render={props => (
                <User {...props} getUser={this.getUser} getUserRepos={this.getUserRepos} repos={repos} user={user} loading={loading} />
              )} />
            </Switch>
            <Alert alert={this.state.alert} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
