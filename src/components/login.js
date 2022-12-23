import React, { useReducer, useRef } from "react";
import { Form,  FormGroup, Button, Container } from 'react-bootstrap'
import {reducer,defaultState} from '../reducer/reducer'
import  Slider from '../components/slider'
import {Link} from 'react-router-dom'
const Login = () => {
    const emailRef = useRef();
    const passwordRef = useRef()

    // const defaultState={
    //     email:'',
    //     password:'',
    //     users:[]
    // }

  

    const handleSubmit=(e)=>{
        e.preventDefault();
        const user={
           email: emailRef.current.value,
           password:passwordRef.current.value
        }
        console.log(user)
        dispatch({type:'ADD-USER',payload:user})
    }
    const[state,dispatch]=useReducer(reducer,defaultState)
    return (
        <>
            <Slider />
            <Container>
                <div className="login-container">
                    <h3>Login  </h3>
                    <Form className="login-form" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control ref={emailRef} type="email" defaultValue={state.email} placeholder="Enter email" />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control ref={passwordRef} type="password" defaultValue={state.password} placeholder="Enter Password" />
                        </FormGroup>
                        <Button varient='info' type="submit" className="d-block">Login</Button>
                    </Form>
                    <Link to='/sign-up' className='text-dark' title="Click to visit">Not a user ?click here </Link>
                    <div>
                        {
                          state.users && state.users.map((user,index)=>{
                            
                            return <p key={index}>{user.email}</p>
                        })}
                    </div>
                </div>
            </Container>
        </>
    );
}



export default Login;