import { useEffect, useState } from "react";
import { TableHeading } from "./showListData";
import Searching from "./SearchingData";
import NotAvailable from "./notAvailable";
import { ConnectToAPI } from "./ConnectToAPI";

export default function UsesList(){

    const[data,setData]=useState([]);
    const[search,setSearch]=useState(false);

    useEffect(()=>{
        calling();
    },[]);

    async function calling(){
        setSearch(true);
        const result=await ConnectToAPI("findData",'','uses_amount','PUT');
        if(result){
            setData(result.message);
        }else{console.log('sorry');}
    }


    return(
        <div> <br/>
           {
            data.length!==0?
            <div>
                   <h1 className="text-red-400 text-2xl "> uses amount :{data.reduce((sum,items)=>sum+Number(items.amount),0)}</h1> 
           <table className="mt-3 text-lg text-xl text-blue-400 border-separate border-spacing-x-5">
               <TableHeading data={["name","amount","date"]}/>
                {
                    data.map((items,index)=>
                        <tr>  
                          <td>{index+1}</td>
                          <td>{items.name}</td>
                          <td>{items.amount}</td>   
                          <td>{items.date}</td>
                        </tr>
                    )
                }
            </table>
            </div>
            :
             search?<Searching/> : <NotAvailable/>
        }   

        </div>
    );
}