import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import Users from './users/Users';

class App extends Component {

  handleSignout = () => {
    localStorage.removeItem('jwt');
    this.props.history.push('/signin');
  };

  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/signup">Sign Up</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">Sign In</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <button onClick={this.handleSignout}>Signout</button>
          </nav>
        </header>
        <main>
          <Route path="/signup" component={Signup}></Route>
          <Route path="/signin" component={Signin}></Route>
          <Route path="/users" component={Users}></Route>
        </main>
      </>
    );
  }
}

export default withRouter(App);
