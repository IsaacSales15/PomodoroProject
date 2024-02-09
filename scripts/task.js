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
    trashBin.addEventListener('click', () => DeletItem(trashBin));
    trashBinContainer.appendChild(trashBin);
    return trashBinContainer;
}

function createNewTask() {

    const taskElement = document.createElement('div');
    taskElement.classList.add('itens');

    const item = document.createElement('p');
    item.innerText = taskInput.value;
    item.addEventListener('click', () => LineThrough(item));


    taskElement.appendChild(item);
    taskElement.appendChild(createTrashBin());
    paineltask.appendChild(taskElement);
    taskInput.value= '';
}

const LineThrough = (item) => {
    const tasks = paineltask.childNodes;
    for(const task of tasks){
        if(task.firstChild === item) {
            task.firstChild.classList.toggle('riscado');
     }
    }
}

const DeletItem = (trashBin) => {
    const del = document.getElementsByClassName('itens');
    for(const remove of del){
            remove.remove();    
        }
    }

