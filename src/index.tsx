import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import App from './app/App'
import { store } from 'app/store'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Login } from 'features/Login/Login'
import { Todolists } from 'features/Todolists/Todolists'
import { ErrorPage } from 'features/ErrorPage/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Navigate to={'/error'} />,
    children: [
      {
        index: true,
        element: <Navigate to='/todolists' />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/todolists',
        element: <Todolists />
      }
      // {
      //     path: '/error',
      //     element: <ErrorPage/>,
      // },
    ]
  },
  {
    path: '/error',
    element: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
