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
    secret: "Okumoeige9abnzhRIGe6gqhxPkrvLT",
    resave: false,
    saveUninitialized: false,
    cookie: {
        sameSite: "none",
        secure: true,
        httpOnly: false,
      expires: 86400000, //1 day
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

  const email = req.body.email;
  const confirmation = req.body.confirmation;

  db.query(
    "SELECT * FROM users WHERE username = ?;",
    username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
            res.send({ message: "Username already exists" });
      } else {

        if(username.length < 3){
            res.send({message: 'Username needs at least 3 characters'});
        }else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            res.send({message: 'email not valid'});
        }else if(password.length < 8){
            res.send({message: 'Password needs at least 8 characters'});
        }else if(password !== confirmation){
            res.send({message: 'Password and Confirmation don\'t match'});
        }else{

        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              console.log(err);
            }
            db.query(
              "INSERT INTO users (username, password, hours, email) VALUES (?,?,?,?)",
              [username, hash, 10, email],
              (err, result) => {
                console.log(err);
              }
            );
            res.send({message: ''});
        });

        }
      }
    }
  );
});

app.get("/login", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user});
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ?;", username, (err, result) => {
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


//------------------------------------------------------------------------------------------------------------------

app.post("/email", (req, res) => {
  const username = req.body.username;

  db.query(
    "SELECT email FROM users WHERE username = ?;", username, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
      console.log(result);
  });
})

app.post("/hours", (req, res) => {
  const username = req.body.username;

  db.query(
    "SELECT hours FROM users WHERE username = ?;", username, (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      res.send(result);
      console.log(result);
  });
})

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
    db.query("SELECT * FROM jobs", (err, result) =>{
        if(err){
            res.send({err:err});
        }
        if(result.length > 0){
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
            res.send(result)
        }else{
            res.send({message:"no job"})
        }
    });
})

app.post("/getUserRatings", (req, res) =>{

  const name = req.body.name;

  console.log("User rating name : " + name)

  db.query("SELECT rating FROM zeitbankdb.rating r, zeitbankdb.users u WHERE u.username = r.username AND u.username = ?", name, (err, result) =>{
      if(err){
          res.send({err:err});
      }
      if(result.length > 0){
        console.log(result)
          res.send(result)
      }else{
          res.send({message:"no rating"})
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
    console.log("Server drop Job with ID:" + id)

    db.query("UPDATE jobs SET processor = " + null + " WHERE id = ?;", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            res.send({message:"job dropped"})
        }
    });
})

app.post("/finishJob", (req, res) =>{

    const id = req.body.id;
    const rating = req.body.rating;

    var creator;
    var processor;
    var hours;

    console.log("finish JOB")

    db.query("SELECT * FROM jobs WHERE id = ?", id, (err, result) =>{
        if(err){
            res.send({err:err});
        }else{
            console.log(result)
            creator = result[0].creator
            processor = result[0].processor
            hours = result[0].hours
            transaction(hours, processor, creator, rating);
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

function transaction(hours, processor, creator, rating) { 

  console.log("rating processor:" + processor)
  console.log("rating rating:" + rating)
  db.query("INSERT INTO zeitbankdb.rating (username, rating) VALUES (?, ?)", [processor, rating], (err, result) =>{
    if(err){
        console.error("sql error")
    }else{
        console.log("rating done")
    }
  })
    db.query("UPDATE users SET hours = hours + '"+hours+"' WHERE username = ?", processor, (err, result) =>{
        if(err){
            res.send({err:err});
        }
    });
    db.query("UPDATE users SET hours = hours - '"+hours+"' WHERE username = ?", creator, (err, result) =>{
        if(err){
            res.send({err:err});
        }
    });
}

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
