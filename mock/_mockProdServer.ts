import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

import modules from './user'
export function setupProdMockServer() {
  createProdMockServer([...modules])
}
