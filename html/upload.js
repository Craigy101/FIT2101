const mysql = require("mysql");
const popup = require('node-popup');
const express = require("express");
app = express();

exports.upload = (req, res) => {

	document.querySelector("#read-file").addEventListener('click', function() {
		// no file selected to read
		if(document.querySelector("#file").value == '') {
			console.log('No file selected');
			return;
		}

		var file = document.querySelector("#file").files[0];

		var reader = new FileReader();
		reader.onload = function(e) {
			// binary data
			console.log(e.target.result);
		};
		reader.onerror = function(e) {
			// error occurred
			console.log('Error : ' + e.type);
		};
		var data = reader.readAsBinaryString(file);
		var group_num = 3;
		var class_id = "FIT2004";
		var assignment = "Assignment 1"

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
	        console.log("Error connecting to database")
	    }
	    else
	    {
	      console.log("Successful connection to DB")
	    }
	  })

	  database.query('INSERT INTO heroku_bf0043764a0c597.file_uploads (name, data, group_num, class_id, assignment) VALUES (test.docx,'+data+','+group_num+','+class_id+','+assignment+')');

	});
}
