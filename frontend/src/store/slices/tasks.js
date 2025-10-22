import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'tasks',
  initialState: { list: [] },
  reducers: {
    setTasks(state, action) { state.list = action.payload },
    addTask(state, action) { state.list.push(action.payload) },
    updateTask(state, action) { state.list = state.list.map(t => t.id === action.payload.id ? action.payload : t) },
    removeTask(state, action) { state.list = state.list.filter(t => t.id !== action.payload) }
  }
})

export const { setTasks, addTask, updateTask, removeTask } = slice.actions
export default slice.reducer
