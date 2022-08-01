import { http } from '@/config'
export function getUserId(id) {
  return http.get('/api/v1/getUserinfo')
}
