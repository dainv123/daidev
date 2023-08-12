import axios from 'axios'
import cookies from 'js-cookie'

const http = () => axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${cookies.get('accessToken')}`
  }
})

const httpMultipart = () => axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${cookies.get('accessToken')}`
  }
})

export default {
  async get(url, params) {
    try {
      const res = await http().get(url, params);
      return res.data;
    }
    catch (error) {
      return error;
    }
  },

  async post(url, params) {
    try {
      const res = await http().post(url, params);
      return res.data;
    }
    catch (error) {
      return error;
    }
  },

  async postMultipart(url, params) {
    try {
      const res = await httpMultipart().post(url, params);
      return res.data;
    }
    catch (error) {
      return error;
    }
  }
};
