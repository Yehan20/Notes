import React, { useContext, useEffect, useState } from "react";
import {auth as Auth} from '../firebase'
import {createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword,signOut} from 'firebase/auth'

const AuthContext = React.createContext();

export const useGlobalContext = () => {
    return useContext(AuthContext)
}


const signUp=(Auth,email,password)=>{
    return createUserWithEmailAndPassword(Auth,email,password)
}

const login = (Auth,email,password)=>{
    return signInWithEmailAndPassword(Auth,email,password)
}

const logout = (Auth)=>{
    return signOut(Auth)
}


export const AuthProvider = ({ children }) => {
    const[heading,setHeading]=useState('');
    const[user,setCurrentUser]=useState({});
    const[loading,setLoading]=useState(true)

    useEffect(()=>{
        const unsubscribe =onAuthStateChanged(Auth, (user) => {

              setCurrentUser(user)
              setLoading(false)

          });

          return unsubscribe;
    },[])

    const changeHeading =(value)=>{
        setHeading(value)
    }

    return (

        <AuthContext.Provider value=
        {{ heading,
           changeHeading,
           signUp,
           user,
           login,
           logout
        
        }}>
            {!loading && children}

        </AuthContext.Provider>
    )
}



