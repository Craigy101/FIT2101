const mysql = require("mysql");
const popup = require('node-popup');
const express = require("express");
app = express();

exports.login = (req,res) => {

  const {ID, password} = req.body
  console.log({ID, password})

  database = connectDB()

  //This checks that the password in the database matches the password given

  database.query('SELECT * FROM heroku_bf0043764a0c597.csv_logins WHERE ID = '+Number(ID), function(error, result, fields){
    console.log('results: ')
    console.log(result)
    try{
      name = result[0]['firstName']
      role = result[0]['Role']
      unit1 = result[0]['Unit1']
      unit2 = result[0]['Unit2']
      unit3 = result[0]['Unit3']
      unit4 = result[0]['Unit4']
      unit5 = result[0]['Unit5']
      unit6 = result[0]['Unit6']
    }
    catch(error){
      console.log("Please enter a Password")
      res.render("loginpagealt")
    }
    if(error){console.log(error)}
    if(result.length == 0 || !result)
    {
        console.log("Please enter a Password")
        res.render("loginpagealt")
    }
    else if ((result[0]['Password'] != password) || result.length == 0) {
      console.log("Id or Password incorrect")
      res.render("loginpagealt")
    }
    else{
      console.log("log in success")
      res.render("home" , {name, role, unit1, unit2, unit3, unit4, unit5, unit6})
    }
  })
 }

//TESTING
 exports.pushGroups = (req,res) => {

   const {group_name, group_member} = req.body
   console.log({group_name, group_member})

   database = connectDB()

   database.query("INSERT INTO heroku_bf0043764a0c597.groups (id,groupName,tutor,classID) VALUES(" + group_member + "," + "'" + group_name + "'" + ",410734,'FIT2004');")
}

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
