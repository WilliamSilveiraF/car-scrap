import { Route, Navigate } from 'react-router-dom'

export default function PrivateRoute({ children }) {
    const auth = false

    return auth ? children : <Navigate to="/login" />
}