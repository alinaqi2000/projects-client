import { Spinner } from '@chakra-ui/react'
import React from 'react'
import "./LoadingScreen.scss"
export default function LoadingScreen() {
    return (
        <div className="loading-overlay">
            <Spinner size="xl" />
        </div>
    )
}
