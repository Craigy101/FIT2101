const express = require("express");
const mysql = require("mysql");

const router = express.Router();
function connectDB(){
  const database = mysql.createConnection(
    {
      host: process.env.HOST,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABSE
    }
  )

  database.connect((error) => {
    if(error)
    {
        console.log(error)
        console.log("error connecting to database")
    }
    else
    {
      console.log("connected to db")
    }
  })
}

router.get("/",(req,res) =>{
   res.render("loginpage");
})

router.get("/chat",(req,res) =>{
   res.render("chat");
})

router.get("/viewgroups",(req,res) =>{
   res.render("viewgroups");
})

router.get("/groupcreation",(req,res) =>
  {
    database = connectDB()
    console.log("does getstudents this run")
    var id = [];
    var first_name = [];
    var last_name = [];
    var groupNames = [];
    var groupId = [];
    database.query('SELECT id,First_Name,Last_Name FROM heroku_bf0043764a0c597.logins WHERE Role = "Student"', function(error, result, fields){
      for(var i=0; i < result.length; i++){
        id.push(result[i]['id'])
        first_name.push(result[i]['First_Name'])
        last_name.push(result[i]['Last_Name'])
      }
    })

    database.query('SELECT * FROM heroku_bf0043764a0c597.groups ORDER BY groupName ASC', function(error, result, fields){
      for(var i=0; i < result.length; i++){
        groupId.push(result[i]['id'])
        groupNames.push(result[i]['groupName'])
      }
      res.render("group_creation", {id, first_name, last_name, groupId, groupNames})
    })
  })

module.exports = router;

function connectDB(){
  const database = mysql.createConnection(
    {
      host: process.env.HOST,
      user: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABSE
    }
  )

  database.connect((error) => {
    if(error)
    {
        console.log(error)
        console.log("error connecting to database")
    }
    else
    {
      console.log("connected to db")
    }
  })
  return database
}
