import { useEffect, useState } from "react";
import { TableHeading } from "./showListData";
import { ConnectToAPI } from "./ConnectToAPI";
import Searching from "./SearchingData";
import NotAvailable from "./notAvailable";
import { useSelector } from "react-redux";
import LoadingData from "./LoadingData";

export default function ReceivedList_b(){
    const[showListIdBased,setShowListIdBased]=useState();
    const[count,setCount]=useState(0);
    const[search,setSearch]=useState(true);
    const[data_b,set_bData]=useState([]);
    const[data_b_in,set_b_inData]=useState([]);
    const[data,setData]=useState([]);
    const dispatchValue=useSelector(state=>state.loginUserName);

    useEffect(()=>{
       
        calling();
    },[])

    async function calling(){

        if(!count){
            setCount(1);
            const result=await ConnectToAPI("findData",'','received_bagahi','PUT');
            const result1=await ConnectToAPI("findData",'','received_bagahi_in','PUT');
            if(result){
                setSearch(false);
                set_bData(result.message);
            }else{
                console.log('sorry');
            }
    
            if(result1){
               let l=result1.message.length;
                for(let i=0;i<result.message.length;i++){
                    let res=0;
                    let data=[];
                    for(let j=0;j<l;j++){                 
                        if(result.message[i]._id===result1.message[j].userId){    
                             data.push({amount:result1.message[j].amount,date:result1.message[j].date});
                             res+=Number(result1.message[j].amount);
                            
                        }
                        if(j+1===l && data.length!==0){
                            set_b_inData(prev=>{
                                return prev.concat({data:data,result:res,userId:result.message[i]._id,remaining:(Number(result.message[i].amount)<=res?0:(Number(result.message[i].amount)-res))});
                            })
                        }
                    }
    
                }  
    
            }else{
                console.log('sorry 1');
            }
         
        }   

    }
    
    function totalReceived(value){
        let result;
        for(let i=0;i<data_b_in.length;i++){
            if(data_b_in[i].userId===value){
                result=data_b_in[i].result;
                break;
             } 
        }
        return result;
    }

    function showInsideReceivedData(id){ 
        
        // in data set every time new list 
         if(data.length!==0){
            setData(prev=>{return prev.filter(()=>0!==0);});
         }
        // effect showing data here hide and show 
        if(id===showListIdBased){
          //  setValid(false);
          setShowListIdBased(0);
        }else{
            setShowListIdBased(id);
        }
        for(let i=0;i<data_b_in.length;i++){
            if(data_b_in[i].userId===id){
                setData(data_b_in[i].data);
                break;
            }
        }
        //valid?setValid(false):setValid(true);
    }

    return(
        <div className="text-xl text-blue-400">
        {!search?  
        <div>
           <h1 className="text-red-400 text-2xl"> total bagahi commit amount:::{data_b.reduce((sum,e)=>sum+Number(e.amount),0)}</h1> 
           <h1 className="text-green-500 text-2xl"> total received bagahi amount::: {data_b_in.reduce((sum,e)=>sum+Number(e.result),0)}</h1> 
           <h1 className="text-red-400 text-2xl"> total remaining bagahi amount::: {data_b_in.reduce((sum,e)=>sum+Number(e.remaining),0)}</h1> <br/>

          { 
          data_b.length!==0?
           <table className="border-separate border-spacing-x-4">
               <TableHeading data={["name","received_amount","commit_amount","remaining","date","view"]}/>
                {
                    data_b.map((items,index)=>(
                    <tbody>
                        <tr> 
                          <td>{index+1}</td>
                          <td>{items.name}</td>
                          <td>{totalReceived(items._id)}</td>
                          <td>{items.amount}</td>
                          <td className="text-green-400">
                            {   
                              data_b_in.length!==0?
                              data_b_in.map(items11=>(

                                items11.userId===items._id && (Number(items11.remaining)===0) && "complete"
                                ||
                                items11.userId===items._id && Number(items11.remaining)
                             ))
                              :Number(items.amount)
                             
                            }
                          </td>
                          <td>{items.date}</td>
                          <td> <button className="p-1 mr-5 mb-2 bg-red-200 text-lg rounded-xl border-red-500 active:bg-blue-400 hover:bg-blue-900" onClick={()=>showInsideReceivedData(items._id)}>
                            { items._id===showListIdBased ?"Hide":"show"}</button></td>
                        </tr> 
                        { data.length!==0 && items._id===showListIdBased?
                              
                            data.map((items,index)=>(
                                <tr>
                                    <td></td>
                                     <td>{index+1}</td>
                                     <td>{items.amount} </td> 
                                     <td>{items.date}</td>
                                </tr>
                            ))          
                        : <tr> <td></td> <td colSpan="4" >{items._id===showListIdBased &&<NotAvailable/>}</td></tr>
                        }
                     </tbody>
                        
                    ))
                }
    
            </table>
          :search?<Searching/>:<NotAvailable/> 
         }
        </div>
        :<LoadingData/>
     }   
    </div>    
    );
}
