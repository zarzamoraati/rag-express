import express from "express"
import {getInference} from "./rag.controller.js"
import { upload } from "../utils/uploadPDF.js"
const router=express.Router()


router.route("/api/upload").post(upload.any(),getInference)

export {router}