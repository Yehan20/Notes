
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
        ...state,disabled:true,finish:!state.finish,task:['task'],singleTaskClone:[]
      }
    }

    if(action.type==='ADD-NOTES'){ 
      // if(state.no)
      // if(state.noteList.length===1){
      //   state.noteList.length 
      // }
      return {
        ...state,noteList:action.payload.reverse(),noteList2:action.payload,disabled:false
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
      const index=action.payload.index;
      const count=action.payload.count; 
   
      const updatedArray = state.noteList.map((item,i)=>{
        if(index===i){
          return {
            ...item,completed:true,completedTasks:count
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

    if(action.type==='RESET'){
      console.log('EXECUMETS');
      return{
          ...state,singleTaskClone:[],task:['task']
      }
    }

    if(action.type==='DELETE-NOTE'){
       const id = action.payload;
       const newNotes = state.noteList.filter((note,index)=>index!==id)
       
        return {
          ...state,noteList:newNotes
        }
    }

    if(action.type==='FIND-TOTAL'){
        let totalTasks = state.noteList.reduce((amount,notelist)=>{
               let nextAmount = Number(notelist.completedTasks===-1?0:notelist.completedTasks)
               amount = Number(amount) + nextAmount
               return amount
        },0)

        

        return {
          ...state,totalTaskAmount:totalTasks
        }
    }

    return state;
  }
  
  export const defaultState = {
    finish: false,
    disabled: false,
    singleTask: [],
    task: ['task'],
    noteList: [],
    noteList2: [],
    singleTaskClone: [],
    done: false,
    completedTasks:-1,
    totalTasksCompleted:0,
    totalTaskAmount:0

  }