import { defineStore } from 'pinia'
export default defineStore({
  id: 'user',
  state: () => {
    return {
      phone: 13012345678,
      token: 'token...'
    }
  },
  getters: {
    fullName: (state: any) => {
      return state.name + '丰'
    }
  },
  actions: {
    setPhone(phone: number): void {
      this.phone = phone
    }
  }
})
