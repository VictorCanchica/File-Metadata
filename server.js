'use strict';

const express = require('express');
const cors = require('cors');
const multer=require('multer');
const app = express();
const upload = multer({ dest: 'uploads/' })
//const fileData = require('./controllers/data-control');

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

const resp = (req, res) => {
  const { originalname: name,
          mimetype: type, 
          size } = req.file;
          res.json({
          name,
          type,
          size
          });
};

app.post(
  '/api/fileanalyse',
  upload.single('upfile'), resp);

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
