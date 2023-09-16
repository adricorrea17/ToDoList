import Todo from "./Todo.js";
export default class {
    constructor() {
        this.element = document.querySelector('.containerTodo');
        this.todos = [];
        this.todosContainer = document.createElement('div');
        this.todosContainer.classList.add('flex', 'gap-4');
        this.element.append(this.todosContainer);

        let btnCreate = document.createElement('button');
        btnCreate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>`;
        btnCreate.classList.add('ml-4','bg-gray-700', 'rounded-md', 'border-gray-200', 'p-3', 'hover:bg-gray-100', 'hover:text-black')
        
        this.element.append(btnCreate);
        btnCreate.addEventListener('click', () => {
            this.modalCheckout()
        });

        this.btnCreate = btnCreate;
    }

    modalCheckout() {
        const { value: formValues } = Swal.fire({
            title: 'Que nombre le pondras a tu ToDoList?',
            html:
                '<input id="swal-input1" class="swal2-input">' ,
            focusConfirm: false,
        }).then((result) => {

            let todoName = document.getElementById('swal-input1').value;
        
            this.CreateElementTodo(todoName)

        })


    }

    CreateElementTodo(nameTodo){

        const id = this.todos.length;
        const ObjectFormTask = new Todo(id,this.todosContainer);
        this.todos.push(ObjectFormTask);
        // ObjectFormTask.addTask(nameTodo);
        
        /*
        this.todos.forEach(element => {
            const ObjectFormTask = new Todo(element.section);
            console.log(element.section)
            
            let tasks = ObjectFormTask.getStorage();
            if( tasks ){
                tasks.forEach(element => {
                    ObjectFormTask.addTask(element.name, element.completed);
                });
            }
        });
        */
    }
    removeTodo(todoName) {
            
        const index = this.todos.findIndex(todo => todo.name === todoName);
        this.todos.splice(index, 1);
        localStorage.removeItem("tasks-" + todoName);
        this.saveStorage();  
        
    }

    /*editTask(todoName, newTodosName) {
        const index = this.todos.findIndex(todo => todo.name === todoName);
        this.todos[index].name = newTodosName
        this.saveStorage();
    }*/

    saveStorage() {
        let localTodos = [];

        for (let i in this.todos) {
            localTodos.push({
                'name': this.todos[i].name,
            })
        }
        
        localStorage.setItem('todos', JSON.stringify(localTodos));
    }
    getStorage() {
        let todo = JSON.parse(localStorage.getItem('todos'));
        return todo ? todo : false;
    }

}