import express from "express";
import routes from "./src/routes/planetaRoutes";
import mongoose from "mongoose";
import bodyParse from 'body-parser';
import cors from 'cors';

const app = express();
const PORT = 3000;

//mongoDB
mongoose.Promise = global.Promise;

/** cloud connection **/

const dbUrl = "mongodb://rodrigobmuniz:RV3Qb3LNa2xZAAur@ds263988.mlab.com:63988/mongodb-desafio-bit"
mongoose.connect(dbUrl, (err) => {
    console.log('Mongoose default connection open to ' + dbUrl);
});



// If the connection throws an error
mongoose.connection.on('error',function (err) {  
    console.log('Mongoose default connection error: ' + err.message);
  }); 
  
  // When the connection is disconnected
  mongoose.connection.on('disconnected', function () {  
    console.log('Mongoose default connection disconnected'); 
  });
  
  // If the Node process ends, close the Mongoose connection 
  process.on('SIGINT', function() {  
    mongoose.connection.close(function () { 
      console.log('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  }); 


  //bodyParse
app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

app.use(cors({origin: 'http://localhost:4200'}));


//rotas
routes(app);

app.get('/', (req, res) => {
    res.send(`Node and express server running ${PORT}`)
});

app.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
});