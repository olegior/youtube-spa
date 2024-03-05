import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '@a1rth/css-normalize'
import { Provider } from 'react-redux'
import { store } from './redux/index.ts'
import './styles/index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SearchPage } from './pages/SearchPage.tsx'
import { FavoritesPage } from './pages/FavoritesPage.tsx'
import { LoginPage } from './pages/LoginPage.tsx'
import { RegisterPage } from './pages/RegisterPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'

const router = createBrowserRouter([
  {
    path: '/', element: <App />,
    children: [
      { path: '/', element: <SearchPage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  },
  { path: 'login', element: <LoginPage /> },
  { path: 'register', element: <RegisterPage /> },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
  ,
)
