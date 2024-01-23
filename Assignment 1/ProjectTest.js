//Test file for program
const mariadb = require('mariadb');
mariadb.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'FIT2101',
    database: 'mysql',
    rowsAsArray: Boolean(true)
  })

  /* This is for when the db is hosted at the same place as the webserver
const mariadb = require('mariadb');
mariadb.createConnection({ socketPath: '\\\\.\\pipe\\MySQL', user: 'root' })
    .then(conn => { ... })
    .catch(err => { ... });
*/

  .then(conn => {
    console.log("Connected ! connection id is " + conn.threadId);

    /* This line inserts into a table, usable by tutors to create groups, heads to add classes and tutors, etc
    conn.query("INSERT INTO class VALUES (?, ?)",["MTH1002", "Alt Mathematics"])
    */

    /* This line deletes from a table, usable by heads to remove classes
    conn.query("DELETE FROM class WHERE (matches input from button)",["", ""])
    */

    conn.query("SELECT * from class")
      .then(rows => {
        console.log(rows);
      })
      .catch(err => {
        console.log("Error: " + err);
      })

  })
  .catch(err => {
    console.log("Not connected due to error: " + err);
  });

/* Another query example, closes connection after query end
  .then(conn => {
    conn.query("select 1", [2])
      .then(rows => {
        console.log(rows); // [{ "1": 1 }]
        conn.end();
      })
      .catch(err => {
        console.log("Query error: " + err);
      });
  });
*/
