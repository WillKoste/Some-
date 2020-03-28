import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';

class App extends Component{
  state = {
    users: [],
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
    const {users, loading} = this.state;
    
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <Search searchUsers={this.searchUsers} clearUsers={this.clearUsers} setAlert={this.setAlert} showClear={users.length > 0 ? true : false} />
          <Alert alert={this.state.alert} />
          <Users loading={loading} users={users} />
        </div>
      </div>
    );
  }
}

export default App;
