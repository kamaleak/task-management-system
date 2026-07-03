// ===============================
// TASK MANAGEMENT SYSTEM
// ===============================

// Load tasks from Local Storage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Save tasks
function saveLocal() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update dashboard card
function updateDashboard() {
    let total = document.getElementById("totalTasks");

    if (total) {
        total.innerHTML = tasks.length;
    }
}

// ===============================
// ADD TASK
// ===============================

function saveTask() {

    let task = document.getElementById("task").value.trim();
    let priority = document.getElementById("priority").value;
    let date = document.getElementById("date").value;
    let alarm = document.getElementById("alarm").value;
    let notes = document.getElementById("notes").value;

    if (task == "") {
        alert("Please Enter Task");
        return;
    }

    tasks.push({
        task,
        priority,
        date,
        alarm,
        notes,
        completed: false
    });

    saveLocal();

    alert("Task Added Successfully!");

    window.location = "tasks.html";
}

// ===============================
// DISPLAY TASKS
// ===============================

function displayTasks() {

    let table = document.getElementById("taskTable");

    if (!table) return;

    table.innerHTML = "";

    tasks.forEach((item, index) => {

        table.innerHTML += `

<tr>

<td>${item.task}</td>

<td>${item.priority}</td>

<td>${item.date}</td>

<td>${item.alarm}</td>

<td>

<button
onclick="completeTask(${index})"
style="
background:green;
color:white;
border:none;
padding:8px 12px;
border-radius:6px;
cursor:pointer;">

${item.completed ? "Completed" : "Pending"}

</button>

</td>

<td>

<button
class="delete-btn"
onclick="deleteTask(${index})">

Delete

</button>

</td>

</tr>

`;

    });

}

// ===============================
// DELETE TASK
// ===============================

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveLocal();

        displayTasks();

        updateDashboard();

    }

}

// ===============================
// COMPLETE TASK
// ===============================

function completeTask(index){

    tasks[index].completed = !tasks[index].completed;

    saveLocal();

    displayTasks();

}

// ===============================
// LOAD PAGE
// ===============================

updateDashboard();

displayTasks();