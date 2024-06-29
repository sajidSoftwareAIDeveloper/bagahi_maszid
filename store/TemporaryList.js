import { createSlice, configureStore } from '@reduxjs/toolkit';
const initialState={
   loginUserName:"",loginUserPassword:""
}
 const ListStore=createSlice({
    name:'login',
    initialState,
    reducers:{
        loginUN(state,action){
            state.loginUserName=action.payload;
        },
        loginUP(state,action){
            state.loginUserPassword=action.payload;
        },
    }
});
// const ListValue=ListReducer.action;
export const Store=configureStore({
    reducer: ListStore.reducer
  });
export const listValue=ListStore.actions;
