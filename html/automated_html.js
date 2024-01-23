let new_group = []

function all_data(query){
  let tasks = [
    {
      description: "Graph Theory Assignment",
      unit: "FIT2004",
      due: 2020-11-06
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


// Adapted from https://stackoverflow.com/questions/13964155/get-javascript-object-from-array-of-objects-by-value-of-property
function update_task_desciption(data_type, desc) {

  let arr = all_data(data_type);
  let value = desc;
  let task = null;

  for (var i=0, iLen=arr.length; i<iLen; i++) {

    if (arr[i].description == value) {
      task = arr[i];
    }
  }

  document.getElementById("task_description").innerHTML = task.description
  document.getElementById('task_unit').innerHTML = '<b>Unit: </b>' + task.unit + '<br>'
  document.getElementById('task_due').innerHTML = '<b>Due: </b>' + task.due

  create_table(task.unit)
}

function add_to_group(){
  let first_name = document.getElementById('first_name')
  let last_name = ''
  let students = all_data('students');


  for (var i=0, iLen=students.length; i<iLen; i++) {

    if (students[i].first_name == first_name) {
      new_group.push(students[i]);
    }
  }
}

function add_group() {
    // Store in task DB
//  var group_name = document.getElementById("group_name").value;
//  var group_members = document.getElementById("group_member").value;
  var members = []
  var group_name = document.getElementById("group_name").value;
  for(var i=0, stu_len = new_group.length; i<stu_len; i++){
    members.push(new_group.first_name[i]);
  }
  // Call table refresh
  // Argumemnts are temporary for now to demonstrate funcitonality
refresh_group_table(group_name, members);
}

function refresh_group_table(group_name, group_members){
    // Args are temporary - remove once you get db connectivity.
    // Once done -- add to page onload to <body> tag

    // Search db for all tasks for that persons' units
  var table = document.getElementById("group_table");
  // var row = table.insertRow(1);

  table.innerHTML += '<tr><td>' + group_name + '</td>';
  table.innerHTML += '<td>' + group_members + '</td></tr>';
  //var name_cell = row.insertCell(0);
  // var member_cell = row.insertCell(1);

  console.log(group_name)
  console.log(group_members)

/*
  group_name_cell.style.textAlign = "left";
  group_name_cell.innerHTML = group_name
  members_cell.innerHTML = group_members
*/
}


function create_table(unit){
  var table = document.getElementById("task_table");

  let groups = all_data('groups');
  let groups_arr = [];
  let sum_row = null;
  let detail_row = null;
  let group_students = null;

  for (var i=0, iLen=groups.length; i<iLen; i++) {

    if (groups[i].unit_code == unit) {
      groups_arr.push(groups[i]);
    }
  }


  for(var i=0, iLen=groups_arr.length; i<iLen; i++){
    name_output1 = name_output2 = contribution = marks = comments = submission = submitted = graded = '';
    group_students = group_name_search(groups_arr[i]);

    for(var j=0, jLen=group_students.length; j<jLen; j++){
      if (j != 0){
        name_output1 += ', ';
        name_output2 += '<br>';
        contribution += '<br>';
        marks += '<br>';
        comments += '<br>';

      }

      name_output1 += group_students[j].first_name + ' ' + group_students[j].last_name;
      name_output2 += group_students[j].first_name + ' ' + group_students[j].last_name;

      if (!groups_arr[i].contribution && (j == jLen-1)){
        contribution += '<br>';
      }
      else if(!groups_arr[i].contribution){
        contribution += '';
      }
      else {
        contribution += groups_arr[i].contribution[j];
      }

      if (!groups_arr[i].marks){
        marks += '<input type="text" id=' + groups_arr[i].group_id + "_mark_" + j + ' style="text-align: center">';
        graded = 'check_box_outline_blank'
        edit_button = 'value="change"> Confirm Grades </button>'
      }
      else {
        marks += groups_arr[i].marks[j];
        graded = 'check_box'
        edit_button = 'value="edit"> Edit Grades </button>'
      }

      if (!groups_arr[i].comments){
        comments += '<input type="text" id=' + groups_arr[i].group_id + "_comment_" + j + 'style="text-align: left">';
      }
      else {
        comments += groups_arr[i].comments[j];
      }
    }

    if (!groups_arr[i].submission){
      submission = "<i>'No Submission'</i>";
      submitted = 'check_box_outline_blank'
    }
    else {
      submission = '<u>' + groups_arr[i].submission + '</u>';
      submitted = 'check_box'
    }

    table.innerHTML += '<tr onclick="get_table_contents()" id=' + groups_arr[i].group_id + ' value="None"><td class="mdl-data-table__cell--non-numeric" colspan="3">' + name_output1 + '</td><td style="text-align: left">' + groups_arr[i].group_id + '</td><td style="text-align: center"><span class="material-icons">' + submitted + '</span></td><td style="text-align: center"><span class="material-icons">' + graded + '</span></td></tr>'
    table.innerHTML += '<tr style="background-color: silver; visibility: collapse;" class="' + groups_arr[i].group_id + '"><td class="mdl-data-table__cell--non-numeric"><b>Members</b><br>' + name_output2 + '</td><td style="text-align: center"><b>Contribution</b><br>' + contribution + '</td><td style="text-align: center">'+ submission + '</td><td style="text-align: center" id="' + groups_arr[i].group_id + '_grades"><b>Grade</b><br>' + marks + '</td><td style="text-align: left" id="' + groups_arr[i].group_id + '_comments"><b>Comments</b><br>' + comments + '</td><td style="text-align: center"><button onclick="edit_grades(\'' + groups_arr[i].group_id + '\')" id="' + groups_arr[i].group_id + '_edit" ' + edit_button

  }
}

function group_name_search(group_obj) {

  let arr = all_data('students');
  let value = null;
  let group_students = [];

  for (var j=0, jLen=group_obj.student_ids.length; j<jLen; j++) {
    value = group_obj.student_ids[j]

    for (var i=0, iLen=arr.length; i<iLen; i++) {
      if (arr[i].id == value) {
        group_students.push(arr[i]);
      }
    }
  }
  return group_students
}

function student_indiv_task(){
  var table = document.getElementById("student_task_table");
  let group_obj = all_data('groups');
  let current_group_id = 'FIT2004-3';   // fix when db connection is made
  let current_group = null;

  for (var j=0, jLen=group_obj.length; j<jLen; j++) {
    if (group_obj[j].group_id == current_group_id) {
      current_group = group_obj[j]
    }
  }

  name_output1 = name_output2 = contribution = marks = comments = submission = submitted = graded = '';
  group_students = group_name_search(current_group);

  for(var j=0, jLen=group_students.length; j<jLen; j++){
    if (j != 0){
      name_output1 += ', ';
      name_output2 += '<br>';
      contribution += '<br>';
      marks += '<br>';
      comments += '<br>';

    }

    name_output1 += group_students[j].first_name + ' ' + group_students[j].last_name;
    name_output2 += group_students[j].first_name + ' ' + group_students[j].last_name;

    if(!current_group.contribution){
      contribution += '<input type="text" id=' + current_group.group_id + "_contribution_" + j + ' style="text-align: center">';
    }
    else {
      contribution += current_group.contribution[j];
    }

    if (!current_group.marks && (j == jLen-1)){
      marks += '<br>';
      graded = 'check_box_outline_blank'
    }
    else if(!current_group.marks){
      marks += '';
    }
    else {
      marks += current_group.marks[j];
      graded = 'check_box'
    }

    if (!current_group.comments && (j == jLen-1)){
      comments += '<br>';
    }
    else if(!current_group.comments){
      comments += '';
    }
    else {
      comments += current_group.comments[j];
    }
  }

  if (!current_group.submission){
    submission = "<a href='File_Upload.html'><i>'Add Submission'</i></a>";
    submitted = 'check_box_outline_blank'
    edit_button = 'value="not_submitted"> Submit </button>'
  }
  else {
    submission = '<u>' + current_group.submission + '</u>';
    submitted = 'check_box'
    edit_button = 'value="submitted" disabled> Submitted </button>'
  }

  table.innerHTML += '<tr onclick="get_table_contents()" id=' + current_group.group_id + ' value="None"><td class="mdl-data-table__cell--non-numeric" colspan="3">' + name_output1 + '</td><td style="text-align: left">' + current_group.group_id + '</td><td style="text-align: center" id="submission_cell"><span class="material-icons">' + submitted + '</span></td><td style="text-align: center"><span class="material-icons">' + graded + '</span></td></tr>'
  table.innerHTML += '<tr style="background-color: silver;" class="' + current_group.group_id + '"><td class="mdl-data-table__cell--non-numeric"><b>Members</b><br>' + name_output2 + '</td><td style="text-align: center" id="contribution_col"><b>Contribution</b><br>' + contribution + '</td><td style="text-align: center">'+ submission + '</td><td style="text-align: center" id="' + current_group.group_id + '_grades"><b>Grade</b><br>' + marks + '</td><td style="text-align: left" id="' + current_group.group_id + '_comments"><b>Comments</b><br>' + comments + '</td><td style="text-align: center" id="button_cell"><button onclick="submit_task(\'' + current_group.group_id + '\')" id="' + current_group.group_id + '_edit" ' + edit_button

}

function submit_task(group_id){
  // Send inputted data to database

  document.getElementById('button_cell').innerHTML = '<button value="submitted" disabled> Submitted </button>'
  document.getElementById('submission_cell').innerHTML = '<span class="material-icons">check_box</span>'

  let group_obj = all_data('groups');
  let current_group_id = group_id;
  let comments = [];

  for (var j=0, jLen=group_obj.length; j<jLen; j++) {
    if (group_obj[j].group_id == current_group_id) {
      current_group = group_obj[j]
    }
  }

  group_students = group_name_search(current_group);

  for(var j=0, jLen=group_students.length; j<jLen; j++){
    comments.push(document.getElementById(String(group_id + '_contribution_' + j)).value)
  }

  for(var j=0, jLen=group_students.length; j<jLen; j++){
    if (j == 0){
      document.getElementById('contribution_col').innerHTML = '<b>Contribution</b><br>'
    }

    document.getElementById('contribution_col').innerHTML += comments[j]

    if (j !== group_students.length){
      document.getElementById('contribution_col').innerHTML += '<br>'
    }
  }
}
