import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ConnectToAPI } from "./ConnectToAPI";
import LoadingData from "./LoadingData"
import { useDispatch, useSelector } from "react-redux";
import { listValue } from "../store/TemporaryList";
import { Button, Input } from "./showListData";
import { Text_speech } from "./text-speech";


export default function Login() {
  const [valid, setValid] = useState();
  const [loading, setLoading] = useState();
  const router = useRouter();
 
   const dispatch=useDispatch();
   const dispatchValue=useSelector(state=>state.loginUserName);

   useEffect(()=>{
    Text_speech("welcome to perwez alam please login using user name and password ");
    setLoading(false);
    setValid(false);
      if(dispatchValue.length!==0){
        router.replace("/components/handler");
      }
   },[])

  async function loginHandle(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());
      setLoading(true);
      const result = await ConnectToAPI(
        "login",
        { userName:formData.userName, userPassword:formData.userPassword },
        "login",
        "POST"
      );
      if (result.message) {
        // send to perwez handle page
        dispatch(listValue.loginUN(formData.userName));
        dispatch(listValue.loginUP(formData.userPassword));
        router.replace("/components/handler");
        setLoading(false);
        setValid(false);
      } else {
        Text_speech("please enter valid user name and password ");
        setLoading(false);
        setValid(true);
      }
  }
  return (
    <div className="mt-5">
      <h1 className="text-orange-500 text-2xl"> welcome to controller parwaz shahab </h1>
    {
      !loading?
      <form onSubmit={loginHandle}>
        <Input type="text" name="userName" label="username" />
        <Input type="password" name="userPassword" label="password" />

        {valid && <h1 className="text-red-500 text-2xl">please enter valid username and password </h1>}
        <Button name="login"/>
      </form>
      :<h1 className="text-green-600 text-xl" >authenticate .............</h1>
    }
    </div>
  );
}
