import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/auth'
import tasksReducer from './slices/tasks'

export default configureStore({
  reducer: { auth: authReducer, tasks: tasksReducer }
})
