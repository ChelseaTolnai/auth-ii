import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';

import './App.css';
import Signup from './signup/Signup';
import Signin from './signin/Signin';
import Users from './users/Users';

class App extends Component {

  render() {
    return (
      <>
        <header>
          <nav>
            <NavLink to="/signup">SignUp</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/signin">SignIn</NavLink>
            &nbsp;|&nbsp;
            <NavLink to="/users">Users</NavLink>
            &nbsp;|&nbsp;
            <button>Signout</button>
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
