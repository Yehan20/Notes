import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { useGlobalContext } from '../contexts/AuthContext'
import { Button, Container, Form, FormGroup, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth as Auth, db } from '../firebase'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { reducer , defaultState } from '../reducer/taskReducer'
import { AiFillCheckSquare, AiFillDelete } from 'react-icons/ai'
import {GrNote} from 'react-icons/gr'
import Loader from './Loader'



const context = React.createContext();

const Home = () => {
  const { user, logout } = useGlobalContext();
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false)


  const handleClose = () => {
    dispatch({ type: 'RESET' })
    setShow(false);
  }



  const handleLogout = async () => {
    await logout(Auth)
    navigate('/')
  }



  const [state, dispatch] = useReducer(reducer, defaultState)



  const getNotes = useCallback(async () => {
    setLoading(true)
    const docRef = doc(db, 'notes', user.email)
    try {

      const docData = await getDoc(docRef);
      let userNote= docData.data().notes;
      setLoading(false)
      dispatch({ type: 'ADD-NOTES', payload: userNote })
      dispatch({type:'FIND-TOTAL'})
    }
    catch (error) {
      console.log(error);
    }


  }, [user.email])



  useEffect(() => {
  
    getNotes()
  }, [state.finish, getNotes, state.done])



  
  const handleOne = (values, e) => {

    dispatch({ type: 'ADD-ONE', payload: { values: values, completed: false } }) // in dispact send an object of a type and payload to be taken in the action
    e.target.textContent = 'Saved';
    e.target.disabled = true

  }

  const handleSave = async () => {
   
    dispatch({ type: 'HANDLE-SAVE' })
    const docRef = doc(db, 'notes', user.email);
    setShow(false)
    const createdDay = new Date().toJSON().slice(0, 10) +"  Time: " +String(new Date().getHours()) +":"+ String(new Date().getMinutes()) // get date 
    try {
      await updateDoc(docRef, {
        notes: [...state.noteList, { note: state.singleTaskClone, date: createdDay, completed: false,completedTasks:state.completedTasks }].reverse()
      })
    } catch (err) {
      console.log(err);
    }
  }

  const finalizeNote = async (e) => {

    const docRef = doc(db, 'notes', user.email);
    e.target.disabled = true
    console.log("note lis",state.noteList)
    try {

      await updateDoc(docRef, {
        notes: [...state.noteList]
      })
      dispatch({ type: 'DONE' })

    } catch (err) {
      console.log(err);
    }
  }

  const deleteNote = async(id)=>{
     dispatch({type:'DELETE-NOTE',payload:id})
     dispatch({type:'FIND-TOTAL'})
     const newNotes = state.noteList.filter((note,index)=>index!==id)
     const docRef = doc(db, 'notes', user.email);
     try {
      await updateDoc(docRef, {
        notes: [...newNotes]
      })
    } catch (err) {
      console.log(err);
    }
    
  }
 // console.log('note list',state.noteList);


  return (
    <context.Provider value={{ handleOne }}>
      <Container fluid className='note-container d-flex home-container '>
      
          <div className='sec-1 flex-wrap' >
          <Button variant='danger' className='logout-btn' onClick={handleLogout}>
            Logout
          </Button>
       
          <Button className='p-0 add-btn hvr-buzz-out   text-dark' title='Add Note' onClick={() => setShow(!show)}>   <GrNote color={'#fff'}/>   New Note </Button>
             
               <div className='keys justify-content-center'>
                  <h4 className='green'>Completed 1 or More Tasks  </h4>
                  <h4 className='red'>Completed 0 Tasks</h4>
                  <h4 className='blue'>Not Completed Note</h4>
               </div>

          </div>

          {
            show && <Modal show={show} onHide={handleClose} className='addModel' >
              <Modal.Header closeButton>
                <Modal.Title>New Note</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button varient='info' disabled={state.disabled} onClick={() => dispatch({ type: 'ADD-TASK', payload: 'task' })} className="d-block">Add task</Button>
                <Form className="login-form" >
                  {/* <Form.Label>Note Name</Form.Label>
                  <Form.Control placeholder='' /> */}
                  {
                    state.task.map((task, index) => {
                      return <Task key={index} disabled={state.disabled} finish={state.finish} />
                    })
                  }

                  <Button varient='info' disabled={state.task.length !== state.singleTaskClone.length} onClick={() => handleSave()} className="d-block">Save Note</Button>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          }
          <div className="note-list">
            {loading && <Loader />}
            {!loading &&
              <h2 className='w-100 px-2 text-center'>Note Created : {state.noteList.length} | Tasks Completed : {state.totalTaskAmount}</h2>
            }
            {!loading  && state.noteList.length===0 && <h2 className='w-100 text-center no-tasks'>No Tasks Create One</h2>}
            {
              !loading &&  state.noteList.length>0 && state.noteList.map((item, index) => {
                const not = item.note;
                const completedTasks2 = Number(item.completedTasks) ;
               
     
                let done = completedTasks2 >-1?true:false;
        
                const cmplted = state.noteList2[index].completed
                return <div id={`${completedTasks2===0?'zero':''}`} className={`note ${cmplted ? 'completed-note' : 'incomplete-note'}`} key={index}>
                  <AiFillDelete className='delete-btn' onClick={()=>deleteNote(index)} title='Delete Note'/>
                  <h3>{item.date}</h3>
                  <h4>Your Tasks</h4>
                  <ol>
                    {
                     not && not.map((item, index) => {
                        return <li key={index}>{item.task}</li>
                        
                      })
                    }
                  </ol>
                   <h5>Tasks Completed : {completedTasks2===0||completedTasks2===-1?'None':completedTasks2}</h5>
                  {!cmplted && <Form.Control type='number' min={0}  defaultValue={0} onFocus={(e) => dispatch({ type: 'FINALIZE', payload: {index:index,count:e.target.value  } })} onChange={(e) => dispatch({ type: 'FINALIZE', payload: {index:index,count:e.target.value} })} placeholder='Completed task amounts' max={item.note.length} />}
                
                  {done &&  <Button className={`mt-2 ${cmplted?'px-0':'px-2'}`} disabled={cmplted} onClick={(e) => finalizeNote(e)}>{cmplted ? <><AiFillCheckSquare size={30}  /> Note Complete</>: 'Mark Tasks Completed'}</Button>} 
                </div>
              })
            }

          </div>

      </Container>
    </context.Provider>
  )

}

const Task = ({disabled }) => {

  const { handleOne } = useContext(context)
  const [taskValue, setTaskValue] = useState('')

  return <FormGroup className="my-3">
    <Form.Label>Task</Form.Label>
    <div className='d-flex'>
      <Form.Control type="text" value={taskValue} onChange={(e) => setTaskValue(e.target.value)} disabled={disabled} placeholder="add your tasks" />

      <Button onClick={(e) => handleOne(taskValue, e)} value={taskValue}> Save Task </Button>
    </div>
  </FormGroup>
}
export default Home
