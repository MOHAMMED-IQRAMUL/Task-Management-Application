import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Tasks from './pages/Tasks'
import ProtectedRoute from './components/ProtectedRoute'

export default function App(){
  return (
    <BrowserRouter  basename="/Task-Management-Application">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<ProtectedRoute><Tasks/></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}
