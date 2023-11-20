/** @format */

import axios from 'axios'
import { apiConfig } from '../common/constants/config'

export const api = axios.create({
  baseURL: apiConfig.BASE_URL as string,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
