import React, { useContext, useState } from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { thousandMask } from '../../../utils/Mask'
import Web3 from 'web3'
import { AuthContext } from '../../../context'

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

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
})

export default function RegisterNewCarPart({ metaMaskAcc }) {
    let { user } = useContext(AuthContext)
    const web3 = new Web3(window.ethereum)
    const smart_contract = require('../smartcontract_args.json')
    const [productData, setProductData] = useState({ 
        product: 'Engine',
        car_year: '',
        price: '', 
        mileage: '',
        crashed_car_base64: '',
        serialnumber: ''
    })

    const order = async () => {
        try {
            new web3.eth.Contract(smart_contract.abi)
                .deploy({ 
                    data: smart_contract.bytecode.object,
                    arguments: [
                        user.ein_number,                // _issuer_ein
                        productData.product,            // _part_category
                        productData.car_year,           // _part_car_origin_year
                        productData.mileage,            // _part_mileage
                        productData.price,              // _part_price
                        //productData.crashed_car_base64, // _crashed_car_base64
                        productData.serialnumber       // _serial_number
                    ]
                })
                .send({ from: metaMaskAcc })
                .then(res => window.alert(`Success: the contract was created at ${res._address}`))
        } catch (err) {
            console.error(err)
        }
    }
    
    const handleFile = (event) => {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        reader.onload = event => {
            setProductData(prev => ({ ...prev, crashed_car_base64: event.target.result }))
        }
    }

    return <>
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
        <TextField 
            id="serialnumber" 
            label="Serial Number" 
            variant="standard"
            value={productData.serialnumber}
            onChange={event => setProductData(prevData => ({ ...prevData, [event.target.id]: event.target.value }))}
            onBlur={event => setProductData(prevData => ({...prevData, [event.target.id]: event.target.value }))}
        />
        <input type='file' onChange={handleFile} />
        <Button variant="contained" onClick={() => order()}>REGISTER CAR PART</Button>
    </>
}