
import './registerPage.css'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context'
import { axiosAPI } from '../../utils'

const structureTypes = [['LLC', 'LIMITED LIABILITY COMPANY'],
                        ['SP', 'SOLE PROPRIETORSHIPS'],
                        ['PARTNER', 'PARTNERSHIP'],
                        ['CORP', 'CORPORATION'],
                        ['S CORP', 'S CORPORATION'],
                        ['ND', 'NOT DEFINED']]

const RegisterPage = () => {
    //let { user } = useContext(AuthContext)

    const [userData, setUserData] = useState()
    const [companyData, setCompanyData] = useState({})

    const navigate = useNavigate()
    
    const register = () => {
        axiosAPI.post('auth/register', {'user': userData, 'company': companyData})
            .then(res => {
                window.alert("Account created successfully!")
                console.log(res.data)
                navigate('/')
            })
            .catch(_ => window.alert("Failed to register user."))
    }
    
    return <section className='registerPage'>
        <form className='registerPage-grid'>
            <h1>Register Page</h1>
            <TextField
                id="username" 
                label="Username" 
                type="text" 
                variant="standard"
                value={userData?.username}
                onChange={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <TextField 
                id="email" 
                label="Email" 
                type="email" 
                variant="standard"
                value={userData?.email}
                onChange={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <TextField 
                id="password" 
                label="Password" 
                type="password" 
                variant="standard"
                value={userData?.password}
                onChange={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setUserData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <hr></hr>
            
            <TextField 
                id="name" 
                label="Company name" 
                type="text" 
                variant="standard"
                value={companyData?.name}
                onChange={event => setCompanyData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setCompanyData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <TextField 
                id="ein" 
                label="Ein" 
                type="text" 
                variant="standard"
                value={companyData?.ein}
                onChange={event => setCompanyData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setCompanyData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <FormControl variant="standard" >
                <InputLabel>Tax Structure</InputLabel>
                <Select
                    
                    id="structure"
                    value={companyData?.structure}
                    onChange={event => setCompanyData(prevData => ({...prevData, structure: event.target.value}))}
                    onBlur={event => setCompanyData(prevData => ({...prevData, structure: event.target.value}))}
                    label="Tax Structure"
                >
                    <MenuItem value=""><em>None</em></MenuItem>
                    {
                        structureTypes.map(([ID, structure]) => <MenuItem value={ID}>{ structure }</MenuItem>)
                    }
                </Select>
            </FormControl>

            <TextField 
                id="cellphone" 
                label="Cellphone" 
                type="text" 
                variant="standard"
                value={companyData?.cellphone}
                onChange={event => setCompanyData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setCompanyData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <hr></hr>
            <TextField 
                id="zip" 
                label="ZIP" 
                type="text" 
                variant="standard"
                value={companyData?.address?.zip}
                onChange={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
                onBlur={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
            />
            <TextField 
                id="street" 
                label="Street" 
                type="text" 
                variant="standard"
                value={companyData?.address?.street}
                onChange={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
                onBlur={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
            />
            <TextField 
                id="city" 
                label="City" 
                type="text" 
                variant="standard"
                value={companyData?.address?.city}
                onChange={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
                onBlur={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
            />
            <TextField 
                id="state" 
                label="State" 
                type="text" 
                variant="standard"
                value={companyData?.address?.state}
                onChange={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
                onBlur={event => setCompanyData(prevData => ({...prevData, address: {...prevData.address, [event.target.id]: event.target.value}}))}
            />
            <hr></hr>
            <Button variant="contained" onClick={() => register()} >Register</Button>
        </form>
    </section>
}

export default RegisterPage