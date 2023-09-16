import Todo from "./modules/Todo.js";
import Kanban from "./modules/Kanban.js";


document.addEventListener("DOMContentLoaded", (event) => {

    const ObjectKanban = new Kanban();
    let todoArray = ObjectKanban.getStorage();

    if (todoArray) {
        todoArray.forEach(element => {
            ObjectKanban.CreateElementTodo(element.name)
        });

        // const CompoTask = document.querySelectorAll('.compoTask');

        // CompoTask.forEach(element => {
        //     const ObjectFormTask = new Todo(element);
    
        //     let tasks = ObjectFormTask.getStorage();
        //     if (tasks) {
        //         tasks.forEach(element => {
        //             ObjectFormTask.addTask(element.name, element.completed);
        //         });
        //     }
        // });
    }

})

/* crear objeto Kanban.
1. el objeto kanban te va a permitir crear varios Todos por lo tanto, en el html no quereoms tener mas los todo, 
sino que queremos que se creen en el objeto Kanban mediante un boton agregar mas, y que se eliminen mediante un tachito/cruz y 
que se pueda cambiar el titulo
<- hasta aca es obligatorio
2.
si queres sino en clase, podemos hacer para arrastrar un task de un Todo a otro. y los todos se puedan ordenar tambien*/