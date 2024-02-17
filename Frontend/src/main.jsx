import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import FeedPage from './components/FeedPage.jsx'
import FirstPage from './components/FirstPage.jsx'
import LoginComplete from './components/LoginComplete.jsx'
import LoginPage from './components/LoginPage.jsx'
import SignUpPage from './components/SignUpPage.jsx'

import ChatPage from './components/ChatPage.jsx'
import './index.css'

const router=createBrowserRouter([
  {
    path:'/',
    element:<FirstPage/>
  },
  {
    path:'/login',
    element:<LoginPage/>
  },
  {
    path:'/signup',
    element:<SignUpPage/>
  },
  {
    path:'/homepage',
    element:<LoginComplete/>
  },
  {
    path:'/feed',
    element:<FeedPage/>
  },
  {
    path:'/talk',
    element:<ChatPage/>
  }
])

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <RouterProvider router={router}>
    <React.StrictMode>
      {/* Your application components go here */}
    </React.StrictMode>
  </RouterProvider>
);
