import { useEffect, useState } from "react";
import { ConnectToAPI } from "./ConnectToAPI";
import { TableHeading } from "./showListData";
import NotAvailable from "./notAvailable";
import Searching from "./SearchingData";
import LoadingData from "./LoadingData";
import { useSelector } from "react-redux";

export default function ReceivedList_o(){
    const[data,setData]=useState([]);
    const[search,setSearch]=useState(false);
    const dispatchValue=useSelector(state=>state.loginUserName);

    useEffect(()=>{
        calling();
    },[]);

    async function calling(){
        const result=await ConnectToAPI("findData",'','received_other','PUT');
        if(result){
            setSearch(true);
            setData(result.message);
        }else{ setSearch(true);}
    }


    return(
        <div>
        {search?
       <div className="text-blue-400 text-xl">
        {
            data.length!==0?
           <table className="border-separate border-spacing-4">
               <TableHeading data={["name","amount","date"]}/>
                {
                    data.map((items,index)=>
                        <tr>  
                          <td>{index+1}</td>
                          <td>{dispatchValue.length!==0?items.name:'UNKOWN'}</td>
                          <td>{items.amount}</td>   
                          <td>{items.date}</td>
                        </tr>
                    )
                }
            </table>
            :
             search?<Searching/> : <NotAvailable/>
        }  
        </div>
        :<LoadingData/> 
       }
        </div>
    );
}   