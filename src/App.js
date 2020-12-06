
import React, { Component } from "react";
import {
  Route,
  HashRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { auth } from "./services/firebase";
import './styles.css';
import Home2 from "./pages/Home2";


function PrivateRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authenticated === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === false ? (
          <Component {...props} />
        ) : (
            <Redirect to="/play" />
          )
      }
    />
  );
}


class App extends Component {
  constructor() {
    super();
    this.state = {
      authenticated: false,
      loading: true
    };
  }

  componentDidMount() {
    auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          authenticated: true,
          loading: false
        });
      } else {
        this.setState({
          authenticated: false,
          loading: false
        });
      }
    });
  }

  render() {
    return this.state.loading === true ? (
      <div className="spinner-border text-success" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={this.state.authenticated ? Home2 : Home} />
            <PrivateRoute
              exact path="/play"
              authenticated={this.state.authenticated}
              component={Play}
            />
            <PublicRoute
              exact path="/signup"
              authenticated={this.state.authenticated}
              component={Signup}
            />
            <PublicRoute
              exact path="/login"
              authenticated={this.state.authenticated}
              component={Login}
            />
          </Switch>
        </Router>
      );
  }
}

export default App;