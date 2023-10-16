import React from 'react'
import { Navigate } from 'react-router-dom'

export const ProtectedRouteElementNotLoggedIn = ({ element: Component, ...props }) => {
  return props.loggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace />
}

export const ProtectedRouteElementLoggedIn = ({ element: Component, ...props }) => {
  return !props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
}

export const ProtectedRouteRandomAddress = (props) => {
  return props.loggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />
}
