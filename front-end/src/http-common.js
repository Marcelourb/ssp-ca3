import axios from "axios";

// setting where the axios will fetch some data

export default axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    "Content-type": "application/json"
  }
});