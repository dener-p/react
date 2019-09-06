import TokenService from './Token';
import ApiService from './ApiService';
import JwtDecode from 'jwt-decode';

const AuthRoutes = {
  
    userNotLogged: () => {
        const token = TokenService.getToken()
        if(token){
            const jwtDec = JwtDecode(token);
            ApiService.User(jwtDec.uid)
            .then(res => {            
                return false;
            }).catch(err => { TokenService.removeToken(); return true;});
          
        }
        else{
            return true;
        }
    }

}
export default AuthRoutes;