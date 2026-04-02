import axios from 'axios'
const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'https://farmconnect-api-cqc0.onrender.com/api' })
api.interceptors.request.use(cfg => {
  try { const u = JSON.parse(localStorage.getItem('fc_user')); if (u?.token) cfg.headers.Authorization = `Bearer ${u.token}`; } catch {}
  return cfg;
})
api.interceptors.response.use(r => r, err => {
  if (err.response?.status === 401) { localStorage.removeItem('fc_user'); window.location.href = '/login'; }
  return Promise.reject(err);
})
export default api
