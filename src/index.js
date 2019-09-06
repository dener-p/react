import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './Pages/Home/Home';
import Users from './Pages/Users/Users';
import Login from './Pages/Login/LoginForm';
import Cadastro from './Pages/Cadastro/Cadastro';
import NotFound from './Pages/NotFound/NotFound';
import Logout from './utils/Logout';

import { BrowserRouter, Switch, Route} from 'react-router-dom';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path='/' exact={true} component={Home} />
            <Route path='/users' component={Users} />
            <Route path='/cadastro' component={Cadastro} />
            <Route path='/logout' component={Logout} />
            <Route path='/login' component={Login} />
            <Route component={NotFound} />

        </Switch>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
