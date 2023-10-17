
const express = require("express")
require('dotenv').config()
const cors = require("cors")
const port = process.env.PORT || 3000
const app = express()

// middleware
app.use(express.json())
app.use(cors())



const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.kndeci6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
const servicesCollectin=client.db("servicesDB").collection("services")

        // read
        app.get('/service',async(req,res)=>{
            const cursor=servicesCollectin.find()
            const result=await cursor.toArray()
            res.send(result)
        })

        // create
        app.post('/service', async (req, res) => {
            const newService=req.body 
           const result=await servicesCollectin.insertOne(newService)
           res.send(result)
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(port, () => {
    console.log(`port${port}`)
})