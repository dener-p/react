import TokenService from './Token';
const API_URL = 'http://127.0.0.1:3333/';
const ApiService = {
  
    CreateUsers: (username, password, email) => {
      return   fetch(API_URL + "register", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password, email})
      
      }).then(res => res.json());

    }, 
    ListaUsers: () => {
        const token = TokenService.getToken();
        return fetch(API_URL + "show", {
          method: "GET",
          headers:  {"Authorization" : `Bearer ${token}`} 
          },  
        ).then(res => res.json());
    },
    Logar: (email, password) => {
     return   fetch(API_URL + "authenticate", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
             email: email, password: password
            })
          
          }).then(res => res.json());
    },
    User: id => {
      const token = TokenService.getToken();
      return fetch(API_URL + "user/"+ id, {
        method: "GET",
        headers: {"Authorization" : `Bearer ${token}` }
      
      }).then(res => res.json());
    },
    Online: () => {
      const token = TokenService.getToken();
      return fetch(API_URL + "update", {
        method: "GET",
        headers: {"Authorization" : `Bearer ${token}` }
      
      }).then(resp => resp.json());
    }

}
export default ApiService;