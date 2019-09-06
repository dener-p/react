import React, { Component, Fragment } from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import './Home.css';
import Header from '../../Components/Header/Header';
 

class Home extends Component{
  
  render() {

    return (
      <Fragment>
        <Header  />
        <div className="container mb-10">
        <h1>Home</h1>
        <h4 className="margin-t">Bem vindo</h4>
        </div>
      </Fragment>
    );
  }

}

export default Home;
