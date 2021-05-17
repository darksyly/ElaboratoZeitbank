/*const express = require('express');
const session = require('express-session');
//var bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
//const bcrypt = require("bcrypt");
const mysql = require('mysql');
//const saltRounds = 10;
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    port: "3310",
    user: "root",
    password: "password",
    database: "ZeitbankDB"
})

app.use(cors());

app.use(session({
    secret: "supermegasecret",
    saveUninitialized: false,
    resave: false,
    cookie: {
        httpOnly: true,
        maxAge: 3600000
    }
 })
);

app.get("/login", (req, res) =>{
    req.session.isAuth = true;
    console.log(req.session);
    res.send({message: "LOGGED IN"})
})

// app.use('/login', (req, res) => {

//     const username = req.body.username;
//     const password = req.body.password;

//     console.log(username);
//     console.log(password);

//     db.query("SELECT * FROM users WHERE name = ?", username,  (err, result) =>{
//         if(err){
//             res.send({err:err});
//         }
//         if(result.length > 0){
//             bcrypt.compare(password, result[0].password , (err, response) => {
//                 if(response){
//                         //----------------------------------------------------------
//                         req.session.loggedin = true;
//                         req.session.username = username;
//                         console.log("session logged in")
//                         console.log("session : " + req.session)
//                         console.log("usr:"+ req.session.username)
//                         //----------------------------------------------------------
//                         res.send({
//                             //token: {username},
//                             message: "success"
//                         });
//                 }else{
//                     res.send({message: "Username or Password Incorrect"})
//                 }
//             })
//         }else{
//             res.send({message:"Username or Password Incorrect"})
//         }
//     });
// });

// app.post("/register", (req, res) =>{

//     const username = req.body.username;
//     const password = req.body.password;

//     db.query("SELECT * FROM users WHERE name = ?", username,  (err, result) =>{
//       if(err){
//           res.send({err:err});
//       }
//       if(result.length > 0){
//         res.send({message:"User already exists"})
//       }else{
//         bcrypt.hash(password, saltRounds, (err, hash) =>{
//           if(err){
//               console.log(err);
//           }
//           db.query("INSERT INTO users (name, password) VALUES (?, ?)", [username, hash], (err, result) =>{
//               if(err){
//                   res.status(400).json(err);
//               }else{
//                   res.send({message:"User created"});
//               }
//           })
//         }) 
//       }
//     });
// })

app.post("/createJob", (req, res) =>{

    const name = req.body.name;
    const description = req.body.description;
    const creator = req.body.creator;
    const hours = req.body.hours;

    console.log("create Job: " + name);
    
    db.query("INSERT INTO jobs (name, description, creator, hours) VALUES (?, ?, ?, ?)", [name, description, creator, hours], (err, result) =>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(result);
        }
    })
})

app.get("/getAllJobs", (req, res) =>{
    console.log("GET JOBS")
    db.query("SELECT * FROM jobs", (err, result) =>{
        if(err){
            res.send({err:err});
        }
        if(result.length > 0){
            console.log("GET JOBS : " + result)
            res.send(result)
        }else{
            res.send({message:"no job"})
        }
    });
})

app.post("/getCreatedJobs", (req, res) =>{

    const name = req.body.name;

    db.query("SELECT * FROM jobs WHERE creator = ?", name, (err, result) =>{
        if(err){
            res.send({err:err});
        }
        if(result.length > 0){
            console.log("GET JOBS : " + result)
            res.send(result)
        }else{
            res.send({message:"no job"})
        }
    });
})

app.post("/getProcessedJobs", (req, res) =>{

    const name = req.body.name;

    db.query("SELECT * FROM jobs WHERE processor = ?", name, (err, result) =>{
        if(err){
            res.send({err:err});
        }
        if(result.length > 0){
            console.log("GET JOBS : " + result)
            res.send(result)
        }else{
            res.send({message:"no job"})
        }
    });
})

app.post("/takeJob", (req, res) =>{

    const name = req.body.name;
    const id = req.body.id;

    console.log("Take JOB")

    db.query("UPDATE jobs SET processor = '" + name + "' WHERE jobs.id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"processor changed"})
        }
    });
})

app.post("/dropJob", (req, res) =>{

    const id = req.body.id;

    db.query("UPDATE jobs SET processor = '" + "" + "' WHERE jobs.id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"job dropped"})
        }
    });
})


app.post("/finishJob", (req, res) =>{

    const id = req.body.id;
    var creator;
    var processor;

    console.log("Take JOB")

    db.query("SELECT * FROM jobs WHERE id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            creator = result[0].creator
            processor = result[0].processor
        }
    });

    db.query("UPDATE jobs SET finished = '" + 1 + "' WHERE jobs.id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"finished"})
        }
    });


})

app.post("/deleteJob", (req, res) =>{

    const id = req.body.id;

    console.log("delete JOB")

    db.query("DELETE FROM jobs WHERE id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"job deleted"})
        }
    });
})


app.listen(3001, () => console.log('API is running'));
*/

//------------------------------------------------------------------------------------------------------------------------------------

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

var fs = require('fs')
var https = require('https')

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["https://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
        httpOnly: false,
      expires: 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
    host: "localhost",
    port: "3310",
    user: "root",
    password: "password",
    database: "ZeitbankDB"
})

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("register")
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      "INSERT INTO users (username, password) VALUES (?,?)",
      [username, hash],
      (err, result) => {
        console.log(err);
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.user = result;
            console.log(req.session.user);
            res.send(result);
          } else {
            res.send({ message: "Wrong username/password combination!" });
          }
        });
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});


app.post("/createJob", (req, res) =>{

    const name = req.body.name;
    const description = req.body.description;
    const creator = req.body.creator;
    const hours = req.body.hours;

    console.log("create Job: " + name);
    
    db.query("INSERT INTO jobs (name, description, creator, hours) VALUES (?, ?, ?, ?)", [name, description, creator, hours], (err, result) =>{
        if(err){
            res.status(400).json(err);
        }else{
            res.status(200).json(result);
        }
    })
})

app.get("/getAllJobs", (req, res) =>{
    console.log("GET JOBS")
    db.query("SELECT * FROM jobs", (err, result) =>{
        if(err){
            res.send({err:err});
        }
        if(result.length > 0){
            console.log("GET JOBS : " + result)
            res.send(result)
        }else{
            res.send({message:"no job"})
        }
    });
})

app.post("/getCreatedJobs", (req, res) =>{

    const name = req.body.name;

    db.query("SELECT * FROM jobs WHERE creator = ?", name, (err, result) =>{
        if(err){
            res.send({err:err});
        }
        if(result.length > 0){
            console.log("GET JOBS : " + result)
            res.send(result)
        }else{
            res.send({message:"no job"})
        }
    });
})

app.post("/getProcessedJobs", (req, res) =>{

    const name = req.body.name;

    db.query("SELECT * FROM jobs WHERE processor = ?", name, (err, result) =>{
        if(err){
            res.send({err:err});
        }
        if(result.length > 0){
            console.log("GET JOBS : " + result)
            res.send(result)
        }else{
            res.send({message:"no job"})
        }
    });
})

app.post("/takeJob", (req, res) =>{

    const name = req.body.name;
    const id = req.body.id;

    console.log("Take JOB")

    db.query("UPDATE jobs SET processor = '" + name + "' WHERE jobs.id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"processor changed"})
        }
    });
})

app.post("/dropJob", (req, res) =>{

    const id = req.body.id;

    db.query("UPDATE jobs SET processor = '" + "" + "' WHERE jobs.id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"job dropped"})
        }
    });
})


app.post("/finishJob", (req, res) =>{

    const id = req.body.id;
    var creator;
    var processor;

    console.log("Take JOB")

    db.query("SELECT * FROM jobs WHERE id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            creator = result[0].creator
            processor = result[0].processor
        }
    });

    db.query("UPDATE jobs SET finished = '" + 1 + "' WHERE jobs.id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"finished"})
        }
    });


})

app.post("/deleteJob", (req, res) =>{

    const id = req.body.id;

    console.log("delete JOB")

    db.query("DELETE FROM jobs WHERE id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"job deleted"})
        }
    });
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .listen(3001)
    
    /*
app.listen(3001, () => {
  console.log("running server");
});
*/