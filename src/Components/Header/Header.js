import React, {Component} from 'react';
import LinkWrapper from '../../utils/LinkWrapper';
import ApiService from '../../utils/ApiService';
import TokenService from '../../utils/Token';
import jwtDecode from "jwt-decode";
import './Header.css';
import AuthRoutes from '../../utils/AuthRoutes';


class Header extends Component {
  constructor(props){
    super(props) 
    this.state = {
      user: '',
      logged: '',
    };
  }
  componentDidMount() {    

    const token = TokenService.getToken();   
     if(token){
      if(!AuthRoutes.userNotLogged()){              
         const decToken = jwtDecode(token);
         ApiService.User(decToken.uid)
         .then(res => {
           if(res.id){
            this.setState({ logged: 'true'})
            this.setState({user: [this.state.user, ...res.username ] });   
            const interval = setInterval(() => {
              if(!AuthRoutes.userNotLogged())
                ApiService.Online();
              else
                clearInterval(interval);
            }, 55000);
          }  
          }).catch(err => this.setState({user:  'Home', logged: 'false'}));
    
    }}else{     
      this.setState({user:  'Home', logged: 'false'});
      clearInterval(this.interval); 
    }   
  }
 
  logged = () =>{
    if(this.state.logged === 'true'){
    return (
      <ul className="right">
        <li><LinkWrapper to="/logout" >Logout</LinkWrapper> </li>
        <li><LinkWrapper to='/users' user={this.state.user}>Home</LinkWrapper></li> 
      </ul>);
   }
    else  return (<ul className="right"> 
    <li><LinkWrapper to="/login" >Login</LinkWrapper> </li>
    </ul> );  
    }

    render (){
      return (  
        <nav>
    <div className="nav-wrapper indigo lighten-2">
      <LinkWrapper to="/" className="brand-logo margin-left" activeStyle={{}}>
      { this.state.user }</LinkWrapper>
      {this.logged()}   
    </div>
  </nav>
       ); }
}
export default Header;