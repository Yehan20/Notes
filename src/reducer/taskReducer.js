
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
        ...state,noteList:action.payload,noteList2:action.payload,disabled:false
      }
    }

    if(action.type==='ADD-TASK'){
      const newTask=[...state.task,action.payload]
      
      return {
        ...state,task:newTask
      }
    }


    if(action.type==='ADD-ONE'){
      const {values,completed}=action.payload;
       const newTasks=[...state.singleTaskClone,{task:values,completed:completed}]


      return {
        ...state,singleTaskClone:newTasks
      }
    }

    if(action.type==='FINALIZE'){
      const index=action.payload; 
      const updatedArray = state.noteList.map((item,i)=>{
        if(index===i){
          return {
            ...item,completed:true
          }  
        }
        return item
      })
      
      return {
        ...state,noteList:[...updatedArray]
      }
    }

    if(action.type==='DONE'){
      return {
        ...state,done:!state.done
      }
    }

    return state;
  }
