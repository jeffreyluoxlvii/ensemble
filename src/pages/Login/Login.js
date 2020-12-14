import React, { Component } from "react";
import { Link } from "react-router-dom";
import { signin, signInWithGoogle } from "../../helpers/auth";
import styles from './Login.module.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      error: null,
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.googleSignIn = this.googleSignIn.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState({ error: "" });
    try {
      await signin(this.state.email, this.state.password);
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  async googleSignIn() {
    try {
      await signInWithGoogle();
    } catch (error) {
      this.setState({ error: error.message });
    }
  }

  render() {
    return (
        <form
          className="mt-5 py-5 px-5"
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <div className={styles.logInBox}>
          <h1 className={styles.text1}>
            Login to 
            <Link className="title ml-2" to="/">
              <h1 className={styles.text2}>Ensemble</h1>
            </Link>
          </h1>
          </div>
          <div className={styles.logInBox}>
          <p className={styles.text}>
            Fill in the form below to login to your account.
          </p>
          </div>
          <div className={styles.logInBox}>
            <input
              className={styles.formcontrol2}
              placeholder="Email"
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div className={styles.logInBox}>
            <input
              className={styles.formcontrol2}
              placeholder="Password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              type="password"
            />
          </div>
          <div className={styles.logInBox}>
          <div className="form-group">
            {this.state.error ? (
              <p className="text-danger">{this.state.error}</p>
            ) : null}
            <div className={styles.logInBox}><button className={styles.logInButton} type="submit">Login</button></div>
          </div>
          </div>
          <div className={styles.logInBox}>
          <p className={styles.text}>You can also log in with any of these services: </p>
          </div>

          <div className={styles.logInBox}>
          <button className={styles.googleLogIn} type="button" onClick={this.googleSignIn}>
          <i class="fab fa-google"></i>
          </button>
          </div>
          <hr />
          <div className={styles.logInBox}>
          <p className={styles.text1}>
            Don't have an account? <Link to="/signup"><p className = {styles.text2}>Sign up</p></Link>
          </p>
          </div>

        </form>
    );
  }
}