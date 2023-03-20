import axios from "axios";
import Resizer from "react-image-file-resizer";
import { isAuthenticated } from "utils/helper";

class CloudenaryServices {
  get path() {
    return `${process.env.REACT_APP_API}`;
  }

  resizeImage(file){
    return new Promise((resolve) => {
        Resizer.imageFileResizer(
          file,
          520,
          520,
          "png",
          100,
          0,
          (uri) => {
            resolve(uri);
          },
          "base64"
        );
      })
  }

  async uploadImage(payload){
    try {
      const res = await axios.post(`${this.path}/upload-image`, payload, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return res?.data;
    } catch (error) {
      return error;
    }
  }

  async removeImage(id){
    try {
      const res = await axios.post(`${this.path}/remove-image`, {public_id: id}, {
        headers: { Authorization: `Bearer ${isAuthenticated()}` }
      });
      return res;
    } catch (error) {
      return error;
    }
  }
}

export default CloudenaryServices;
