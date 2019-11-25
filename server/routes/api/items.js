const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Items
router.get('/', async (req, res) => {  // Here '/' is equal to /api/items, as defined in the index.js file.
    const items = await loadItemsCollection();  //get all the entries in the items section of the root_cellar db
    res.send(await items.find({}).toArray());// narrow that down to - all items - and convert them to an array.
});

//Add Items
router.post('/', async (req, res) => {
    const items = await loadItemsCollection();  //get all the entries in the items section of the root_cellar db
    await items.insertOne({ //using a mongodb method, we will insert one entry to the items collection and it will have the following attributes
        item: req.body.item, //it is available on the req object due to body parser.
        createdAt: new Date(), //standard js function
    });
    res.status(201).send();  //HTTP response code 201 - one or more new resources have been successfully added on the server.
})

//Delete Items

router.delete('/:id', async (req, res) => {
    const items = await loadItemsCollection();  //get all the entries in the items section of the root_cellar db.
    await items.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});   //another method from the mongodb object, gets the id from the delete call adress.
        res.status(200).send();  // HTTP response code 200 - OK
});




async function loadItemsCollection() {
    const client = await mongodb.MongoClient.connect //sets client to be equal to the connection
        ('mongodb+srv://bill123:bill123@cluster0-70bmu.mongodb.net/test?retryWrites=true&w=majority',  //connection string from atlas
            {
                useNewUrlParser: true, //passing in this object deals with a depreciation warning.  It is nor necessary, but cleans up the console.
                useUnifiedTopology: true // passing in this object deals with a depreciation warning, relating to mongodb.
            });

    return client.db('root_cellar').collection('items');  //returns all the entries in the items section of the root_cellar db.
}

module.exports = router; //returns the router object, which can see the loadItemsCollection function at all items.