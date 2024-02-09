const taskTextarea = document.querySelector('#task_textarea');
const addTaskButton = document.querySelector('#add_task_button');
const paineltask = document.querySelector('#tasks_panel');

const isTaskValid = () => taskTextarea.value.trim().length > 0;

function addNewTask() {

    if (!isTaskValid()){
        return taskTextarea.classList.add('erro');  //Reconhecer o erro com CSS
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

    const itemContainer = document.createElement('div');
    itemContainer.classList.add('item_container')

    const item = document.createElement('p');
    item.classList.add('item_p');
    itemContainer.appendChild(item);

    item.innerText = taskTextarea.value;

    item.addEventListener('click', () => LineThrough(item));


    taskElement.appendChild(itemContainer);
    taskElement.appendChild(createTrashBin());
    paineltask.appendChild(taskElement);
    taskTextarea.value= '';
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

