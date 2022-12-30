import React, { useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { useGlobalContext } from '../contexts/AuthContext'
import { Button, Container, Form, FormGroup, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { auth as Auth, db } from '../firebase'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { reducer , defaultState } from '../reducer/taskReducer'
import { AiFillFileAdd, AiFillCheckSquare } from 'react-icons/ai'
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
      if(userNote===undefined){
        userNote=[]
      }
      setLoading(false)
      dispatch({ type: 'ADD-NOTES', payload: userNote })
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
        notes: [...state.noteList, { note: state.singleTaskClone, date: createdDay, completed: false }].reverse()
      })
    } catch (err) {
      console.log(err);
    }
  }

  const finalizeNote = async (e) => {

    const docRef = doc(db, 'notes', user.email);

    e.target.disabled = true

    try {

      await updateDoc(docRef, {
        notes: [...state.noteList]
      })

      dispatch({ type: 'DONE' })


    } catch (err) {
      console.log(err);
    }
  }




  return (
    <context.Provider value={{ handleOne }}>
      <Container fluid>
        <Container className='d-flex align-items-start home-container'>
          <Button variant='danger' className='logout-btn' onClick={handleLogout}>
            Logout
          </Button>

          <Button className='p-0 add-btn hvr-buzz-out text-dark add-note' title='Add Note' onClick={() => setShow(!show)}>
            <AiFillFileAdd className='file' size={300} />
            New Note
          </Button>
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
            {
              !loading &&  state.noteList && state.noteList.map((item, index) => {
                const not = item.note;
                const cmplted = state.noteList2[index].completed
                return <div className={`note ${cmplted ? 'completed-note' : 'incomplete-note'}`} key={index}>

                  <h3>{item.date}</h3>
                  <h4>Your Tasks</h4>
                  <ol>
                    {
                     not && not.map((item, index) => {
                        return <li key={index}>{item.task}</li>
                        
                      })
                    }
                  </ol>

                  {!cmplted && <Form.Control type='number' min='1'  defaultValue={0} onFocus={() => dispatch({ type: 'FINALIZE', payload: index })} onChange={() => dispatch({ type: 'FINALIZE', payload: index })} placeholder='Completed task amounts' max={item.note.length} />}

                  <Button className={`mt-2 ${cmplted?'px-0':'px-2'}`} disabled={cmplted} onClick={(e) => finalizeNote(e)}>{cmplted ? <><AiFillCheckSquare size={30}  />Task Completed</>: 'Mark Tasks'}</Button>
                </div>
              })
            }

          </div>


        </Container>
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
