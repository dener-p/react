import React, {Component} from 'react';
import TokenService from './Token';
import {Redirect} from 'react-router-dom';

class Logout extends Component {
    componentDidMount(){
        TokenService.removeToken();
    }

    redirectHome = () => {
        return <Redirect to='/' />
    }
    render(){
        return(
            <div>
            {this.redirectHome()}
            </div>
        );
    }
}
export default Logout;