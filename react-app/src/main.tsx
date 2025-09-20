import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import Dashboard from './pages/Dashboard'
import Success from './pages/Success'
import Cancel from './pages/Cancel'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'course/:id', element: <CourseDetail /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'success', element: <Success /> },
      { path: 'cancel', element: <Cancel /> },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
