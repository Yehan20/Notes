import React from 'react'
import { Container } from 'react-bootstrap'
import {useGlobalContext} from '../contexts/AuthContext'
export const Header = () => {
    const {heading} = useGlobalContext();
    // console.log('rendered')
    return (
        <header>
            <Container>
                <h1>Notes 2.0 {heading}</h1>
            </Container>
        </header>
    )
}

