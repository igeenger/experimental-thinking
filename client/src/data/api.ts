import axios from 'axios'

import type {
  RegInput, RegOutput,
  AttemptInput, AttemptOutput, AddEmailInput, UserOutput,
} from '@/common/api'

const request = async <R = void>(url: string, data?: unknown): Promise<R> => {
  try {
    const response = (
      data
        ? await axios.post('/api' + url, data)
        : await axios.get('/api' + url)
    )
    return response.data as R
  } catch (error) {
    alert('произошла ошибка')
    throw error
  }
}

export const api = {
  reg(input: RegInput) {
    return request<RegOutput>('/reg', input)
  },

  attempt(input: AttemptInput) {
    return request<AttemptOutput>('/attempt', input)
  },

  addEmail(input: AddEmailInput) {
    return request('/add-email', input)
  },

  users() {
    return request<UserOutput[]>('/users')
  },
}
