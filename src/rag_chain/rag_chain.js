import { MemoryVectorStore } from "langchain/vectorstores/memory"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai"
import { ChatGroq } from "@langchain/groq"
import { StringOutputParser } from "langchain/schema/output_parser"
import * as dotenv from "dotenv"
import { PromptTemplate } from "langchain/prompts"
import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
import { FaissStore } from "langchain/vectorstores/faiss" 
import { Chroma } from "langchain/vectorstores/chroma"
dotenv.config()


export class RagGenerator{
    constructor(path){
        this.parser=new StringOutputParser()
        this.splitter=new RecursiveCharacterTextSplitter({chunkOverlap:100,chunkSize:1000})
        this.loader=new PDFLoader(path)
        this.embeddings=new GoogleGenerativeAIEmbeddings({modelName: "embedding-001"})
        this.llm=new ChatGroq({model:"Llama3-8b-8192",temperature:0.1})
        this.prompt=new PromptTemplate({
            template:`You are a helpful assitant, your work is to provide accurate 
                 responses related with the user questio using te piece of context bellow\n 
                 These are the questiona and the context:  
                 
                 -Question:{input}
                 -Context:{context}
                 
                 IMPORTANT: just response based on the context, 
                 if the context doesn't provide helpful or related information with the question  just response telling that you don't have the necessary information, nothing else `,
            inputVariables:["input","context"]
        })
    }

    async generate(question){
        try{
            if(!question) throw new Error("Question cannot be empty")
            const docs=await this.loader.load()
            console.log("DOCS")
            //console.log(docs)
            const chunks= await this.splitter.splitDocuments(docs)
            console.log("chunks")
            console.log(process.env.GOOGLE_API_KEY)
            console.log(process.env.GROQ_API_KEY)
            //console.log(chunks)
            const vectorDb=await MemoryVectorStore.fromDocuments(chunks,this.embeddings)
            console.log("VECTOR DB")
            const retriever=vectorDb.asRetriever({k:3})
            console.log("RETRIEVER ")
            console.log(question)
         
            const relevant_docs=await retriever._getRelevantDocuments(question)
            console.log("RELEVANT DOCS")
            console.log(relevant_docs)

            const rag_chain=await createStuffDocumentsChain({
                llm:this.llm,
                prompt:this.prompt,
                outputParser:this.parser
            })
            console.log("RAG CHAIN")
            const response=await rag_chain.invoke({input:question,context:relevant_docs})
            return response
            
        }catch(err){
            console.log(err)
            return err
        }
    }
}