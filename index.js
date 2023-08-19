import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import express from 'express';
import cors from 'cors';
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// habibrifatx21
// 1gRjgHIYxnuxxer7





const uri = "mongodb+srv://habibrifatx21:1gRjgHIYxnuxxer7@artsandcraft.cclono5.mongodb.net/?retryWrites=true&w=majority";

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

    const artAndCraftDatabase = client.db('artAndCraftDatabase');

//  ......... user collection database StudentSignUp............ 

    const userCollection = artAndCraftDatabase.collection('usersCollection')

    app.get('/signUp', (req, res)=>{
      res.send(" i amk responcible for loading data of sign up");
    })
    app.post('/signUp',async(req,res)=>{
      const user =req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    })

    app.get(`/profileHeader/:userUid`, async (req, res)=>{
      const uid = req.params.userUid;
      const query ={userFbUid : uid }
      const result = await userCollection.findOne(query)
      res.send(result);
    })

// ...................post collection database set up.................

    




    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send("i am running good")
})
app.listen(port,()=>{
console.log(`simple crud is running on port ${port}`)
})