import { useEffect } from "react";
import { Text_speech } from "./text-speech";

export default function Searching(){
    useEffect(()=>{
        Text_speech("please wait ");
    })
    return <div>
        <h1 className="text-2xl"> searching ............</h1>
    </div>
} 