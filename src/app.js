import express from "express"
import { router } from "./rag.route.js"
const PORT=3000

const app=express()
app.use(express.json())
app.use("/",router)

app.listen(PORT,()=>console.log("Server Running on: ",PORT))

export default app;

// const loader= new PDFLoader("./rag.pdf")

// const docs= await loader.load()

// //console.log(docs.length)

// const splitter=new RecursiveCharacterTextSplitter({chunkSize:1000,chunkOverlap:100})
// const chunks=await splitter.splitDocuments(docs)
// //console.log(chunks.length)
// const embeddings=new GoogleGenerativeAIEmbeddings()
// const vector_db=await MemoryVectorStore.fromDocuments(chunks,embeddings)
// const retriever= vector_db.asRetriever({k:4})
// //const relevant_docs=await retriever._getRelevantDocuments("what is corrective rag?")
// //console.log(relevant_docs.length)

// const llm=new ChatGroq({model:"Llama3-8b-8192",temperature:0.1})
// const rag_prompt = new PromptTemplate({
//     template:`You are a helpful assitant, your work is to provide accurate 
//      responses related with the user questio using te piece of context bellow\n 
//      These are the questiona and the context:  
     
//      -Question:{input}
//      -Context:{context}
     
//      IMPORTANT: just response based on the context, 
//      if the context doesn't provide helpful or related information with the question  just response telling that you don't have the necessary information, nothing else `,
//     inputVariables:["input","context"]
// })

// const rag_chain= await createStuffDocumentsChain({
//     llm,
//     prompt:rag_prompt,
//     outputParser:new StringOutputParser()
// })

// let question=`Who is stoya ?`
// const relevant_docs=await retriever._getRelevantDocuments(question)
// const response=await rag_chain.invoke({input:question,context:relevant_docs})




