import { createContext, useState, useEffect }  from 'react'
import jwt_decode from 'jwt-decode'
import { axiosAPI } from '../utils'


const AuthContext = createContext()


export default AuthContext

export const AuthProvider = ({children}) => {
    let [user, setUser] = useState(null)
    let [authTokens, setAuthTokens] = useState(null)

    const loginUser = async (event) => {
        event.preventDefault()

        axiosAPI.post('auth/token/', {'username': event.target.username.value, 'password': event.target.password.value})
            .then(res => {
                setAuthTokens(res.data)
                setUser(jwt_decode(res.data.access))
            })
            .catch(_ => console.error("Login failed"))
        /*let response = fetch('http://localhost:8080/api/auth/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': event.target.username.value, 'password': event.target.password.value})
        })*/
        /*
        let data = (await response).json()
        console.log(data.access)
        if ((await response).status === 200) {
            
            
        } else {
            console.error("Login failed")
        }*/
        //console.log('data: ', data)
    }

    let context = {
        user: user,
        loginUser: loginUser,

    }
    return <AuthContext.Provider value={context}>
        {children}
    </AuthContext.Provider>
}