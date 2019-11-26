const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//Middleware---------------------------------------------------------------
app.use(bodyParser.json());  //creates a res.body object formatted in json
app.use(cors());    //library that relaxes api security and allows cross origin resource sharing
//-------------------------------------------------------------------------
//Routes-------------------------------------------------------------------
const items = require('./routes/api/items')  //sets items to be equal to that file, which is full of routes pertaining to items
app.use('/api/items', items);  //when a request hits that route, use that variable, which is set to that file which handles requests on that route.
//-------------------------------------------------------------------------

//Handle production
if (process.env.NODE_ENV === 'production') {  //once deployed to Heroku, this will be true
    //establish the static folder
    app.use(express.static(__dirname + '/public'))  //look to the public folder for all your files.  We are not deploying client folder system.
    //handle the fact that this is a single page application - no established routes beyond the front page.  
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));  //all routes point to index.html.
}

//Establish listening port ---------------------------------------------------
const port = process.env.PORT || 5000  //process.env.PORT is there as we will be deploying to heroku.  
app.listen(port, () => console.log(`Server running on port ${port}.`));
