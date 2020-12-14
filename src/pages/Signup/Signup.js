import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { signup, signInWithGoogle } from "../../helpers/auth";
import styles from './Signup.module.css';

export default class SignUp extends Component {

  constructor() {
    super();
    this.state = {
      error: null,
      email: '',
      password: '',
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
    this.setState({ error: '' });
    try {
      await signup(this.state.email, this.state.password);
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

        <form className="mt-5 py-5 px-5" onSubmit={this.handleSubmit}>
        <div className={styles.logInBox}>
        <h1 className={styles.text1}>
            Sign Up to
            <Link className="title ml-2" to="/">
              <h1 className={styles.text2}>Ensemble</h1>
            </Link>
          </h1>
        </div>
        <div className={styles.logInBox}>
          <p className={styles.text}>Fill in the form below to create an account.</p>
          </div>
          <div className={styles.logInBox}>
            <input className={styles.formcontrol2} placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div className={styles.logInBox}>
            <input className={styles.formcontrol2} placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div className={styles.logInBox}>
          <div className="form-group">
            {this.state.error ? <p className="text-danger">{this.state.error}</p> : null}
            <button className={styles.signUpButton} type="submit">Sign up</button>
          </div>
          </div>
          <div className={styles.logInBox}>
          <p className={styles.text}>You can also sign up with any of these services:</p>
          </div>
          <div className={styles.logInBox}>
          <button className={styles.googleSignUp} type="button" onClick={this.googleSignIn}>
          <i class="fab fa-google"></i>
          </button>
          </div>
          <hr></hr>
          <div className={styles.logInBox}>
          <p className={styles.text1}>Already have an account? <Link to="/login"><p className={styles.text2}>Login</p></Link></p>
          </div>
        </form>

    )
  }
}