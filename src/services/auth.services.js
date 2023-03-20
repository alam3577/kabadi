import axios from "axios";

class AuthService {
    get path() {
        return `${process.env.REACT_APP_API}`;
    }

   async login(payload) {
      try {
        const res = await axios.post(`${this.path}/login`, payload);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async logOut() {
      try {
        localStorage.removeItem('jwt');
        const res = await axios.get(`${this.path}/logout`);
        return res;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async authenticate(data) {
      try {
       localStorage.setItem('jwt', JSON.stringify(data));
      } catch (error) {
        return error;
      }
    }
}

export default AuthService;