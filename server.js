const express = require("express")
const bodyParser = require("body-parser")
const cors = require(("cors"))
const router = require("./router")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/Sabzlearn/Users" , router)

app.use("/Sabzlearn/Manager" , router)


app.listen(3000 , (err)=>{
    if (err){
        console.log(err)
    }
})

