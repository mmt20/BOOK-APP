// setup server 
const express = require('express');
const cors = require('cors')
var bodyParser = require('body-parser')

var storeRoute = require('./router/store.route')
var bookRoute = require('./router/book.route')



const app = express();
const port = 3000;


app.use(cors());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', (req, res) => {
  res.send('Server Strated.......')
})

app.use("/api/v1", storeRoute)
app.use("/api/v1", bookRoute)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
