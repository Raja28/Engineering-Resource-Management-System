// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast';
import OpenRoute from './components/OpenRoute.tsx'
import { Layout } from './Layout.tsx'
import PrivateRoute from './components/PrivateRoute.tsx'
import { Dashboard } from './pages/Dashboard.tsx'


const router = createBrowserRouter([
  { path: "/", element: <OpenRoute><App /></OpenRoute> },

  {
    path: "/dashboard", element: <PrivateRoute><Layout /></PrivateRoute>, children:
      [
        { path: "", element: <Dashboard /> }
      ]
  }
])

createRoot(document.getElementById('root')!).render(
  <>
    <RouterProvider router={router} />
    <Toaster position="top-center" />
  </>
)
