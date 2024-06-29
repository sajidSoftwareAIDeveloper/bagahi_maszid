export default async function handle(req,res){
    
    if(req.method==='GET'){
        const {data,collect}=req.body;
        try {
                const result= await PostData(data,collect);
                if(result.acknowledged){
                    res.status(200).json({message:1});
                }
                 else res.status(201).json({message:55});
            
        } catch (error) {
            console.log('error'+error);
            res.status(201).json({message:error});
        }
    }
}