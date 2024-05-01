import {RagGenerator} from "../rag_chain/rag_chain.js"

export const getInferenceService=async(path,question)=>{
    try{
        const rag=new RagGenerator(path)
        const response=await rag.generate(question)
        return response
    }catch(err){
        console.log(err)
        return err
    }
}