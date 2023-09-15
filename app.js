import Todo from "./modules/Todo.js";
import CreateTodo from "./modules/CreateTodo.js";


document.addEventListener("DOMContentLoaded", (event) => {

    const CompoTask = document.querySelectorAll('.compoTask');
    const ObjectCreateTodo = new CreateTodo();
    console.log(ObjectCreateTodo)
    CompoTask.forEach(element => {
        const ObjectFormTask = new Todo(element);
        
        // borrar ->
        window.elcompo = ObjectFormTask;

        let tasks = ObjectFormTask.getStorage();
        if( tasks ){
            tasks.forEach(element => {
                ObjectFormTask.addTask(element.name, element.completed);
            });
        }
        
    });

})

/* crear objeto Kaban.
1. el objeto kanban te va a permitir crear varios Todos por lo tanto, en el html no quereoms tener mas los todo, 
sino que queremos que se creen en el objeto kaban mediante un boton agregar mas, y que se eliminen mediante un tachito/cruz y 
que se pueda cambiar el titulo
<- hasta aca es obligatorio
2.
si queres sino en clase, podemos hacer para arrastrar un task de un Todo a otro. y los todos se puedan ordenar tambien*/