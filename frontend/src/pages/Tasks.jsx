import React, { useEffect, useState } from 'react'
import api from '../api'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks, addTask, updateTask, removeTask } from '../store/slices/tasks'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { setToken } from '../store/slices/auth'
import Layout from '../components/Layout'
import { useToast } from '../components/Toast'
import Card from '../components/Card'
import Button from '../components/Button'
import Input from '../components/Input'
import EmptyState from '../components/EmptyState'
import Modal from '../components/Modal'
import TaskCard from '../components/TaskCard'
import TaskSkeleton from '../components/TaskSkeleton'
import ServerDownSkeleton, { TaskListSkeleton } from '../components/ServerDownSkeleton'
import { useServerStatus } from '../hooks/useServerStatus'

const schema = z.object({ title: z.string().min(1), description: z.string().optional() })

export default function Tasks() {
  const dispatch = useDispatch()
  const tasks = useSelector(s => s.tasks.list)
  const { register, handleSubmit, reset, setValue } = useForm({ resolver: zodResolver(schema) })
  const [editingTask, setEditingTask] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { isOnline, isLoading: serverLoading, checkConnection } = useServerStatus()

  useEffect(() => { fetchTasks() }, [])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)
  const toast = useToast()
  
  async function fetchTasks() {
    try {
      setLoading(true)
      const res = await api.get('/tasks')
      dispatch(setTasks(res.data))
      setError(null)
    } catch (err) {
      const message = err.response?.data?.error || 'Failed to fetch tasks'
      setError(message)
      toast.push(message, 'error')
      startRetryPolling()
    } finally { setLoading(false) }
  }
  
  async function onCreate(data) {
    try {
      const res = await api.post('/tasks', data)
      dispatch(addTask(res.data))
      reset()
      setShowCreateModal(false)
      toast.push('Task created successfully! 🎉', 'info')
    } catch (err) {
      toast.push(err.response?.data?.error || 'Failed to create', 'error')
    }
  }
  
  async function onUpdate(data) {
    try {
      const res = await api.put(`/tasks/${editingTask.id}`, data)
      dispatch(updateTask(res.data))
      setEditingTask(null)
      reset()
      toast.push('Task updated! ✨', 'info')
    } catch (err) {
      toast.push(err.response?.data?.error || 'Failed to update', 'error')
    }
  }
  
  async function onDelete(id) {
    if (!confirm('Are you sure you want to delete this task?')) return
    try {
      await api.delete(`/tasks/${id}`)
      dispatch(removeTask(id))
      toast.push('Task deleted', 'info')
    } catch (err) { 
      toast.push('Delete failed','error') 
    }
  }
  
  async function onToggle(task) {
    try {
      const newStatus = task.status === 'pending' ? 'completed' : 'pending'
      const res = await api.put(`/tasks/${task.id}`, { status: newStatus })
      dispatch(updateTask(res.data))
      const message = newStatus === 'completed' ? 'Task completed! 🎉' : 'Task reopened'
      toast.push(message, 'info')
    } catch (err) { 
      toast.push('Update failed','error') 
    }
  }
  
  function onEdit(task) {
    setEditingTask(task)
    setValue('title', task.title)
    setValue('description', task.description || '')
  }
  
  function logout(){ 
    dispatch(setToken(null))
    toast.push('Logged out successfully', 'info') 
  }
  
  // retry polling
  const [retrying, setRetrying] = React.useState(false)
  const retryRef = React.useRef(null)
  function startRetryPolling(){
    if (retryRef.current) return
    setRetrying(true)
    retryRef.current = setInterval(async () => {
      try {
        await api.get('/health')
        clearInterval(retryRef.current); retryRef.current = null; setRetrying(false);
        fetchTasks()
      } catch (e) {
        // keep retrying
      }
    }, 30000) // retry every 30s
  }
  function stopRetryPolling(){ 
    if (retryRef.current){ 
      clearInterval(retryRef.current); retryRef.current = null; setRetrying(false) 
    } 
  }

  const completedTasks = tasks.filter(t => t.status === 'completed')
  const pendingTasks = tasks.filter(t => t.status === 'pending')

  return (
    <Layout>
      {retrying && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Reconnecting...</h3>
              <p className="text-slate-400">Backend appears to be sleeping. Retrying automatically.</p>
            </div>
            <Button onClick={() => { stopRetryPolling(); fetchTasks() }}>
              Try again now
            </Button>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Your Tasks
              </span>
            </h1>
            <p className="text-gray-600">Stay organized and productive</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={() => setShowCreateModal(true)}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Task
            </Button>
            <button onClick={logout} className="btn-ghost">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m0 4H7m0 0l-4-4m0 4l4 4" />
              </svg>
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="text-center">
            <div className="text-2xl font-bold text-blue-600">{tasks.length}</div>
            <div className="text-sm text-gray-500">Total Tasks</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{pendingTasks.length}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </Card>
          <Card className="text-center">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </Card>
        </div>

        {/* Server Status Check */}
        {!isOnline && !serverLoading && (
          <div className="space-y-6">
            <Card className="border-yellow-200 bg-yellow-50">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-yellow-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-yellow-700">Server Connection Lost</div>
                  <div className="text-sm text-yellow-600">Unable to connect to server. Showing cached data and skeleton placeholders.</div>
                </div>
                <Button onClick={checkConnection} className="ml-auto">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </Button>
              </div>
            </Card>
            
            {/* Show skeleton when server is down */}
            <TaskListSkeleton />
          </div>
        )}

        {/* Normal content when server is online */}
        {isOnline && (
          <>
            {/* Error state */}
            {error && (
              <Card className="border-red-200 bg-red-50">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <div className="font-medium text-red-700">Connection Error</div>
                    <div className="text-sm text-red-600">{error}</div>
                  </div>
                </div>
              </Card>
            )}

            {/* Loading skeletons */}
            {loading && (
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => <TaskSkeleton key={i} />)}
              </div>
            )}

            {/* Tasks */}
            {!loading && tasks.length === 0 ? (
              <EmptyState 
                title="No tasks yet" 
                subtitle="Create your first task to get started on your productivity journey"
                action={
                  <Button onClick={() => setShowCreateModal(true)}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Create your first task
                  </Button>
                }
              />
            ) : (
              <div className="space-y-6">
                {/* Pending Tasks */}
                {pendingTasks.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      Pending Tasks ({pendingTasks.length})
                    </h2>
                    <div className="space-y-3">
                      {pendingTasks.map(task => (
                        <TaskCard 
                          key={task.id} 
                          task={task} 
                          onToggle={onToggle} 
                          onDelete={onDelete}
                          onEdit={onEdit}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                  <div className="space-y-3">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      Completed Tasks ({completedTasks.length})
                    </h2>
                    <div className="space-y-3">
                      {completedTasks.map(task => (
                        <TaskCard 
                          key={task.id} 
                          task={task} 
                          onToggle={onToggle} 
                          onDelete={onDelete}
                          onEdit={onEdit}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Task Modal */}
      <Modal 
        open={showCreateModal} 
        onClose={() => { setShowCreateModal(false); reset(); }}
        title="Create New Task"
      >
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input {...register('title')} placeholder="What needs to be done?" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Input {...register('description')} placeholder="Add more details (optional)" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button 
              type="button" 
              onClick={() => { setShowCreateModal(false); reset(); }}
              className="btn-ghost"
            >
              Cancel
            </button>
            <Button type="submit">Create Task</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Task Modal */}
      <Modal 
        open={!!editingTask} 
        onClose={() => { setEditingTask(null); reset(); }}
        title="Edit Task"
      >
        <form onSubmit={handleSubmit(onUpdate)} className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input {...register('title')} placeholder="What needs to be done?" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Description</label>
            <Input {...register('description')} placeholder="Add more details (optional)" />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button 
              type="button" 
              onClick={() => { setEditingTask(null); reset(); }}
              className="btn-ghost"
            >
              Cancel
            </button>
            <Button type="submit">Update Task</Button>
          </div>
        </form>
      </Modal>
    </Layout>
  )
}
