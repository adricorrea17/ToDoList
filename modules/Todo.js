import Task from "./Task.js";

export default class {
    constructor(element) {
        this.storage_name = element.id;
        this.form = element.querySelector('.formTask');
        this.list = element.querySelector('.tasks');
        this.tasks = [];


        this.completeList = document.createElement('div');
        let title = document.createElement('h1').innerText = "Tareas Completadas"
        this.completeList.classList.add("bg-gray-800", "rounded-md", "border-gray-200", "p-3", "mb-3")
        element.append(this.completeList)
        this.completeList.append(title)

        this.form.addEventListener('submit', (event) => {
            const input = this.form.querySelector('input[name="task"]');

            this.addTask(input.value);

            this.form.reset()
            event.preventDefault();
            return false;
        })
    }

    addTask(value = '', completed = false) {
        if (!value) { return false; }

        const objectTask = new Task(this, value);
        const id = this.tasks.push(objectTask);
        objectTask.id = id;
        objectTask.completed = completed;
        this.list.prepend(objectTask.createElement());
        objectTask.taskCompletedEffect()
        this.completeTask(id);

        this.saveStorage()
    }

    completeTask(id, delay = 0) {
        const index = this.searchTaskById(id);

        this.saveStorage();

        setTimeout(() => {
            if (this.tasks[index].completed == true) {
                this.completeList.append(this.tasks[index].element);
            }
        }, delay);
        
    }
    activeTask(id) {
        const index = this.searchTaskById(id);
        this.list.append(this.tasks[index].element);

        this.saveStorage();
    }

    searchTaskById(id) {
        return this.tasks.findIndex(task => task.id == id);
    }

    editTask(id, value = '') {
        const index = this.searchTaskById(id);

        this.tasks[index].name = value;
        this.saveStorage();
    }
    removeTask(id) {
        const index = this.searchTaskById(id);

        delete this.tasks[index];

        this.saveStorage();
    }

    saveStorage() {
        let simplifyTask = [];

        for (let i in this.tasks) {
            simplifyTask.push({
                'id': this.tasks[i].id,
                'name': this.tasks[i].name,
                'completed': this.tasks[i].completed
            })
        }
        
        localStorage.setItem('tasks-' + this.storage_name, JSON.stringify(simplifyTask));
    }
    getStorage() {
        let tasks = JSON.parse(localStorage.getItem('tasks-' + this.storage_name));
        return tasks ? tasks : false;
    }
    changeCompleted(id) {
        let tasks = this.getStorage()
        const taskId = tasks.findIndex(task => task.id === id);
        tasks[taskId].completed = !tasks[taskId].completed;
    }
}