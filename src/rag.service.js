import {RagGenerator} from "./rag_chain/rag_chain.js"

export const getInferenceService=async(path,question)=>{
    try{
        const rag=new RagGenerator(path)
        console.log("SERVICE1")
        const response=await rag.generate(question)
        console.log("SERIVE 2")
        return response
    }catch(err){
        console.log(err)
        return err
    }
}