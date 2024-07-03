import { useEffect } from "react"
import { Text_speech } from "./text-speech";

export default function LoadingData(){
    useEffect(()=>{
        Text_speech("please wait ");
    })

    return<div>
        <h1 className="text-2xl text-red-500">Loading ...............</h1>
    </div>
}