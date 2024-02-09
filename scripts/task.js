const taskInput = document.querySelector('#task_input');
const addTaskButton = document.querySelector('#add_task_button');
const paineltask = document.querySelector('#tasks_panel');

const isTaskValid = () => taskInput.value.trim().length > 0;

function addNewTask() {

    if (!isTaskValid()){
        return taskInput.classList.add('erro');  //Reconhecer o erro com CSS
    }

    createNewTask();
};

addTaskButton.addEventListener('click', () => addNewTask());

function createTrashBin() {
    const trashBinContainer = document.createElement('span');
    trashBinContainer.classList.add('gg-trash_container');
    const trashBin = document.createElement('span');
    trashBin.classList.add('gg-trash');
    trashBinContainer.appendChild(trashBin);
    return trashBinContainer;
}

function createNewTask() {

    const taskElement = document.createElement('div');
    taskElement.classList.add('itens');

    const item = document.createElement('p');
    item.innerText = taskInput.value;

    taskElement.appendChild(createTrashBin());
    taskElement.appendChild(item);
    paineltask.appendChild(taskElement);
}
