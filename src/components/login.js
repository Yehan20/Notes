import React, { useReducer, useRef, useEffect } from "react";
import { Form, FormGroup, Button, Container, Alert } from 'react-bootstrap'
import { reducer, defaultState } from '../reducer/reducer'
import Slider from '../components/slider'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from "../contexts/AuthContext";
import { auth as Auth } from '../firebase'
const Login = () => {

    useEffect(() => {
        changeHeading('')
    }, [])

    const navigate = useNavigate();


    const emailRef = useRef();
    const passwordRef = useRef()
    const { changeHeading, login } = useGlobalContext()
    const [state, dispatch] = useReducer(reducer, defaultState)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        if (user.email === '' || user.password === '') {
            dispatch({ type: 'FEILDS-EMPTY', payload: user })
            return
        }


        try {
            console.log(state.email)
            await login(Auth, user.email, user.password)
            navigate('/user-home')

        }
        catch (error) {
            dispatch({ type: 'FALSE-LOGIN', payload: 'Error' })
        }


    }

    return (
        <>
            <Slider />
            <Container>
                <div className="login-container">
                    <h3>Login  {String(state.empty)}</h3>
                    {state.errorMsg && <Alert className="w-100" style={{ maxWidth: '500px' }} variant={state.color}>{state.errorMsg}</Alert>}

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
                </div>
            </Container>
        </>
    );
}



export default Login;