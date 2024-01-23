// Upload csv to db remotely
function csv_to_db(){
  const csv = require('csv-parser');
  const fs = require('fs');
  const mysql = require("mysql");
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
          results.push(all_data[i])
      }
      console.log(results)

    const connection = mysql.createConnection({
      host: "localhost",
      user: "b6a193d2581db9",
      password: "ecf07ce5",
      database: "heroku_bf0043764a0c597"
    });

    connection.connect(error => {
      if (error) {
        console.error(error);
      } else {
        let query =
          "INSERT INTO category (id,Password,First_Name,Last_Name,email,Role,FIT2004,FIT2021,FIT2085,ENG1001,ENG1002,ENG1005) VALUES ?";
        connection.query(query, results, (error, response) => {
          console.log(error || response);
        });
      }
  });
});
}

// Search students by id
function search_id(id){
  const csv = require('csv-parser');
  const fs = require('fs');
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
        	if(all_data[i].id == id) {
        		// __FOUND is set to the index of the element
        		index_list.push(i);
        	}
        }

      for(var i=0; i<index_list.length; i++) {
        results.push(all_data[index_list[i]])
      }
      console.log(results)
      return results
  });
}

function search_FIT2004(){
  const csv = require('csv-parser');
  const fs = require('fs');
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
        	if(all_data[i].FIT2004 == '1') {

        		index_list.push(i);
        	}
        }

      for(var i=0; i<index_list.length; i++) {
        results.push(all_data[index_list[i]])
      }
      console.log(results)
      return results
  });
}

function search_FIT2021(){
  const csv = require('csv-parser');
  const fs = require('fs');
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
        	if(all_data[i].FIT2004 == '1') {
        		index_list.push(i);
        	}
        }

      for(var i=0; i<index_list.length; i++) {
        results.push(all_data[index_list[i]])
      }
      console.log(results)
      return results
  });
}

function search_FIT2085(){
  const csv = require('csv-parser');
  const fs = require('fs');
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
        	if(all_data[i].FIT2004 == '1') {
        		index_list.push(i);
        	}
        }

      for(var i=0; i<index_list.length; i++) {
        results.push(all_data[index_list[i]])
      }
      console.log(results)
      return results
  });
}

function search_ENG1001(){
  const csv = require('csv-parser');
  const fs = require('fs');
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
        	if(all_data[i].ENG1001 == '1') {
        		index_list.push(i);
        	}
        }

      for(var i=0; i<index_list.length; i++) {
        results.push(all_data[index_list[i]])
      }
      console.log(results)
      return results
  });
}

function search_ENG1002(){
  const csv = require('csv-parser');
  const fs = require('fs');
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
        	if(all_data[i].ENG1002 == '1') {
        		index_list.push(i);
        	}
        }

      for(var i=0; i<index_list.length; i++) {
        results.push(all_data[index_list[i]])
      }
      console.log(results)
      return results
  });
}

function search_ENG1005(){
  const csv = require('csv-parser');
  const fs = require('fs');
  const all_data = [];
  const results = [];

  fs.createReadStream('logins.csv')
    .pipe(csv({}))
    .on('data', (data) => all_data.push(data))
    .on('end', () => {

      var index_list = [];
        for(var i=0; i<all_data.length; i++) {
        	if(all_data[i].ENG1005 == '1') {
        		index_list.push(i);
        	}
        }

      for(var i=0; i<index_list.length; i++) {
        results.push(all_data[index_list[i]])
      }
      console.log(results)
      return results
  });
}

// Test Functions
/*
test_search_id = search_id('844055')
test_search_FIT2004 = search_FIT2004()
test_search_FIT2021 = search_FIT2021()
test_search_FIT2085 = search_FIT2085()

test_search_ENG1001 = search_ENG1001()
test_search_ENG1002 = search_ENG1002()
test_search_ENG1005 = search_ENG1005()
*/
