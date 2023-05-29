import axios from 'axios';

export const url = 'http://localhost:5050/api';

export const requires = {

  getAllUser: () => {
    return axios.get(`${url}/get-all-user`);
  },
  getAllOrder: () => {
    return axios.get(`${url}/get-all-order`);
  },
  getDetailOrder: (orderId) => {
    return axios.get(`${url}/get-detail-order/${orderId}`);
  },

  getAllProduct: (page, limit) => {
    return axios.get(`${url}/get-all-product?page=${page}&limit=${limit}`);
  },
  addProduct: (value, formData) => {
    return axios.post(`${url}/add-product`,formData, value);
  },
  editProduct: (value, formData) => {
    return axios.post(`${url}/update-product`, formData, value);
  },
  getEditProduct: (productId) => {
    return axios.get(`${url}/get-edit-product/${productId}`);
  },
  deleteProduct: (productId) => {
    return axios.delete(`${url}/delete-product/${productId}`);
  },

  login: (email, password) => {
    return axios.post(`${url}/admin/login`, {email, password});
  },
  logout: () => {
    return axios.post(`${url}/logout`, {}, {
      withCredentials: true,
    });
  }
}
