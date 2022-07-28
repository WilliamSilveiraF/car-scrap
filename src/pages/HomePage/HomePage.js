import './HomePage.css'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context'
import { axiosAPI } from '../../utils'

const HomePage = () => {
    let { user, logoutUser } = useContext(AuthContext)
    console.log(user)
    const [productData, setProductData] = useState({ 'product': 'Product A', 'productAmount': 0 })

    const products = [
        {"name": "Product A", "price": 21.00, "tax": 0.05 },
        {"name": "Product B", "price": 32.00, "tax": 0.12 },
        {"name": "Product C", "price": 14.00, "tax": 0.01 },
        {"name": "Product D", "price": 102.00, "tax": 0.07 },
        {"name": "Product E", "price": 203.00, "tax": 0.08 }
    ]

    const order = () => {
        const product = products.filter(product => product.name === productData.product)[0]
        axiosAPI.post('invoice/', { ...productData, "userID": user.user_id, "product": product })
            .then(res => {
                const link = document.createElement('a')
                link.href = res.data.base64
                link.setAttribute('download', `invoice.pdf`)
                document.body.appendChild(link)
                link.click()
                window.alert("Order created successfully!")
            })
            .catch(err => {
                window.alert("Failed to create order.")
                console.log(err)
            })
    }
    return <section className='homePage'>
        <div className='homePage-grid'>
            <h1>Cart</h1>

            <FormControl variant="standard" >
                <InputLabel>Product</InputLabel>
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
                id="productAmount" 
                label="Amount" 
                type="number"
                min={0} 
                variant="standard"
                value={productData?.productAmount}
                onChange={event => setProductData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
                onBlur={event => setProductData(prevData => ({...prevData, [event.target.id]: event.target.value}))}
            />

            <Button variant="contained" onClick={() => order()}>Order product</Button>
            <hr></hr>
            <Button variant="text" onClick={() => logoutUser()}>Logout</Button>
        </div>
    </section>
}

export default HomePage