import React, { Component } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
export default class HomePage extends Component {
  render() {
    return (
      <div className="body">
      <Header></Header>
      <div className={styles.mainSection}>
        <div className = {styles.center}>
            <div className="container text-center py-5">
                    <h1 className={styles.text1}>Welcome to</h1>
                    <h1 className={styles.text2}> Ensemble</h1>
                    <p className={styles.text}>A great place to stream music with friends</p>
                    <div className="mt-4">
                      <div className={styles.btnBox}>
                      <div className={styles.btn}>
                      <Link className="btn px-5" to="/login">Log In</Link>
                      </div>
                      <div className={styles.btn}>
                      <Link className="btn px-5" to="/signup">Sign Up</Link>
                      </div>
                      </div>
                    </div>
            </div>
        </div>
      </div>
      <Footer></Footer>
      </div>
    )
  }
}