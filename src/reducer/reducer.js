export const reducer=(state,action)=>{
    // console.log(action);
    console.log(state.users)
    if(action.type==='ADD-USER'){
      const newUsers=[...state.users,action.payload]

      return {
        ...state,users:newUsers
      }
    }
    return state
}

export const defaultState={
    email:'',
    password:'',
    users:[]
}