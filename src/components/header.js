import React from 'react'
import {useGlobalContext} from '../contexts/AuthContext'
export const Header = () => {
    const {heading} = useGlobalContext();
    // console.log('rendered')
    return (
        <header>
          
                <h1>Notes 2.0 {heading}</h1>
           
        </header>
    )
}

