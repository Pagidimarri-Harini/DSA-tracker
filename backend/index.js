const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const userController = require('./controllers/user-controller');
const axios = require('axios');



// const FormDataModel = require ('./models/FormData');


const app = express();
app.use(express.json());
app.use(cors());

app.get('/chat', async (req, res) => {
    const { msg } = req.query;
  
    try {
      const response = await axios.get(`https://api.monkedev.com/fun/chat?msg=${msg}`);
      res.json(response.data);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
// app.use(bodyParser.json());
const route = require('./userRoutes.js'); 
mongoose.connect('mongodb+srv://user:harini@mern-stack.d5q8bma.mongodb.net/?retryWrites=true&w=majority');

app.use('/',route);

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");

});

