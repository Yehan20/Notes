export const reducer=(state,action)=>{
    console.log(action);
    console.log('initial',state)
    // if()
    if(action.type==='FEILDS-EMPTY'){
        console.log('Empty');
        return {
          ...state,errorMsg:'Fill all Feilds',color:'warning'
        }
      }

  
    if(action.type==='FALSE-LOGIN'){
      console.log('flase login')
      return {
        ...state,errorMsg:'Login Incorrect',color:'danger',empty:false,email:'',password:''
      }
    }

   throw new Error('Action not macthed')
}

export const defaultState={
    email:'',
    password:'',
    errorMsg:'',
    color:'',
    empty:true
    
}