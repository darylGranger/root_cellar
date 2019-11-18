const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');



const app = express();

//Middleware---------------------------------------------------------------
app.use(bodyParser.json());  //creates a res.body object formatted in json
app.use(cors());    //library that relaxes api security and allows cross origin resource sharing
//-------------------------------------------------------------------------
//Routes-------------------------------------------------------------------
const items = require('./routes/api/items')  //sets items to be equal to that file, which is full of routes.
app.use('/api/items', items);  //when a request hits that route, use that variable, which is set to that file which handles requests on that route.
//-------------------------------------------------------------------------

//Establish listening port ---------------------------------------------------
const port = process.env.PORT || 5000  //process.env.PORT is there as we will be deploying to heroku.  
app.listen(port, () => console.log(`Server running on port ${port}.`));
