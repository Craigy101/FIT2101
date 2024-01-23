const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

//"/login" same as /auth/login which is where we send the filled out form
router.post("/login", authController.login);

router.get("/getStudents", (req, res) => {
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
} );


router.post("/pushGroups", authController.pushGroups);

module.exports = router;
