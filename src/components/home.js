import React, { useState } from 'react'
import { useGlobalContext } from '../contexts/AuthContext'
import { Button, Container, Form ,FormGroup} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth as Auth } from '../firebase'
const Home = () => {
  const { user, logout } = useGlobalContext();
  const navigate = useNavigate()
  const handleLogout = async () => {
    await logout(Auth)
    navigate('/')
  }
  const [tasks,setTask]=useState(['task'])
  const [finish,setFinish]=useState(false);
  const [disabled,setDisabled]=useState(false);
  return (
    <Container>{user.email}
      <Button variant='danger' onClick={handleLogout}>
        Logout
      </Button>
      <Form className="login-form" >
       {
        tasks.map((task,index)=>{
          return <Task key={index} disabled={disabled} finish={finish}/>
        })
       }
      <Button varient='info' onClick={()=>setTask([...tasks,'task'])} className="d-block">add task</Button>
      <Button varient='info' onClick={()=>{
        setFinish(!finish)
        setDisabled(true)
        }
        } className="d-block">save</Button>
      </Form>

    </Container>
  )

}

const Task = ({finish,disabled})=>{
 return  <FormGroup className="my-3">
      <Form.Label>Task</Form.Label>
      <div className='d-flex'>
      <Form.Control type="text" disabled={disabled} placeholder="add your tasks" />
       {finish &&  <Form.Check type="checkbox"  />
     }
      </div>
   </FormGroup>
}
export default Home
