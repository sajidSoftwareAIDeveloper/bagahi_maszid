import { ObjectId } from "mongodb";
import { UpdateData } from "../../dataHandle/crud";

export default async function handle(req,res){
    
    if(req.method==='POST'){
        const {data,collect}=req.body;
        try {   
                const result= await UpdateData({"_id":new ObjectId(data.id)},{time:data.time,time1:data.time1},collect);
                if(result.acknowledged && result.matchedCount){
                    res.status(200).json({message:1});
                }   
                 else res.status(201).json({message:0});
            
        } catch (error) {
            res.status(201).json({message:0});
        }
    }
}