document.addEventListener("DOMContentLoaded", function () {
    const button = document.querySelector("#add-btn");
    const popupAdd = document.querySelector(".popup-container.add");
    const table = document.querySelector("#table-data");
    const taskInput = document.querySelector(".task-input");

    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

    
    for (const task of savedTasks) {
        addTaskToTable(task);
    }

    button.addEventListener('click', function () {
        const TaskName = taskInput.value;
        if(!TaskName) {
            alert("Task Name should not be EMPTY");
            return ;
        }
        addTaskToTable(TaskName);
        savedTasks.push(TaskName); 
        saveTasksLocally(savedTasks); 
        taskInput.value = '';
        
        popupAdd.style.display = 'block';
    });

    function addTaskToTable(TaskName) {
        const newRow = table.insertRow();

        newRow.insertCell(0).innerHTML = '<input type="checkbox" class="checkbox">';
        newRow.insertCell(1).textContent = TaskName;
        newRow.insertCell(2).innerHTML = '<button class="edit-btn"><i class="fa-solid fa-pen-to-square"></i></button><button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>';

        const checkBox = newRow.querySelector('.checkbox');
        const editButton = newRow.querySelector(".edit-btn");
        const deleteButton = newRow.querySelector(".delete-btn");

        checkBox.addEventListener('change', function () {
            if (checkBox.checked) {
                markAsCompleted(newRow);
            } else {
                markAsIncomplete(newRow);
            }
        });

        editButton.addEventListener('click', function () {
            editTask(newRow);
        });

        deleteButton.addEventListener('click', function () {
            deleteTask(newRow);
            savedTasks = savedTasks.filter(task => task !== TaskName);
            saveTasksLocally(savedTasks); 
        });
    }

    function markAsCompleted(row) {
        row.style.textDecoration = 'line-through';
        row.style.color = 'green';
        row.querySelector('.edit-btn').style.display = 'none';
        row.querySelector('.delete-btn').style.display = 'none';
    }

    function markAsIncomplete(row) {
        row.style.textDecoration = 'none';
        row.style.color = 'black';
        row.querySelector('.edit-btn').style.display = 'inline';
        row.querySelector('.delete-btn').style.display = 'inline';
    }

    const popupUpdate = document.querySelector(".popup-container.update");

    function editTask(row) {
        const taskText = row.cells[1].textContent;
        const editInput = document.createElement('input');
        editInput.value = taskText;
        const doneButton = document.createElement('button');
        doneButton.innerText = 'Done';
        row.querySelector('.edit-btn').style.display = 'none';
        row.querySelector('.delete-btn').style.display = 'none';

        row.cells[1].textContent = '';
        row.cells[1].appendChild(editInput);
        row.cells[1].appendChild(doneButton);

        doneButton.addEventListener('click', function () {
            row.cells[1].textContent = editInput.value;
            row.querySelector('.edit-btn').style.display = 'inline';
            row.querySelector('.delete-btn').style.display = 'inline';
            popupUpdate.style.display = 'block';
        });
    }

    const popupDelete = document.querySelector(".popup-container.delete");


    function deleteTask(row) {
        const taskName = row.cells[1].textContent;
        row.remove();
        savedTasks = savedTasks.filter(task => task !== taskName);
        saveTasksLocally(savedTasks); 
        popupDelete.style.display = 'block' ;
    }

    function saveTasksLocally(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    const PopupClose = document.querySelectorAll(".btn");

    for (let i = 0; i < PopupClose.length; i++) {
        PopupClose[i].addEventListener('click', function () {
            const popup = document.querySelectorAll(".popup-container")[i];

            if (popup) {
                popup.style.display = 'none';
            }
        })
    }
});
