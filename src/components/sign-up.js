import React, { useState } from 'react'
import { Form, FormGroup, Button, Container, Alert } from 'react-bootstrap'
import Slider from '../components/slider'
import { useGlobalContext } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { auth as Auth,db } from '../firebase'
import {useNavigate} from 'react-router-dom'
import {doc,setDoc} from 'firebase/firestore';


const SignUp = () => {
    const navigate = useNavigate();

    const [newUser, setUser] = useState({ email: '', password: '', c_pass: '' })
    const [error, setError] = useState('')
    const { signUp } = useGlobalContext();
    const [features, setFeatures] = useState('');
    const [disabled,setDisabled]=useState(false)

    // useHis

 

  
    const handleInput = (target) => {
    
        const name = target.name;
        const input = target.value
        setUser({ ...newUser, [name]: input })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setDisabled(true)
        setError('')
        if (newUser.password !== newUser.c_pass) {
            setError('Not Matching passwords')
            setFeatures('warning')
            setDisabled(false)
        }

        else {
            try {
                const result = await signUp(Auth, newUser.email, newUser.password)
                console.log(result);
                const data={
                    notes:[],
                }
                await setDoc(doc(db, "notes", newUser.email), data); 
                setDisabled(false)

                navigate('/user-home')
            } catch (err) {
                console.log('error is', err);
                setError(err.message)
                setFeatures('warning')
                setDisabled(false)
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
            
                  
                        <FormGroup>
                            <Form.Label>Email address</Form.Label>
                            <Form.Control  required type="email" value={newUser.email} name="email" onChange={(e) => handleInput(e.target)} placeholder="Enter email" />
                        </FormGroup>

                        <FormGroup className="my-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control required type="password" value={newUser.password} name="password" onChange={(e) => handleInput(e.target)} placeholder="Enter Password" />
                        </FormGroup>

                        <FormGroup className="my-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control required type="password" value={newUser.c_pass} name="c_pass" onChange={(e) => handleInput(e.target)} placeholder="Enter Password" />
                        </FormGroup>



                        <Button disabled={disabled} varient='info' type="submit" className="d-block">Create an Account</Button>
                        <Link to='/' className='text-dark text-center mt-3 d-block' title="Click to visit">Already  a user ?click here </Link>


                    </Form>
                </div>
            </Container>
        </>
    )
}
export default SignUp
