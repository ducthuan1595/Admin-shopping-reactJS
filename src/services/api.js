import axios from 'axios';
import { jwtAxios } from './jwt';
import { getTokenFromCookie } from '../store/userStore';

export const URL_API = process.env.REACT_APP_API_URL;
export const url = `${URL_API}/api`;

// axios.defaults.validateStatus = (status) => {
//   return status < 500;
// };

export const requires = {

  getAllUser: () => {
    return axios.get(`${url}/get-all-user`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  getAllOrder: (page) => {
    return axios.get(`${url}/get-all-order?page=${page}`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  getDetailOrder: (orderId) => {
    return axios.get(`${url}/get-detail-order/${orderId}`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },

  getAllProduct: (page, limit) => {
    return axios.get(`${url}/get-all-product?page=${page}&limit=${limit}`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  addProduct: (value, formData) => {
    return jwtAxios.post(`${url}/add-product`,formData, value);
  },
  editProduct: (value, formData) => {
    return jwtAxios.post(`${url}/update-product`, formData, value);
  },
  getEditProduct: (productId) => {
    return axios.get(`${url}/get-edit-product/${productId}`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  deleteProduct: (productId, userId) => {
    return jwtAxios.delete(`${url}/delete-product/${productId}?userId=${userId}`, {
      headers: {
        'Authorization': `Bearer ${getTokenFromCookie()}`
      },
      validateStatus: function (status) {
        return status = true;
      }
    });
  },

  login: (email, password) => {
    return axios.post(`${url}/admin/login`, {email, password}, {
      withCredentials: true,
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  logout: () => {
    return axios.post(`${url}/logout`,{},{
        withCredentials: true,
        credentials: "include",
        validateStatus: function (status) {
          return status < 500;
        }
      } 
    );
  },
  refreshToken: () => {
    return axios.get(`${url}/refresh-token`, {
      withCredentials: true,
      credentials: "include",
      validateStatus: function (status) {
        return status < 500;
      }
    })
  },

  getRoomsChat: () => {
    return axios.get(`${url}/get-room`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  getMessages: (roomId) => {
    return axios.get(`${url}/get-message/${roomId}`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },

  sendMessage: (value) => {
    return axios.post(`${url}/send-message`, value, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },
  deleteRoom: (roomId) => {
    return axios.delete(`${url}/delete-room/${roomId}`, {
      validateStatus: function (status) {
        return status < 500;
      }
    });
  },

//   getImage: (img) => {
//     return axios.get(`${url}/send-image/${img}`)
//   }
}
