import './HomePage.css'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context'
import { axiosAPI } from '../../utils'
import { thousandMask } from '../../utils/Mask'
import AttachFileIcon from '@mui/icons-material/AttachFile';

const HomePage = () => {
    let { user, logoutUser } = useContext(AuthContext)
    const [productData, setProductData] = useState({ 
        product: 'Engine',
        car_year: '',
        price: '', 
        mileage: '',
        car_part_base64: ''
    })

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    })

    const products = [
        {"name": "Engine" },
        {"name": "Transmission" },
        {"name": "Clutch" },
        {"name": "Battery" },
        {"name": "Alternator" },
        {"name": "Radiator" },
        {"name": "Axle" },
        {"name": "Suspension" },
        {"name": "Brakes" },
        {"name": "Catalytic Converter" },
        {"name": "Muffler" },
        {"name": "Fuel Tank" },
    ]

    const order = () => {
        console.log(productData)
    }
    
    const handleFile = (event) => {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = event => {
            setProductData(prev => ({ ...prev, car_part_base64: event.target.result }))
        }
    }

    return <section className='homePage'>
        <div className='homePage-grid'>
            <h1>Register a new car part</h1>

            <FormControl variant="standard" >
                <InputLabel>Part</InputLabel>
                <Select
                    id="product"
                    value={productData?.product}
                    onChange={event => setProductData(prevData => ({...prevData, product: event.target.value}))}
                    onBlur={event => setProductData(prevData => ({...prevData, product: event.target.value}))}
                    label="Tax Structure"
                >
                    {
                        products.map(product => <MenuItem value={product.name}>{ product.name }</MenuItem>)
                    }
                </Select>
            </FormControl>
            <TextField 
                id="car_year" 
                label="Car Year"
                variant="standard"
                value={productData.car_year}
                inputProps={{ maxLength: 4 }}
                onChange={event => setProductData(prevData => ({ ...prevData, [event.target.id]: event.target.value.replace(/\D/g, '') }))}
                onBlur={event => setProductData(prevData => ({...prevData, [event.target.id]: event.target.value.replace(/\D/g, '') }))}
            />
            <TextField 
                id="mileage" 
                label="Mileage"
                variant="standard"
                value={productData.mileage}
                inputProps={{ maxLength: 7 }}
                onChange={event => setProductData(prevData => ({ ...prevData, [event.target.id]: thousandMask(event.target.value) }))}
                onBlur={event => setProductData(prevData => ({...prevData, [event.target.id]: thousandMask(event.target.value) }))}
            />
            <TextField 
                id="price" 
                label="Price" 
                variant="standard"
                value={productData.price}
                onChange={event => setProductData(prevData => ({ ...prevData, [event.target.id]: event.target.value }))}
                onBlur={event => setProductData(prevData => ({...prevData, [event.target.id]: formatter.format(event.target.value.replace(/\D/g, ''))}))}
            />
            <input type='file' onChange={handleFile} />
            <Button variant="contained" onClick={() => order()}>REGISTER CAR PART</Button>
            <hr></hr>
            <Button variant="text" onClick={() => logoutUser()}>Logout</Button>
        </div>
    </section>
}

export default HomePage