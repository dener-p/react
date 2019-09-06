import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import './Cadastro.css';
import Header from '../../Components/Header/Header';
import PopUp from '../../utils/PopUp';
import ApiService from '../../utils/ApiService';
import Formulario from '../../Components/Formulario/Formulario';
import AuthRoutes from '../../utils/AuthRoutes';

class Home extends Component {

  constructor(props){
    super(props);

    this.state = {
      users: [],
      redirect: false
    };
  }
  
  tryToSubmit = users => {
    const {username, password, email, status} = users
    ApiService.CreateUsers(username, password, email, status)
      .then(res =>{  
        if(res.username === username){
          this.setState({ users:[...this.state.users, res.data] });
          PopUp.exibeMensagem("success", "Usuário criado com sucesso");
        }
        
      })
      .catch(err => PopUp.exibeMensagem("error", 
      "Erro na comunicação com a API ao tentar criar o usuário"));    
  }

  componentDidMount(){
      if(!AuthRoutes.userNotLogged()){
        setTimeout(() => {
          this.setState({ redirect: true});          
      }, 100  );
    }
  }
  render() {

    return (
      <Fragment>
        <Header />
        <div className="container mb-10">
        <h1 className="mt">Cadastre-se</h1>
        {this.state.redirect &&  <Redirect to='/users' />}
        <Formulario tryToSubmit={this.tryToSubmit}  />
        </div>
      </Fragment>
    );
  }

}

export default Home;
