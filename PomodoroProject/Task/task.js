const addtask = document.querySelector('.addinput');
const addpainel = document.querySelector('.addbutton');
const paineltask = document.querySelector('.painel_de_tarefas');

const validartask = () => addtask.value.trim().length > 0;


const valido = () => {
    const validook = validartask();

    console.log(validook);

    if (!validook){
        return addtask.classList.add('erro');  //Tem como trabalhar essa parte em CSS, pra quando reconhecer um erro, o input mudar de cor!
    }

    const mostrapainel = document.createElement('div');
    mostrapainel.classList.add('itens');

    const item = document.createElement('p');
    item.innerText = addtask.value;

    const trash = document.createElement('i'); //Essa parte é uma tentativa de tentar colocar um lixo bonitinho pra função Del
    trash.classList.add('fa-solid');
    trash.classList.add('fa-trash');

    mostrapainel.appendChild(trash);
    mostrapainel.appendChild(item);
    paineltask.appendChild(mostrapainel);

    console.log(mostrapainel)
};

addpainel.addEventListener('click', () => valido());