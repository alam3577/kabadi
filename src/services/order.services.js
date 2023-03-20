import axios from "axios";
import { isAuthenticated } from "utils/helper";
class OrderServices {
  get path() {
    return `${process.env.REACT_APP_API}/order`;
  }

  async addOrders(payload) {
    try {
      const { data } = await axios.post(`${this.path}`, payload, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getAllOrders() {
    try {
      const { data } = await axios.get(`${this.path}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteOrders(id) {
    try {
      const { data } = await axios.delete(`${this.path}/${id}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default OrderServices;
