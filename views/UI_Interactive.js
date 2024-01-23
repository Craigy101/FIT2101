
function all_data(query){
  let tasks = [
    {
      description: "Graph Theory Assignment",
      unit: "FIT2004",
      due: 2020-11-10
    },
    {
      description: "Matrices Test",
      unit: "FIT2004",
      due: 2020-10-30
    },
    {
      description: "Algebra Research Assignment",
      unit: "FIT2004",
      due: 2020-11-1
    }
  ]

  let students = [
    {
      id: 137753,
      first_name: 'Maya',
      last_name: 'Perkins',
      group_id: 'FIT2004-1'
    },
    {
      id: 416738,
      first_name: 'Tiana',
      last_name: 'Richards',
      group_id: 'FIT2004-1'
    },
    {
      id: 370226,
      first_name: 'April',
      last_name:  'Grant',
      group_id: 'FIT2004-1'
    },
    {
      id: 547965,
      first_name: 'Paige' ,
      last_name: 'Jones',
      group_id: 'FIT2004-1'
    },
    {
      id: 497263,
      first_name: 'Adelaide',
      last_name: 'Cameron',
      group_id: 'FIT2004-2'
    },
    {
      id: 271751,
      first_name: 'Harold',
      last_name: 'Williams',
      group_id: 'FIT2004-2'
    },
    {
      id: 954745,
      first_name: 'Reid',
      last_name:  'Bailey',
      group_id: 'FIT2004-2'
    },
    {
      id: 684444,
      first_name: 'Byron' ,
      last_name: 'Martin',
      group_id: 'FIT2004-2'
    },
    {
      id: 152598,
      first_name: 'Stella',
      last_name: 'Cooper',
      group_id: 'FIT2004-3'
    },
    {
      id: 154335,
      first_name: 'Chester',
      last_name: 'Robinson',
      group_id: 'FIT2004-3'
    },
    {
      id: 126430,
      first_name: 'Brooke',
      last_name:  'Rogers',
      group_id: 'FIT2004-3'
    },
    {
      id: 903357,
      first_name: 'Edgar' ,
      last_name: 'Richardson',
      group_id: 'FIT2004-3'
    }
  ]

  let groups =[
    {
      unit_code: 'FIT2004',
      group_id: 'FIT2004-1',
      student_ids: [137753, 416738, 370226, 547965],
      contribution: ['2 Hours', '1 Hour', '1.5 Hours', '2 Hours'],
      submission: 'FIT2004-1_assignment1.pdf',
      marks: ['A', 'C', 'B', 'A'],
      comments: ["Good Attempt", "Getting Better", "Well Done", "Superb", "Well Done"]
    },
    {
      unit_code: 'FIT2004',
      group_id: 'FIT2004-2',
      student_ids: [497263, 271751, 954745, 684444],
      contribution: ['1 Hour', '2 Hours', '2.5 Hours', '2 Hours'],
      submission: 'FIT2004-2_assignment1.pdf',
      marks: null,
      comments: null
    },
    {
      unit_code: 'FIT2004',
      group_id: 'FIT2004-3',
      student_ids: [152598, 154335, 126430, 903357],
      contribution: null,
      submission: null,
      marks: null,
      comments: null,
    }
  ]

  if (query == "tasks"){
    return tasks
  }
  else if (query == "students"){
    return students
  }
  else {
    return groups
  }
}

/* Code sourced from https://www.w3schools.com/howto/howto_js_accordion.asp */

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}


/* Code sourced from https://www.w3schools.com/howto/howto_js_accordion.asp */
function show_add_task(id) {
  var x = document.getElementById(id);
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function add_task() {
  // Store in task DB
  var task_desc = document.getElementById("task_description").value;
  var unit = document.getElementById("task_unit").value;
  var due_date = document.getElementById("due_date").value;

  // Call table refresh
  // Argumemnts are temporary for now to demonstrate funcitonality
  refresh_task_table(task_desc, unit, due_date);
}


function refresh_task_table(task, unit, due){
  // Args are temporary - remove once you get db connectivity.
  // Once done -- add to page onload to <body> tag

  // Search db for all tasks for that persons' units
  var table = document.getElementById("task_table");
  var row = table.insertRow(1);

  var description_cell = row.insertCell(0);
  var unit_cell = row.insertCell(1);
  var due_cell = row.insertCell(2);

  console.log(task)
  console.log(unit)
  console.log(due)

  description_cell.style.textAlign = "left";
  description_cell.innerHTML = task
  unit_cell.innerHTML = unit
  due_cell.innerHTML = due

}

// code sourced from: https://stackoverflow.com/questions/17979931/obtain-field-td-values-by-clicking-on-table-row
function get_table_contents(){
    document.getElementById('task_table').onclick = function(event){
        event = event || window.event; //for IE8 backward compatibility
        var target = event.target || event.srcElement; //for IE8 backward compatibility
        while (target && target.nodeName != 'TR') {
            target = target.parentElement;
        }
        var cells = target.cells; //cells collection
        if (!cells.length || target.parentNode.nodeName == 'THEAD') { // if clicked row is within thead
            return;
        }
        group_id = cells[1].innerHTML   // Query in db

        table_hide(group_id)
    }
}

// referenced from https://stackoverflow.com/questions/41142925/hide-unhide-table-rows-clicking-on-button/41143167
function table_hide(test) {

    if (document.getElementById(test).value != "Hide " + test) {
        document.getElementById(test).value = "Hide " + test;
        var table= document.getElementById("task_table");
        for (var i = 0, row; row = table.rows[i]; i++) {
          if(row.className == test){row.style.visibility='visible';}
        }
    }
    else{
      document.getElementById(test).value = "Show " + test;
      var table= document.getElementById("task_table");
      for (var i = 0, row; row = table.rows[i]; i++) {
        if(row.className == test){row.style.visibility="collapse";}
      }
  }
}

function confirm_grades(){
  // Stores grade and comments in database and refreshes table
}

function edit_grades(id){
  if (document.getElementById(id + '_edit').value === "edit") {
    document.getElementById(id + '_grades').innerHTML = '<b>Grade</b><br><input type="text" style="text-align: center"><br><input type="text" style="text-align: center"><br><input type="text" style="text-align: center"><br><input type="text" style="text-align: center"><br>'
    document.getElementById(id + '_comments').innerHTML = '<b>Comments</b><br><input type="text" style="text-align: center"><br><input type="text" style="text-align: left"><br><input type="text" style="text-align: left"><br><input type="text" style="text-align: left"><br>'
    document.getElementById(id + '_edit').innerHTML = "Confirm Grade"
    document.getElementById(id + '_edit').value = "change"

  }
  else{
    confirm_grades()
    document.getElementById(id + '_edit').innerHTML = "Edit Grades"
    document.getElementById(id + '_edit').value = "edit"
  }
}

function update_table(unit){
  let tasks = all_data('tasks');
  let tasks_arr = [];
  let desc = '';
  let due = '';
  let table = document.getElementById("task_table");

  for (var i=0, iLen=tasks.length; i<iLen; i++) {

    if (tasks[i].unit == unit) {
      tasks_arr.push(tasks[i]);
    }
  }

  for (var i=0, iLen=tasks_arr.length; i<iLen; i++) {
    desc = tasks_arr[i].description
    due = tasks_arr[i].due

    table.innerHTML += '<tr><td class="mdl-data-table__cell--non-numeric">' + desc + '</td><td>' + unit + '</td><td>' + due + '</td></tr>'
  }
}
