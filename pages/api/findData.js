import { findValueUsingCollect, findValueUsingId } from "../../dataHandle/crud";

export default async function handle(req,res){

    if(req.method==='PUT'){
        const collect=req.body.collect;
        try {  
                const result= await findValueUsingCollect(collect);
                //console.log(result);
                if(result){
                    res.status(200).json({message:result});
                }
                 else res.status(201).json({message:0});
               
        } catch (error) {
            res.status(201).json({message:0});
        }
    }

    if(req.method==='POST'){
        const{data,collect}=req.body;
        try {  
                const result= await findValueUsingId({userId:data},collect);
                if(result){
                    res.status(200).json({message:result});
                }
                 else res.status(201).json({message:0});
               
        } catch (error) {
            res.status(201).json({message:error});
        }
    }


}