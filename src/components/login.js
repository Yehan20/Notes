import React, { useReducer, useRef, useEffect ,useState } from "react";
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
    const [disabled,setDisabled] =useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        const user = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        if (user.email === '' || user.password === '') {
            dispatch({ type: 'FEILDS-EMPTY', payload: user })
            setDisabled(false)
            return
        }


        try {
            setDisabled(false)
            await login(Auth, user.email, user.password)
            navigate('/user-home')

        }
        catch (error) {
            dispatch({ type: 'FALSE-LOGIN', payload: 'Error' })
            setDisabled(false)
            emailRef.current.value=''
            passwordRef.current.value=''
        }

        


    }

    return (
        <>
            <Slider />
            <Container>
                <div className="login-container">

                    {state.errorMsg && <Alert className="w-100" style={{ maxWidth: '500px' }} variant={state.color}>{state.errorMsg}</Alert>}

                    <Form className="login-form" onSubmit={handleSubmit}>
                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control  required ref={emailRef} type="email" defaultValue={state.email} placeholder="Enter email" />
                        </FormGroup>
                        <FormGroup className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required ref={passwordRef} type="password" defaultValue={state.password} placeholder="Enter Password" />
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