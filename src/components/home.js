import React from 'react'
import {useGlobalContext} from '../contexts/AuthContext'
import {Button,Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {auth as Auth} from '../firebase'
const Home = () => {
  const {user,logout}= useGlobalContext(); 
  const navigate = useNavigate()
  const handleLogout=async()=>{
      await logout(Auth)
      navigate('/')
  }
  return (
    <Container>{user.email}
       <Button variant='danger' onClick={handleLogout}>
           Logout
       </Button>
    </Container>
  )

}
export default Home
