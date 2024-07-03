import { useState,useEffect } from "react";
import { TableHeading } from "./showListData";
import { ConnectToAPI } from "./ConnectToAPI";
import Searching from "./SearchingData";
import NotAvailable from "./notAvailable";
export default function AmamList(){

    const[month_salary,set_month_salary]=useState([]);
    const[month_salary_details,set_month_salary_details]=useState([]);
    const[search,setSearch]=useState(false);
    const[showListIdBased,setShowListIdBased]=useState();
    const[data,setData]=useState([]);

    useEffect(()=>{
        calling();
    },[]);

    async function calling(){
        setSearch(true);
        const result=await ConnectToAPI("findData",'','amam_salary','PUT');
        const result1=await ConnectToAPI("findData",'','amam','PUT');
        if(result){  
            setSearch(false);
            set_month_salary(result.message);
        }
        if(result1){
            set_month_salary_details(result1.message);
        }
    }

    function showInsideReceivedData(id){ 
        
        // in data set every time new list 
         if(data.length!==0){
            setData(prev=>{return prev.filter(()=>0!==0);});
         }
        // effect showing data here hide and show 
        if(id===showListIdBased){
          setShowListIdBased(0);
        }else{
            setShowListIdBased(id);
        }
        for(let i=0;i<month_salary_details.length;i++){
            if(month_salary_details[i].userId===id){
                setData((prev)=>{return prev.concat(month_salary_details[i])} );
            }
        }
    }

    return(
        <div className="text-blue-400 text-xl">
             <h1> welcome to amam List</h1> 
            <h1> monthly salary {5000} </h1>
            {
             month_salary.length!==0?
             <table className="border-separate border-spacing-x-4">
                 <TableHeading data={["salary_month","salary","view"]}/>
                  {
                      month_salary.map((items,index)=>(
                        <tbody>
                          <tr>
                            <td>{index+1}</td>
                            <td>{items.salary_month}</td>
                            <td>{items.salary}</td>
                            <td> <button className="p-1 mr-5 mb-2 bg-red-200 text-lg rounded-xl border-red-500 active:bg-blue-400 hover:bg-blue-900" onClick={()=>showInsideReceivedData(items.salary_month)}>
                              { items.salary_month===showListIdBased ?"Hide":"show"}</button>
                              </td>
                           </tr>

                           {  data.length!==0 && items.salary_month===showListIdBased?
                            data.map((items1,index1)=>(
                                <tr>
                                    <td>{index1+1}</td>
                                    <td>{items1.name}</td>
                                    <td>{items1.amount}</td>
                                    <td>{items1.date}</td>
                                </tr>
                             ))
                             :<tr><td></td> <td>{items.salary_month===showListIdBased&& <NotAvailable/>}</td></tr>
                           }
                           { items.salary_month===showListIdBased &&
                           
                           <tr className="text-red-400" >
                                <td></td>
                                <td>total</td>
                                <td>{data.reduce((sum,e)=>sum+Number(e.amount),0)}</td>
                                <td>{(data.reduce((sum,e)=>sum+Number(e.amount),0)===Number(items.salary))?'complete':'incomplete'}</td>
                            </tr>
                            }
                             
                        </tbody>    
                      ))
                  }
      
              </table>
            :search?<Searching/>:<NotAvailable/> 
           }
          
        </div>
    );
}
