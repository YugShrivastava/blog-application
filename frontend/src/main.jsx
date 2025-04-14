import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './components/AuthLayout.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import SignUp from './components/SignUp.jsx'
import Profile from './components/Profile.jsx'
import AddBlog from './components/AddBlog.jsx'
import Logout from './components/Logout.jsx'
import Blog from './components/Blog.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <AuthLayout children={<Login />} authentication={false} />,
      },
      {
        path: "signup",
        element: <AuthLayout children={<SignUp />} authentication={false} />,
      },
      {
        path: "add-blog",
        element: <AuthLayout children={<AddBlog />} authentication={true} />,
      },
      {
        path: "profile",
        element: <AuthLayout children={<Profile />} authentication={true} />,
      },
      {
        path: "logout",
        element: <AuthLayout children={<Logout />} authentication={true} />,
      },
      {
        path: "blog/:blogId",
        element: <AuthLayout children={<Blog />} authentication={true} />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
)
