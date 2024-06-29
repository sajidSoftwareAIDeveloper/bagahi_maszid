import { PostData } from "../../dataHandle/crud";

export default async function handle(req,res){
    
    if(req.method==='POST'){
        const {data,collect}=req.body;
        try {
                const result= await PostData(data,collect);
                if(result.acknowledged){
                    res.status(200).json({message:1});
                }
                 else res.status(201).json({message:0});
            
        } catch (error) { 
            res.status(201).json({message:error});
        }
    }
}