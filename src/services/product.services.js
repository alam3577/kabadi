import axios from "axios";
import { isAuthenticated } from "utils/helper";
class ProductServices {
  get path() {
    return `${process.env.REACT_APP_API}/product`;
  }

  async getProducts() {
    try {
      const res = await axios.get(`${this.path}`);
      return res;
    } catch (error) {
      return error;
    }
  }

  async getProduct(id) {
    try {
      const res = await axios.get(`${this.path}/${id}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addProduct(payload) {
    try {
      const res = await axios.post(`${this.path}`, payload, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return res;
    } catch (error) {
      return Promise.reject(error)
    }
  }

  async updateProduct(id, payload) {
    try {
      const res = await axios.patch(`${this.path}/${id}`, payload, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return res;
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      const res = await axios.delete(`${this.path}/${id}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}

export default ProductServices;
