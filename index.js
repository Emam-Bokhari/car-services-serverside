
const express=require("express")
const cors=require("cors")
const port=process.env.PORT||3000
const app=express()

// middleware
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.send('Server is running')
})

app.listen(port,()=>{
    console.log(`port${port}`)
})