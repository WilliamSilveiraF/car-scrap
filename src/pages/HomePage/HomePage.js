import './HomePage.css'
import { Button } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context'
import RegisterNewCarPart from './components/RegisterNewCarPart'
import SellCarPart from './components/SellCarPart'

const HomePage = () => {
    const [section_status, set_section_status] = useState('new')
    const [metaMaskAcc, setMetaMaskAcc] = useState('')
    let { user, logoutUser } = useContext(AuthContext)

    useEffect(() => {
        try {
            let provider = window.ethereum;
            if (typeof provider !== "undefined") {
                provider
                    .request({ method: "eth_requestAccounts" })
                    .then((accounts) => {
                        setMetaMaskAcc(accounts[0])
                        console.log('accounts', accounts[0])
                    })
                    .catch(err => console.log(err))
            } else {
                logoutUser()
                window.alert('MetaMask is not installed!!!')
            }
        } catch (err) {
            console.error(err)
        }
    }, [])

    if (!metaMaskAcc) {
        return <p>Carregando...</p>
    }

    const components = {
        'new': <RegisterNewCarPart metaMaskAcc={metaMaskAcc} />,
        'sell': <SellCarPart metaMaskAcc={metaMaskAcc} />
    }

    return <section className='homePage'>
        <div className='homePage-grid'>
            <h1>{section_status === 'new' ? 'Register a new car part' : 'Sell a car part'}</h1>
            <h2>{ user.username } | Ein { user.ein_number }</h2>
            <h3><span className={`span_section ${ section_status === 'new' ? 'span_active' : '' }`} onClick={() => set_section_status('new')}>Register</span> | <span className={`span_section ${ section_status === 'sell' ? 'span_active' : '' }`} onClick={() => set_section_status('sell')}>Sell</span></h3>
            { components[section_status] }
            <hr></hr>
            <Button variant="text" onClick={() => logoutUser()}>Logout</Button>
        </div>
    </section>
}

export default HomePage