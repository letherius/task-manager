var iconImportant = "fas fa-star";
var iconNonImportant = "far fa-star";
var isImportant = false;
var isVisible = true;

function toggleImportant() {
  if (isImportant) {
    $("#iImportant").removeClass(iconImportant);
    $("#iImportant").addClass(iconNonImportant);
    isImportant = false;
  } else {
    $("#iImportant").removeClass(iconNonImportant);
    $("#iImportant").addClass(iconImportant);
    isImportant = true;
  }
}

function toggleForm() {
  if (isVisible) {
    $(".form").hide();
    isVisible = false;
  } else {
    $(".form").show();
    isVisible = true;
  }
}

function saveTask() {
  let title = $("#txtTitle").val();
  let desc = $("#txtDescription").val();
  let priority = $("#selPriority").val();
  let duedate = $("#selDueDate").val();
  let contact = $("#txtContact").val();
  let participants = $("#txtParticipants").val();
  let color = $("#selColor").val();

  let task = new Task(
    isImportant,
    title,
    desc,
    priority,
    duedate,
    contact,
    participants,
    color
  );

  $.ajax({
    type: "POST",
    url: "http://fsdiapi.azurewebsites.net/api/tasks/",
    data: JSON.stringify(task),
    contentType: "application/json",
    success: function (res) {
      display(task);
      clearFrom();
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function clearForm() {
  $("#txtTitle").val("");
  $("#txtDescription").val("");
  $("#selPriority").val("");
  $("#selDueDate").val("");
  $("#txtContact").val("");
  $("#txtParticipants").val("");
  $("#selColor").val("#000000");
}

function display(task) {
  console.log(task);

  let syntax = `<div class="task" style="border-color:${task.color}">
  <div class="head">
  <h5>${task.title}</h5>
  <p>${task.description}</p>
  </div>

  <div class="middle">
  <label>${task.priority}</label>
  <label>${task.dueDate}</label>
  </div>

  <div class="tail">
  <label>${task.contact}</label>
  <label>${task.participants}</label>
  </div>
</div>`;

  $("#task-list").append(syntax);
}

function testGet() {
  $.ajax({
    type: "GET",
    url: "http://fsdiapi.azurewebsites.net/",
    success: function (response) {
      console.log(response);
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function fetchTasks() {
  $.ajax({
    type: "GET",
    url: "http://fsdiapi.azurewebsites.net/api/tasks",
    success: function (response) {
      let list = JSON.parse(response);
      // travel the list with for loop
      for (let i = 0; i < list.length; i++) {
        // get every object inside the list
        let task = list[i];
        if (task.developer === "Letherius") {
          display(task);
        }
      }
    },
    error: function (error) {
      console.log(error);
    },
  });
}

function init() {
  console.log("Task manager");
  // load data
  fetchTasks();

  // hook events
  $("#btnSave").click(saveTask);
  $("#iImportant").click(toggleImportant);
  $("#btnHideForm").click(toggleForm);
}

window.onload = init;

// call a display task function
// send the object to it
// fn recieve the tasks as parameter
// console log the title of the task
