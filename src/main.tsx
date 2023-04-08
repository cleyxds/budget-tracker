import React from "react"
import ReactDOM from "react-dom/client"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { App } from "./App"
import { Landing } from "./components/Landing/Landing"
import { Dashboard } from "./components/Dashboard/Dashboard"
import { ErrorPage } from "./components/ErrorPage"

import "./styles/reset.css"
import "./styles/index.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
    errorElement: <ErrorPage />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <RouterProvider router={router} />
  </React.StrictMode>
)
