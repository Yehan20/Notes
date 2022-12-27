import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { useGlobalContext } from '../contexts/AuthContext'
import { Button, Container, Form, FormGroup } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth as Auth,db } from '../firebase'
import {getDoc,doc,updateDoc} from 'firebase/firestore'
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


  const defaultState={
    finish:false,
    disabled:false,
    singleTask:[],
    task:['task'],
    noteList:[],
    noteList2:[],
    singleTaskClone:[],
 
    
 }
 const[state,dispatch ]=useReducer(reducer,defaultState)



  const getNotes=useCallback(async()=>{
    const docRef=doc(db,'notes',user.email)
    try{
      const docData = await getDoc(docRef);
      dispatch({type:'ADD-NOTES',payload:docData.data().notes})
    }
    catch(error){
      console.log(error);
    }
    
  },[user.email])



  useEffect(()=>{
    getNotes()
 },[state.finish,getNotes])




  const handleOne=(values,e)=>{

    dispatch({type:'ADD-ONE',payload:{values:values,completed:false}}) // in dispact send an object of a type and payload to be taken in the action
    e.target.disabled=true
    
  }

  const handleSave=async()=>{
    dispatch({type:'HANDLE-SAVE'})
    const docRef=doc(db,'notes',user.email);
    const createdDay = new Date().toJSON().slice(0,10)// get date
    try{
      await updateDoc(docRef,{
        notes:[...state.noteList,{note:state.singleTaskClone,date:createdDay,completed:false}]
      })
    }catch(err){
      console.log(err);
    }
  }

  const finalizeNote=async(e)=>{

    const docRef=doc(db,'notes',user.email);
    e.target.disabled=true
    try{

      await updateDoc(docRef,{
        notes:[...state.noteList]
      })
  
      
    }catch(err){
      console.log(err);
    }
  }



  return (
    <context.Provider value={{handleOne}}>
          <Container>{user.email}
      <Button variant='danger' onClick={handleLogout}>
        Logout
      </Button>
      <Button onClick={()=>isAdd(!add)}>
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
        <Button varient='info' disabled={state.disabled} onClick={()=>handleSave()} className="d-block">save</Button>
      </Form>
      }
      <div className="note-list">

    
        {state.noteList && state.noteList.map((item,index)=>{
          const not =item.note;
          const test=state.noteList2[index].completed
          console.log('test',test);
          console.log(item);
          return <div item={item.note} className='note' key={index}>
             <h3>{item.date}</h3>
              {
                not.map((item,index)=>{
                  return <div className='d-flex' key={index}>
                    <Form.Control  value={item.task} disabled={true} />
                    </div>
                })
              }
              {!test &&    <Form.Control type='number' min='0' onChange={()=> dispatch({type:'FINALIZE',payload:index})} placeholder='Completed task amounts' max={item.note.length}  /> }
           
              <Button disabled={test} onClick={(e)=>finalizeNote(e)}>{test?'Tasks Marked':'Mark Tasks'}</Button>
          </div> 
        })}
      </div>


    </Container>
    </context.Provider>
  )

}

const Task = ({ finish, disabled }) => {

  const{handleOne}=useContext(context)
  const [taskValue,setTaskValue]=useState('')

  return <FormGroup className="my-3">
    <Form.Label>Task</Form.Label>
    <div className='d-flex'>
      <Form.Control type="text" value={taskValue} onChange={(e)=>setTaskValue(e.target.value)} disabled={disabled} placeholder="add your tasks" />

      <Button onClick={(e)=>handleOne(taskValue,e)} value={taskValue}> Save Task </Button>
    </div>
  </FormGroup>
}
export default Home
