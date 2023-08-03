const {Router}= require ("express")
const axios = require("axios")
const {getTypePoke} = require("../controllers")
const router = Router()



router.get("/", async(req,res) =>{
    const gType = await getTypePoke(res)
    res.status(200).json(gType)
})

module.exports= router