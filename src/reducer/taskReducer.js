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

    if(action.type==='ADD-TASK'){
      const newTask=[...state.task,action.payload]
      return {
        ...state,task:newTask
      }
    }
    return state;
  }
