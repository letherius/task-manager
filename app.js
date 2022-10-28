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
  // task.test();
  console.log(task);
  display(task); // <- it should console log the title
  clearForm(); // should clear all the input field values
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
  console.log(task.title);

  let syntax = `<div class="task">
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

function init() {
  console.log("Task manager");
  // load data

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
