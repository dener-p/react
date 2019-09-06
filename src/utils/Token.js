
const KEY = 'x-access-point';
const TokenService = {    

    hasToken : () => {
       const token = TokenService.getToken();
      return token ?  token : false;
    },

    setToken: (token) => {
        window.localStorage.setItem(KEY, token);
    },

    getToken: () => window.localStorage.getItem(KEY),

    removeToken: () => {
        window.localStorage.removeItem(KEY);
    }
}
export default TokenService;