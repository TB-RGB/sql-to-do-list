
console.log('JS is sourced!');

function getTasks(){
    axios({
        method: 'GET',
        url: '/todos'
    })
        .then((response)=>{
            renderTasks(response.data)
        })
        .catch((err)=>{
            console.error('Error in GET /todos', err)
        })
}


function renderTasks(tasks){
    let taskList = document.getElementById('taskList')

    taskList.innerHTML = ''
    for (let task of tasks){
        if (task.isComplete === false){
            taskList.innerHTML += `
            <tr>
                <td>${task.text}</td>
                <td>❌ Not Complete ❌</td>
                <td><button onClick="markComplete(${task.id}, true)">Completed</button></td>
                <td><button onClick="deleteTask(${task.id})">Remove</button></td>
            </tr>
            `;
        } else {
            taskList.innerHTML += `
            <tr>
                <td>${task.text}</td>
                <td>✅ All Done! ✅</td>
                <td><button disabled>Completed</button></td>
                <td><button onClick="deleteTask(${task.id})">Remove</button></td>
            </tr>
            `;
        }
    }
}

function newTask(newTask){
    axios({
        method: 'POST',
        url: '/todos',
        data: newTask
    })
        .then((response)=>{
            getTasks()
        })
        .catch((err)=>{
            console.error('Unable to add task', err)
        })
}

function submitTask(){
    console.log('Submit Task works')

    let task = {}

    task.text = document.getElementById('newTask').value

    if (task.text.length === 0){
        return
    }

    document.getElementById('newTask').value = ''

    newTask(task)
}

function markComplete(taskId, isComplete){
    axios({
        method: 'PUT',
        url: `/todos/task/${taskId}`,
        data: {isComplete: isComplete}
    })
        .then((response)=>{
            getTasks()
        })
        .catch((err)=>{
            console.error('Could not mark complete', err)
        })
}

function deleteTask(taskId){
    axios({
        method: 'DELETE',
        url: `/todos/${taskId}`
    })
        .then((response)=>{
            getTasks()
        })
        .catch((err)=>{
            console.error('Error removing task', err)
        })
}

getTasks()