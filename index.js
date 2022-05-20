const express = require('express');
const cors = require('cors');
const app = express()
port = 3000;

const allowedOrigins = ['http://localhost:3000','http://localhost:3001']

app.use(cors({
    origin: function(origin, callback){
      // allow requests with no origin 
      // (like mobile apps or curl requests)
      if(!origin) return callback(null, true);
      if(allowedOrigins.indexOf(origin) === -1){
        var msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    }
  }));

app.use(require('express').json());
app.use('/api', require('./routes/index'));

app.listen(port, () => {
    console.log(`Application running on port ${port}`)
});