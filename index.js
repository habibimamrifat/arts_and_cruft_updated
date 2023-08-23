import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// habibrifatx21
// 1gRjgHIYxnuxxer7

const uri =
  "mongodb+srv://habibrifatx21:1gRjgHIYxnuxxer7@artsandcraft.cclono5.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const artAndCraftDatabase = client.db("artAndCraftDatabase");

    //  ......... user collection database StudentSignUp............

    const userCollection = artAndCraftDatabase.collection("usersCollection");

    app.get("/signUp", (req, res) => {
      res.send(" i amk responcible for loading data of sign up");
    });
    app.post("/signUp", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get(`/profileHeader/:userUid`, async (req, res) => {
      const uid = req.params.userUid;
      const query = { userFbUid: uid };
      const result = await userCollection.findOne(query);
      res.send(result);
    });

    // ...................post collection database set up create post create sell and create post and sell.................
    const postCollection = artAndCraftDatabase.collection("postsCollection");
    const shopCollection = artAndCraftDatabase.collection("shopsCollection");

    app.post("/createAPost", async (req, res) => {
      const createPost = req.body;
      console.log("create a post");
      console.log(createPost);

      const result = await postCollection.insertOne(createPost);
      res.send(result);
    });
    app.put("/post/autoUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const updateId = req.body;

      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatePost = {
        $set: {
          id: updateId.id,
        },
      };
      const result = await postCollection.updateOne(filter, updatePost, option);
      res.send(result);
    });

    app.post("/createAPostAndSell", async (req, res) => {
      const createPost = req.body;
      console.log("create a post and sell");
      console.log(createPost);

      // const result = await userCollection.insertOne(user);
      res.send(createPost);
    });

    app.post("/createASell", async (req, res) => {
      const createPost = req.body;
      console.log("create a sell");
      console.log(createPost);

      const result = await shopCollection.insertOne(createPost);
      res.send(result);
    });
    app.put("/sell/autoUpdate/:id", async (req, res) => {
      const id = req.params.id;
      const updateId = req.body;

      const filter = { _id: new ObjectId(id) };
      const option = { upsert: true };
      const updatePost = {
        $set: {
          id: updateId.id,
        },
      };
      const result = await shopCollection.updateOne(filter, updatePost, option);
      res.send(result);
    });


    // .........................profile middle body set up..............................................................

    app.get("/profile/middleBody/:userFbUid", async (req, res) => {
      const userFbUid = req.params.userFbUid;
      if (userFbUid !== undefined) {
        const query = { userFbUid: userFbUid };
        const result = await postCollection.find(query).toArray();
        res.send(result);
      }
    });

    app.get("/post/checkBeforePutOnSell/:itemId", async (req, res) => {
      const itemId = req.params.itemId;
      console.log(itemId);
      const query = { id : itemId };
      let result = await shopCollection.findOne(query);
      if (result === null)
      {
        const permission = {permission:'False'}
        result = permission;
        res.send(result);
       
      }
      else{
        console.log(result);
      res.send(result);
      }
    });

    // this code is to find the post that will be put on sell it search into post collection where posts are stored 

    app.get("/post/putOnSell/:itemId", async (req, res) => {
      const itemId = req.params.itemId;
      console.log(itemId);
      const query = { id : itemId };
      const result = await postCollection.findOne(query);
      res.send(result);
    });

    app.post("/post/putOnSell/storeInDatabase", async (req, res) => {
      
      const createPost = req.body;
      console.log("create a sell");
      console.log(createPost);

      const result = await shopCollection.insertOne(createPost);
      res.send(result);
    });

    app.delete('/post/deleteFromPost/:itemId', async(req,res)=>{
      const itemId = req.params.itemId;
      console.log(itemId);
      const query = { id : itemId };
      let result = await postCollection.deleteOne(query);
      res.send(result)

    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("i am running good");
});
app.listen(port, () => {
  console.log(`simple crud is running on port ${port}`);
});
