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

function createNewTask() {

    const taskElement = document.createElement('div');
    taskElement.classList.add('itens');

    const item = document.createElement('p');
    item.classList.add('item_p');

    item.innerText = taskInput.value;

    item.addEventListener('click', () => LineThrough(item));

    const trashBinContainer = document.createElement('span');
    trashBinContainer.classList.add('gg-trash_container');
    const trashBin = document.createElement('span');
    trashBin.classList.add('gg-trash');
    trashBin.addEventListener('click', () => DeletItem(taskElement, item));
    trashBinContainer.appendChild(trashBin);

    taskElement.appendChild(item);
    taskElement.appendChild(trashBinContainer);
    paineltask.appendChild(taskElement);
    taskInput.value= '';
};

const DeletItem = (taskElement, item) =>{
    const remove = paineltask.childNodes;
    for(const task of remove){
        if(task.firstChild === item){
            taskElement.remove()
        }
    }
};

const LineThrough = (item) => {
    const tasks = paineltask.childNodes;
    for(const task of tasks){
        if(task.firstChild === item) {
            task.firstChild.classList.toggle('line_through');
        }
    }
};

