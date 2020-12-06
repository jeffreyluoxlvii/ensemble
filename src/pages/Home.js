import React, { Component } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default class HomePage extends Component {
  render() {
    return (
      <div className="body">
      <Header></Header>
      <div className="mainSection">
        <div className = "center">
            <div className="container text-center py-5">
                    <h1 className="text1">Welcome to</h1>
                    <h1 className="text2"> Ensemble</h1>
                    <p className="text">A great place to stream music with friends</p>
                    <div className="mt-4">
                      <Link className="btn px-5  mr-3" to="/login">Log In</Link>
                      <Link className="btn px-5" to="/signup">Sign Up</Link>

                    </div>
            </div>
        </div>
      </div>
      <Footer></Footer>
      </div>
    )
  }
}