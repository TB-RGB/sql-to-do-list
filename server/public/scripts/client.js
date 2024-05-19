console.log("JS is sourced!");

function getTasks() {
  axios({
    method: "GET",
    url: "/todos",
  })
    .then((response) => {
      renderTasks(response.data);
    })
    .catch((err) => {
      console.error("Error in GET /todos", err);
    });
}

// ! Leftover from previous presentation implementation before styling with tailwind

// function renderTasks(tasks){
//     let taskList = document.getElementById('taskList')

//     taskList.innerHTML = ''
//     for (let task of tasks){
//         if (task.isComplete === false){
//             taskList.innerHTML += `
//             <tr data-testid="toDoItem">
//                 <td>${task.text}</td>
//                 <td>❌ Not Complete ❌</td>
//                 <td><button onClick="markComplete(${task.id}, true)" data-testid="completeButton">Completed</button></td>
//                 <td><button onClick="deleteTask(${task.id})" data-testid="deleteButton">Remove</button></td>
//             </tr>
//             `;
//         } else {
//             taskList.innerHTML += `
//             <tr data-testid="toDoItem" class="completed">
//                 <td>${task.text}</td>
//                 <td>✅ All Done! ✅</td>
//                 <td><button disabled data-testid="completeButton">Completed</button></td>
//                 <td><button onClick="deleteTask(${task.id})" data-testid="deleteButton">Remove</button></td>
//             </tr>
//             `;
//         }
//     }
// }

function renderTasks(tasks) {
  let taskList = document.getElementById("taskList");

  taskList.innerHTML = "";
  for (let task of tasks) {
    if (task.isComplete === false){
    taskList.innerHTML += `
            <div>
            <input class="hidden" type="checkbox" id="task_${task.id}" onClick="markComplete(${task.id}, true)">
            <label class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900" for="task_${task.id}">
              <span class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </span>
              <span class="ml-4 text-sm">${task.text}</span>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2.5 py-0.5 text-center me-2 mb-2 dark:border-purple-500 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-800" onClick="deleteTask(${task.id})" data-testid="deleteButton">Delete</button>
            </label>
          </div>
            `;
    } else {
        taskList.innerHTML += `
        <div>
            <input class="hidden" type="checkbox" id="task_${task.id}" onClick="markComplete(${task.id}, false)" checked>
            <label class="flex items-center h-10 px-2 rounded cursor-pointer hover:bg-gray-900" for="task_${task.id}">
              <span class="flex items-center justify-center w-5 h-5 text-transparent border-2 border-gray-500 rounded-full">
                <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </span>
              <span class="ml-4 text-sm">${task.text}</span>
              &nbsp;
              &nbsp;
              &nbsp;
              &nbsp;
              <button class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-2.5 py-0.5 text-center me-2 mb-2 dark:border-purple-500 dark:text-purple-500 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-800" onClick="deleteTask(${task.id})" data-testid="deleteButton">Delete</button>
            </label>
          </div>
        `
    }
  }
}

function newTask(newTask) {
  axios({
    method: "POST",
    url: "/todos",
    data: newTask,
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.error("Unable to add task", err);
    });
}

function submitTask() {
  console.log("Submit Task works");

  let task = {};

  task.text = document.getElementById("newTask").value;

  if (task.text.length === 0) {
    return;
  }

  document.getElementById("newTask").value = "";

  newTask(task);
}

function markComplete(taskId, isComplete) {
  axios({
    method: "PUT",
    url: `/todos/task/${taskId}`,
    data: { isComplete: isComplete },
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.error("Could not mark complete", err);
    });
}

function deleteTask(taskId) {
  axios({
    method: "DELETE",
    url: `/todos/${taskId}`,
  })
    .then((response) => {
      getTasks();
    })
    .catch((err) => {
      console.error("Error removing task", err);
    });
}

getTasks();
