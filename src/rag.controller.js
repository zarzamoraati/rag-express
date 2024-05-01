import { getInferenceService } from "./rag.service.js"
export const getInference=async(req,res)=>{
    try{
        if(req.files.length==0)return res.status(401).json({msg:"file is required"})
        if(!req.body.question)return res.status(401).json({msg:"Question is required"})
        const response=await getInferenceService(req.files[0].path,req.body.question)
        return res.status(200).json(response)
    }catch(err){
        return res.status(500).json(err)
    }
}