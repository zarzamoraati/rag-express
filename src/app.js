import express from "express"
import { router } from "./rag/rag.route.js"
const PORT=3000

const app=express()
app.use(express.json())
app.use("/",router)

app.listen(PORT,()=>console.log("Server Running on: ",PORT))

export default app;

