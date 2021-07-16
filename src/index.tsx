import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { ChakraProvider } from "@chakra-ui/react"

import "./styles/main.scss"
import Header from './components/Layout/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import UsersService from './services/UsersService'
import { User } from './models/User'
import LoadingScreen from './components/Layout/LoadingScreen'


const App = () => {
    const [user, setUser] = useState<User | null>(null)
    const [verifying, serVerifying] = useState<boolean>(false)
    useEffect(() => {
        UsersService.verify()
        UsersService.authUser.subscribe(setUser)
        UsersService.verifying.subscribe(serVerifying)
        return () => {
            UsersService.authUser.unsubscribe()
            UsersService.verifying.subscribe()
        }
    }, [])
    return (
        <ChakraProvider>
            <div className="App">
                {verifying ? "" : <Header />}
                {
                    verifying ? <LoadingScreen /> : user ? <Dashboard user={user} />
                        :
                        <Login />
                }


            </div>

        </ChakraProvider >
    )
}

ReactDOM.render(<App />, document.getElementById("root"))