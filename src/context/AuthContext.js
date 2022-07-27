import { createContext, useState, useEffect }  from 'react'
import jwt_decode from 'jwt-decode'
import { axiosAPI } from '../utils'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext()


export default AuthContext

export const AuthProvider = ({children}) => {
    const initToken = () => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null

    const navigate = useNavigate()

    let [user, setUser] = useState(initToken)
    let [authTokens, setAuthTokens] = useState(initToken)
    let [loading, setLoading] = useState(true)
    
    useEffect(() => {
        let fiveMinutes = 1000 * 60 * 5
        let interval = setInterval(() => {
            if (authTokens) {
                console.log(authTokens)
                updateToken()
            }
        }, fiveMinutes)

        return () => clearInterval(interval)
    }, [authTokens, loading])

    const loginUser = async (event) => {
        event.preventDefault()

        axiosAPI.post('auth/token/', {'username': event.target.username.value, 'password': event.target.password.value})
            .then(res => {
                setAuthTokens(res.data)
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens', JSON.stringify(res.data))
                navigate('/')
            })
            .catch(_ => console.error("Login failed"))
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const updateToken = async () => {
        axiosAPI.post('auth/token/refresh/', {"refresh": authTokens.refresh})
            .then(res => {
                setAuthTokens(res.data)
                setUser(jwt_decode(res.data.access))
                localStorage.setItem('authTokens', JSON.stringify(res.data))
            })
            .catch(err => {
                console.error("Update token failed", err)
                logoutUser()
            })
    }

    let context = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser
    }

    return <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
}