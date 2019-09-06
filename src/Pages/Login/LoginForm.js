import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import FormValidator from '../../utils/FormValidator';
import PopUp from '../../utils/PopUp';
import ApiService from '../../utils/ApiService';
import TokenService from '../../utils/Token';
import LinkWrapper from '../../utils/LinkWrapper';
import './LoginForm.css';
import { Redirect } from 'react-router-dom';
import AuthRoutes from '../../utils/AuthRoutes';

class LoginForm extends Component {
    constructor(props) {
        super(props);

        this.validador = new FormValidator([
            {
                campo: 'email',
                metodo: 'isEmail',
                validoQuando: true,
                mensagem: 'Insira um email válido'
            },
            {
                campo: 'password',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Insira uma senha'
            }
        ])

        this.stateInicial = {
            email: '',
            password: '',
            validacao: this.validador.valido(),
            redirect: false
        }

        this.state = this.stateInicial;

    }

    onChangeInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    onSubmit = () => {
        const validacao = this.validador.valida(this.state);

        if (validacao.isValid) {
            const { email, password } = this.state;
            ApiService.Logar(email, password)
                .then(res => {                
                    if (res.token.token) {
                        TokenService.setToken(res.token.token);                
                        setTimeout(() => {
                            this.setState({ redirect: true})    
                        }, 100);                       
                    }
                })
                .catch(err => PopUp.exibeMensagem("error", 
                "Email ou Senha errados ou servidor offline no momento"));
            this.setState(this.stateInicial);
        } else {
            const { email, password } = validacao;
            const campos = [email, password];
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });
            camposInvalidos.forEach(campo => {
            PopUp.exibeMensagem('error', campo.mensagem);
            });
        }
    }
      
    componentDidMount(){
        if(!AuthRoutes.userNotLogged()){
            setTimeout(() => {
                this.setState({ redirect: true});                
            }, 100  );          
        }
    }
  
    render() {

        const { email, password } = this.state;

        return (
            <Fragment>
                <Header />
                <div className='container'>
                    <h1 className="margin-t">Entrar</h1>
                    <form>
                        <div className="row">
                            <div className="input-field col s4">
                                <label className="input-field" htmlFor="email">email</label>
                                <input
                                    className="validate"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={email}
                                    onChange={this.onChangeInput} />
                            </div>
                            <div className="input-field col s4">
                                <label className="input-field" htmlFor="password">senha</label>
                                <input
                                    className="validate"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={this.onChangeInput} />
                            </div>
                        </div>
                        {this.state.redirect && <Redirect to='/users' /> }
                        <button className="waves-effect waves-light indigo lighten-2 btn" onClick={this.onSubmit} type="button">Entrar
                    </button>Ou <LinkWrapper to='/cadastro'>Cadastre-se.</LinkWrapper>
                    </form>
                </div>
            </Fragment>
        );
    }
}
export default LoginForm;