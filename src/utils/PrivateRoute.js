import { Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context'

export default function PrivateRoute({ children }) {
    const { user } = useContext(AuthContext)

    return user ? children : <Navigate to="/login" />
}