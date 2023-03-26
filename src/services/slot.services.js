import axios from "axios";

class SlotServices {
  get path (){
    return `${process.env.REACT_APP_API}`
  }

  async getSlots() {
     try {
      const { data } = await axios.get(`${this.path}/slot`);
      return data;
     } catch (error) {
       return Promise.reject(error);
     }
  }

  async getUSerSlots(date) {
    try {
     const { data } = await axios.get(`${this.path}/user-slot/${date}`);
     return data;
    } catch (error) {
      return Promise.reject(error);
    }
 }

  async getSlot(id) {
    try {
     const { data } = await axios.get(`${this.path}/slot/${id}`);
     return data;
    } catch (error) {
      return Promise.reject(error);
    }
 }

 async addSlot(payload) {
    try {
     const { data } = await axios.post(`${this.path}/slot`, payload);
     return data;
    } catch (error) {
      return Promise.reject(error);
    }
 }

 async updateSlot(id, payload) {
    try {
     const { data } = await axios.patch(`${this.path}/slot/${id}`, payload);
     return data;
    } catch (error) {
      return Promise.reject(error);
    }
 }

 async deleteSlot(id) {
    try {
     const { data } = await axios.delete(`${this.path}/slot/${id}`);
     return data;
    } catch (error) {
      return Promise.reject(error);
    }
 }
}

export default SlotServices;