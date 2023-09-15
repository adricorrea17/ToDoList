import ComponentTasks from "./Task.js";

export default class {
    constructor(parent = {}, name = '') {
        this.id = null;
        this.completed = false;
        this.name = name;
        this.parent = parent;
        this.element = null;
    }
    createElement() {
        let div = document.createElement('div');
        let divContainer = document.createElement('div');
        let btnConfirm = document.createElement('button');
        let btnRemove = document.createElement('button');
        let task = document.createElement('span');

        div.classList.add("mt-1", "mb-3", "w-full", "p-3", "text-md", "rounded-md", "border-gray-200", "shadow-sm", "flex", "justify-between", "bg-gray-700");
        divContainer.classList.add("flex", "gap-2")

        task.setAttribute("contenteditable", "true");
        task.innerHTML = this.name;
        btnRemove.innerHTML = '❌';
        btnConfirm.innerHTML = '👌';
        btnConfirm.classList.add("btnConfirm");

        div.append(task);
        div.append(divContainer);
        divContainer.append(btnConfirm);
        divContainer.append(btnRemove);

        task.addEventListener("keyup", () => {
            this.parent.editTask(this.id, task.innerText)
        })

        task.addEventListener("paste", () => {
            setTimeout(() => {
                this.parent.editTask(this.id, task.innerText);
            }, 0);
        })

        btnRemove.addEventListener("click", () => {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'bg-green-600 px-5 py-2 text-white mx-2 rounded-md hover:scale-110 duration-300',
                    cancelButton: 'bg-red-600 px-5 py-2 text-white mx-2 rounded-md hover:scale-110 duration-300'
                },
                buttonsStyling: false
            })

            swalWithBootstrapButtons.fire({
                title: 'Estas seguro?',
                text: "Tu no podras revertir esta accion",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, Borralo!',
                cancelButtonText: 'No, Cancelar!',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {


                    let tasks = this.parent.getStorage()

                    div.remove();
                    tasks.splice(0, 1);
                    this.parent.removeTask(this.id);

                }
            })
        })

        btnConfirm.addEventListener("click", () => {        
            this.completed = !this.completed;

            this.taskCompletedEffect()
            this.parent.changeCompleted(this.id);
        });

        this.element = div;

        return div;
    }

    taskCompletedEffect(){
        if (this.completed) {

            this.element.classList.add("opacity-50");
            this.element.querySelector('span').classList.add("line-through");
            this.element.querySelector('.btnConfirm').innerText = '🤔'
            this.parent.completeTask(this.id, 1000)

        } else {

            this.element.classList.remove("opacity-50");
            this.element.querySelector('span').classList.remove("line-through");
            this.element.querySelector('.btnConfirm').innerText = '👌'
            this.parent.activeTask(this.id)
            
        }

    }

}