import { defineStore } from 'pinia'
export default defineStore({
  id: 'user',
  state: () => {
    return {
      phone: 13012345678,
      token: 'token...'
    }
  },
  actions: {
    setPhone(phone: number): void {
      this.phone = phone
    }
  }
})
