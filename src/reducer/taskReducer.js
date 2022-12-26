export const reducer=(state,action)=>{
    if(action.type==='HANDLE-CHECK'){
      console.log(state);
      const newTasks=[...state.singleTask,action.payload]
      return {
        ...state,singleTask:newTasks
      }
    }

    if(action.type==='HANDLE-SAVE'){   
      return {
        ...state,disabled:true,finish:!state.finish
      }
    }

    if(action.type==='ADD-NOTES'){ 
      console.log('action',action.payload); 
      // const newNotes=[...state.noteList,action.payload]
      return {
        ...state,noteList:action.payload
      }
    }

    if(action.type==='ADD-TASK'){
      const newTask=[...state.task,action.payload]
      
      return {
        ...state,task:newTask
      }
    }

    if(action.type==='ADD-ONE'){
      console.log(action.payload);
      const newTasks=[...state.singleTaskClone,action.payload]

      return {
        ...state,singleTaskClone:newTasks
      }
    }
    return state;
  }
