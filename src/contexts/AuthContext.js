import React, { useContext, useState } from "react";
import {auth as Auth} from '../firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'

const AuthContext = React.createContext();

export const useGlobalContext = () => {
    return useContext(AuthContext)
}

// const signIn=(email,password)=>{
//     return createUserWithEmailAndPassword(Auth,email,password)
// }

export const AuthProvider = ({ children }) => {
    const[heading,setHeading]=useState('');

    const changeHeading =(value)=>{
        setHeading(value)
    }

    return (

        <AuthContext.Provider value={{heading,changeHeading}}>
            {children}

        </AuthContext.Provider>
    )
}

const Book = ()=>{
    const data = useContext(AuthContext)
    data.sayHi()
    return <>
       <h3>This is a Book</h3>
    </>
}


