
import { Button, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context'
import './LoginPage.css'


const LoginPage = () => {
    let { loginUser, user } = useContext(AuthContext)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()

    if (user) {
        navigate('/')
    }
    
    return <section className='loginPage'>
        <div className='loginPage-grid'>
            <h1>Log in <span>Will Invoice</span></h1>
            <h2>or <a href='/register'>Create Account</a></h2>

            <TextField 
                id="username" 
                label="Company Id" 
                type="text" 
                variant="standard"
                value={userData.username}
                onChange={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <TextField 
                id="password" 
                label="Password" 
                type="password" 
                autoComplete="current-password" 
                variant="standard"
                onChange={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))} 
            />

            <Button variant="contained" onClick={() => loginUser(userData)}>Login</Button>
        </div>
    </section>
}

export default LoginPage