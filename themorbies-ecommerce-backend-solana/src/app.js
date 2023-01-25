const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const db = require("./db");
const api = require("./api");
const app = express();

db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/images", express.static("public/images"));
app.use(express.static('public/uploads'));
app.use(cors());
app.use(express.json());

app.use("/api", api);

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

//   const request = require('request');

//   app.get('/fork', (req, res) => {
//     request(
//       { url: 'https://www.awwwards.com/sites/wild-1' },
//       (error, response, body) => {
//         if (error || response.statusCode !== 200) {
//           return res.status(500).json({ type: 'error', message: err.message });
//         }
  
//         console.log(response.body);
//       //  res.json({result:true});

//         res.json(response.body);
//       }
//     )
//   });
  
module.exports = app;
