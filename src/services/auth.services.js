import axios from "axios";
import { isAuthenticated } from "utils/helper";

class AuthService {
    get path() {
        return `${process.env.REACT_APP_API}`;
    }

   async login(payload) {
      try {
        const { data } = await axios.post(`${this.path}/login`, payload);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async signUp(payload) {
      try {
        const { data } = await axios.post(`${this.path}/signup`, payload);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async logOut() {
      try {
        localStorage.removeItem('KabadiwallaaJwt');
        localStorage.removeItem('KabadiwallaaUser');
        const { data } = await axios.get(`${this.path}/logout`);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async forgotPassword(payload) {
      try {
        const { data } = await axios.post(`${this.path}/forgot-password`, payload);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async verifySignUpOTP(payload) {
      try {
        const { data } = await axios.post(`${this.path}/verify-otp`, payload);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async verifyForgotPasswordOTP(payload) {
      try {
        const { data } = await axios.post(`${this.path}/verify-reset-password-otp`, payload);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async resetPassword(payload) {
      try {
        const { data } = await axios.post(`${this.path}/reset-password`, payload);
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async getAllUsers() {
      try {
        const { data } = await axios.post(`${this.path}/get-all-users`, {
          headers: { Authorization: `Bearer ${isAuthenticated()}` }
        });
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    }

    async authenticate(data, user) {
      try {
       localStorage.setItem('KabadiwallaaJwt', JSON.stringify(data));
       localStorage.setItem('KabadiwallaaUser', JSON.stringify(user))
      } catch (error) {
        return error;
      }
    }
}

export default AuthService;