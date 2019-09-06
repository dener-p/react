import React, { Component, Fragment } from 'react';
import Header from '../../Components/Header/Header';
import DataTable from '../../Components/DataTable/DataTable';
import ApiService from '../../utils/ApiService';
import PopUp from '../../utils/PopUp';
import AuthRoutes from '../../utils/AuthRoutes';
import { Redirect } from 'react-router-dom';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],    
            status: [],
            state: false
        };
    }
    componentDidMount() {     
        if(!AuthRoutes.userNotLogged()){
            ApiService.ListaUsers()
            .then(res => {
                PopUp.exibeMensagem('success', 'Usuários listados com sucesso'); 
                
                res.forEach(element => {
                    let status = new Date(element.updated_at)
                    let now = new Date();
                    now.setMinutes(now.getMinutes()-1);
                    
                    if(status >= now)   this.setState({ users: [...this.state.users,
                        {'user': element.username, 'status': 'online'}]})
                    else  this.setState({ users: [...this.state.users,
                        {'user': element.username, 'status': 'offline'}]}) 
                });
            })
            .catch(err => { PopUp.exibeMensagem('error',
            'Faça login primeiro'); this.setState({state: true}) });
        }
        else {
            setTimeout(() => {
               PopUp.exibeMensagem('error','Faça login primeiro');
            this.setState({state: true})
            }, 100);
        
        }
    }

    redirectHome = () =>{ 
        if(this.state.state)          
        return <Redirect to='/' />   
    }
    render() {
        return (
            <Fragment>
                <Header />
                {this.redirectHome()}
                <div className="container">
                    <h1>Usuários</h1>
                  <DataTable users={this.state.users} />
                </div>
            </Fragment>
        );
    }
}
export default Users;