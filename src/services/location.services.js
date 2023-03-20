import axios from "axios";
import { isAuthenticated } from "utils/helper";

class LocationServices {
  get path() {
    return `${process.env.REACT_APP_API}/location`;
  }

  async getAllLocation() {
    try {
      const { data } = await axios.get(`${this.path}`);
      console.log({data})
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getLocation(id) {
    try {
      const { data } = await axios.get(`${this.path}/${id}`, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async addLocation(payload) {
    try {
      const { data } = await axios.post(`${this.path}`, payload, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateLocation(id, payload) {
    try {
      const { data } = await axios.patch(`${this.path}/${id}`, payload, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async deleteLocation(id) {
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

export default LocationServices;
