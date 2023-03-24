import React from "react"
import ReactDOM from "react-dom/client"

import { App } from "./App"

import { createBrowserRouter, RouterProvider } from "react-router-dom"

import "./styles/reset.css"
import "./styles/index.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <></>
  }
])

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
