import React, { useEffect, useReducer, useState } from 'react'
import { Form, FormGroup, Button, Container, Alert } from 'react-bootstrap'
import Slider from '../components/slider'
import { useGlobalContext } from '../contexts/AuthContext'
import { reducer, defaultState } from '../reducer/reducer'
import { Link } from 'react-router-dom'
import { auth as Auth } from '../firebase'
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate();

    const [newUser, setUser] = useState({ email: '', password: '', c_pass: '' })
    const [error, setError] = useState('')
    const { changeHeading, signUp, user } = useGlobalContext();
    const [features, setFeatures] = useState('');

    // useHis

    useEffect(() => {
        changeHeading('Sign Up')
    }, [])


    const [state, action] = useReducer(reducer, defaultState)
    const handleInput = (target) => {
        // console.log('fires');
        // console.log(value)
        const name = target.name;
        const input = target.value
        setUser({ ...newUser, [name]: input })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        if (newUser.password !== newUser.c_pass) {
            setError('Not Matching passwords')
            setFeatures('warning')
        }

        else {
            try {
                const result = await signUp(Auth, newUser.email, newUser.password)
                console.log(result);
                navigate('/user-home')
            } catch (err) {
                console.log('error is', err);
                setError(err.message)
                setFeatures('warning')
                setUser({ email: '', password: '', c_pass: '' })

            }
        }

    }
    return (
        <>
            <Slider />
            <Container>
                <div className="sign-up-container">
                    <h3>Sign Up</h3>
                    <Form className="login-form sign-up-form" onSubmit={handleSubmit}>
                     
                            {error && <Alert variant={features}>
                                <p className='m-0 text-sm'>{error}</p>
                            </Alert>}
                            {/* {user.email} */}
                  
                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" value={newUser.email} name="email" onChange={(e) => handleInput(e.target)} placeholder="Enter email" />
                        </FormGroup>

                        <FormGroup className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={newUser.password} name="password" onChange={(e) => handleInput(e.target)} placeholder="Enter Password" />
                        </FormGroup>

                        <FormGroup className="my-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" value={newUser.c_pass} name="c_pass" onChange={(e) => handleInput(e.target)} placeholder="Enter Password" />
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
