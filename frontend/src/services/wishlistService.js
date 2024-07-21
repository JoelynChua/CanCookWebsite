import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getAllWishlists = async () => {
    const response = await axios.get(`${API_URL}/wishlists`);
    return response.data;
  };