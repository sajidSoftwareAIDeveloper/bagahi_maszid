
import { ConnectToAPI } from "../../component/ConnectToAPI";
import LoadingData from "../../component/LoadingData";
import AmamList from "../../component/amamList";
import NamazList from "../../component/namazList";
import Login from "../../component/parwezLogin";
import ReceivedList_b from "../../component/receivedList_b";
import ReceivedList_o from "../../component/receivedList_o";
import { Text_speech } from "../../component/text-speech";
import UsesList from "../../component/usesList";
import ButtonWV from "./Button";
import {useEffect, useState} from 'react'

export default function Homepage(){
     
    const[received,setReceived]=useState();
    const[received_o,setReceived_o]=useState();
    const[uses,setUses]=useState();
    const[loading,setLoading]=useState();
    const[show,setShow]=useState({  
        received_b:'',
        received_o:'',
        uses:"",
        amam:"",
        parwez:"",
        namaz:false  
    });
   
    function effectHandle(identity){

        setShow(()=>({
           // ...prev,
            received_b:false,
            received_o:false,
            uses:false,
            amam:false,
            parwez:false,
            namaz:false,
            [identity]:true
            
        }));
    }
    useEffect(()=>{  
       Text_speech("please wait data is loading"); 
        CallingFunction();
    },[])   

    async function CallingFunction(){
        const rbl=await ConnectToAPI('findData','','received_bagahi_in','PUT');
        const rol=await ConnectToAPI('findData','','received_other','PUT');
        const ul=await ConnectToAPI('findData','','uses_amount','PUT');
        if(rbl && rol && ul){
            setLoading(true);
            setReceived(rbl.message.reduce((sum,items)=>sum+Number(items.amount),0));
            setReceived_o(rol.message.reduce((sum,items)=>sum+Number(items.amount),0));
            setUses(ul.message.reduce((sum,items)=>sum+Number(items.amount),0));
            Text_speech("the received total amount is "+(received+received_o)+"  and total uses amount is "+uses);
        }
  
    }

    return <div className="bg-green-200 m-1 h-full">{loading?
    <div  className="p-5 font-bold text-red-400" >
            <div className="border-red-100 border-width-2px">
            <h2 className="text-3xl text-green-500"> receive amount ::{(received+received_o)?received+received_o:0}</h2>
            <h2 className="text-3xl text-red-400" > uses amount  :: {uses?uses:0}</h2> <br/>
            </div>
            <div>
                <ButtonWV name="show received b_amount" clickEffectHandle={()=>effectHandle("received_b")}/>
                <ButtonWV name="show received o_amount" clickEffectHandle={()=>effectHandle("received_o")}/>
                <ButtonWV name="show uses amount "clickEffectHandle={()=>effectHandle("uses")} />
                <ButtonWV name="amam "clickEffectHandle={()=>effectHandle("amam")}/>
                <ButtonWV name="namaz timing "clickEffectHandle={()=>effectHandle("namaz")}/>
                <ButtonWV name="Parwez" clickEffectHandle={()=>effectHandle("parwez")}/>
            </div>

            <div>
                {
                    show.received_b && <ReceivedList_b  /> ||
                    show.received_o && <ReceivedList_o /> ||
                    show.uses && <UsesList/>   ||
                    show.amam && <AmamList/>  ||
                    show.parwez && <Login/> ||
                    show.namaz && <NamazList/> 
                }  
            </div>
    </div>
    :<LoadingData/>}
    </div>
}