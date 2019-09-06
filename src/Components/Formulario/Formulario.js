import React, { Component } from 'react';
import FormValidator from '../../utils/FormValidator';
import PopUp from '../../utils/PopUp';

class Formulario extends Component {

    constructor(props) {
        super(props);

        this.validador = new FormValidator([
            {
                campo: 'username',
                metodo: 'isEmpty',
                validoQuando: false,
                mensagem: 'Insira um nome de usuário'
            },
            {
                campo: 'password',
                metodo: 'isEmpty',                
                validoQuando: false,
                mensagem: 'insira uma password'
            },
            {
                campo: 'email',
                metodo: 'isEmail',
                validoQuando: true,
                mensagem: 'Insira um email válido'
            }
                           
        
        ])

        this.stateInicial = {
            username: '',
            password: '',
            email: '',
            status: 'offline',
            validacao: this.validador.valido()
        }

        this.state = this.stateInicial;

    }

    onWriteInput = event => {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    submitForm = () => {
        const validacao = this.validador.valida(this.state);

        if(validacao.isValid){
            this.props.tryToSubmit(this.state);
            this.setState(this.stateInicial);
        }else{
            const { username, password, email } = validacao;
            const campos = [username, password, email];
            const camposInvalidos = campos.filter(elem => {
                return elem.isInvalid;
            });
            camposInvalidos.forEach(campo => {
                PopUp.exibeMensagem('error', campo.mensagem);
            });
        }
        
    }

    render() {

        const { username, password, email } = this.state;

        return (
            <form>
                <div className="row">
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="username">nome de usuáro</label>
                        <input
                            className="validate"
                            id="username"
                            type="text"
                            name="username"
                            value={username}
                            onChange={this.onWriteInput} />
                    </div>
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="password">senha</label>
                        <input
                            className="validate"
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={this.onWriteInput} />

                    </div>
                    <div className="input-field col s4">
                        <label className="input-field" htmlFor="email">email</label>
                        <input
                            className="validate"
                            id="email"
                            type="text"
                            name="email"
                            value={email}
                            onChange={this.onWriteInput} />
                    </div>
                </div>
                <button className="waves-effect waves-light indigo lighten-2 btn" onClick={this.submitForm} type="button">Cadastrar
                </button>
            </form>
        );
    }
}
export default Formulario;