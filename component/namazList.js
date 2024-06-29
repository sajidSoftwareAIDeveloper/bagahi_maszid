import { useState,useEffect } from "react";
import { TableHeading } from "./showListData";
import { ConnectToAPI } from "./ConnectToAPI";
import Searching from "./SearchingData";
import NotAvailable from "./notAvailable";
export default function NamazList(){

    const[data,setData]=useState([]);
    const[search,setSearch]=useState(false);

    useEffect(()=>{
        calling();
    },[]);

    async function calling(){
        setSearch(true);
        const result=await ConnectToAPI("findData",'','namaz','PUT');
        if(result){
            setData(result.message);
            setSearch(false)
        }else{console.log('sorry');}
    }

    return(
        <div className="text-blue-400 text-xl">
             <h1> welcome to namaz List</h1> 
            {
            data.length!==0?
           <table className="border-separate border-spacing-4">
               <TableHeading data={["namaz","azan","jamat"]}/>
                {
                    data.map((items,index)=>
                        <tr>  
                          <td>{index+1}</td>
                          <td>{items.name}</td>
                          <td>{items.time}</td>   
                          <td>{items.time1}</td>
                        </tr>
                    )
                }
            </table>
            :
             search?<Searching/> : <NotAvailable/>
        }   
          
        </div>
    );
}