import React, { useEffect, useReducer, useState } from 'react'
import { Form,  FormGroup,  Button, Container } from 'react-bootstrap'
import Slider from '../components/slider'
import {useGlobalContext} from '../contexts/AuthContext'
import {reducer,defaultState} from '../reducer/reducer'
import {Link} from 'react-router-dom'
 const SignUp = () => {
    const [email,setemail] = useState('');
    const [password,setPassword]= useState('')
    const [c_password,setC_Password]= useState('')
    const {changeHeading} = useGlobalContext();
    
    useEffect(()=>{
       changeHeading('Sign Up')
    },[])


    const [state,action]=useReducer(reducer,defaultState)
  return (
    <>
         <Slider />
            <Container>
                <div className="sign-up-container">
                    <h3>Sign Up</h3>
                    <Form className="login-form sign-up-form">
                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control  type="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder="Enter email" />
                        </FormGroup>

                        <FormGroup className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="Enter Password" />
                        </FormGroup>

                        <FormGroup className="my-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={c_password} onChange={(e)=>setC_Password(e.target.value)}  placeholder="Enter Password" />
                        </FormGroup>

                        

                        <Button varient='info' type="submit" className="d-block">Create an Account</Button>
                        <Link to='/' className='text-dark text-center mt-3 d-block' title="Click to visit">Not a user ?click here </Link>
                    </Form>
                </div>
            </Container>
    </>
  )
}
export default SignUp
