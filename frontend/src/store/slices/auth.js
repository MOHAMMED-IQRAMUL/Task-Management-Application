import { createSlice } from '@reduxjs/toolkit'

const initial = { token: localStorage.getItem('token') || null }

const slice = createSlice({
  name: 'auth',
  initialState: initial,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      if (action.payload) localStorage.setItem('token', action.payload)
      else localStorage.removeItem('token')
    }
  }
})

export const { setToken } = slice.actions
export default slice.reducer
