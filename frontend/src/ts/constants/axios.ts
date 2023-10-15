import axios from 'axios'

export const apiUrl = 'http://127.0.0.1:8000/api/'

export const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
