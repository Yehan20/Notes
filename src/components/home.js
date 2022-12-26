import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useGlobalContext } from '../contexts/AuthContext'
import { Button, Container, Form, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth as Auth,db } from '../firebase'
import {getDoc,doc} from 'firebase/firestore'
import {reducer} from '../reducer/taskReducer'


const context = React.createContext();

const Home = () => {
  const { user, logout } = useGlobalContext();
  const navigate = useNavigate()
  const [add,isAdd]=useState(false);

  const handleLogout = async () => {
    await logout(Auth)
    navigate('/')
  }

  useEffect(()=>{

  })
  const getNotes=()=>{
    const docRef=doc(db,'notes',user.email)
  }
  // const [tasks, setTask] = useState(['task']) 
  // const [finish, setFinish] = useState(false);
  // const [disabled, setDisabled] = useState(false);
  // const [singleTask,setSingleTask]=useState([]) // the arrray for each note


  const defaultState={
     finish:false,
     disabled:false,
     singleTask:[],
     task:['task']
  }
  
 
  const[state,dispatch ]=useReducer(reducer,defaultState)
  console.log(state.singleTask);

  const handleCheck=(values,e)=>{

    dispatch({type:'HANDLE-CHECK',payload:values}) // in dispact send an object of a type and payload to be taken in the action

    if(e.target.checked){
       e.target.disabled=true
    };
  }

  return (
    <context.Provider value={{handleCheck}}>
          <Container>{user.email}
      <Button variant='danger' onClick={handleLogout}>
        Logout
      </Button>
      <Button onClick={()=>isAdd(true)}>
        Add New Note
      </Button>
      {
        add &&  <Form className="login-form" >
        {
          state.task.map((task, index) => {
            return <Task key={index} disabled={state.disabled} finish={state.finish} />
          })
        }
        <Button varient='info' disabled={state.disabled}  onClick={() =>dispatch({type:'ADD-TASK',payload:'task'})} className="d-block">add task</Button>
        <Button varient='info' disabled={state.disabled} onClick={()=>dispatch({type:'HANDLE-SAVE'})} className="d-block">save</Button>
      </Form>
      }


    </Container>
    </context.Provider>
  )

}

const Task = ({ finish, disabled }) => {

  const{handleCheck}=useContext(context)
  const [taskValue,setTaskValue]=useState('')

  return <FormGroup className="my-3">
    <Form.Label>Task</Form.Label>
    <div className='d-flex'>
      <Form.Control type="text" value={taskValue} onChange={(e)=>setTaskValue(e.target.value)} disabled={disabled} placeholder="add your tasks" />
      {finish && <Form.Check type="checkbox" value={taskValue} onChange={(e)=>handleCheck(taskValue,e)} />
      }
    </div>
  </FormGroup>
}
export default Home
