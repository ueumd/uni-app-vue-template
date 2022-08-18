import { http } from '@/config'
export function getUserId() {
  return http.get('/api/v1/getUserinfo')
}

export function login() {
  return http.get('/api/v1/login')
}
