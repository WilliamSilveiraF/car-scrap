import React, { useState} from "react";
import { TextField, Button } from '@mui/material'
import Web3 from 'web3'

export default function SellCarPart({ metaMaskAcc }) {
    const smart_contract = require('../smartcontract_args.json')
    const [productData, setProductData] = useState({ contract: '', itin: '' })
    const web3 = new Web3(window.ethereum)

    const sell = async () => {
        const carpart = new web3.eth.Contract(smart_contract.abi, `${productData.contract}`)
        carpart.methods.sellCarPart(productData.itin)
                            .send({ from: metaMaskAcc })
                            .then(res => {
                                console.log(res)
                                window.alert('Success: the car part was selled')
                            })
    }
    return <>
        <TextField 
            id="contract" 
            label="Contract ID"
            variant="standard"
            value={productData.contract}
            onChange={event => setProductData(prevData => ({ ...prevData, [event.target.id]: event.target.value }))}
            onBlur={event => setProductData(prevData => ({...prevData, [event.target.id]: event.target.value }))}
        />
        <TextField 
            id="itin" 
            label="ITIN"
            variant="standard"
            value={productData.itin}
            onChange={event => setProductData(prevData => ({ ...prevData, [event.target.id]: event.target.value.replace(/\D/g, '') }))}
            onBlur={event => setProductData(prevData => ({...prevData, [event.target.id]: event.target.value.replace(/\D/g, '') }))}
        />
        <Button variant="contained" onClick={() => sell()}>SELL CAR PART</Button>
    </>
}