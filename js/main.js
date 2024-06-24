
import { getAllData, getFilteredData } from "./algoritms/formules.js";
import { listAlldata } from "./components/list.js";
import { addNewData } from "./algoritms/formules.js";

export const taskList = document.querySelector('#task-list');
export const taskSearchInput = document.querySelector('#task-search');
const addTaskBtn = document.querySelector('#add-task-btn');

document.addEventListener('DOMContentLoaded', async () => {
    let data = await getAllData();
    listAlldata(data);


    taskSearchInput.addEventListener('input', async (event) => {
        const search = event.target.value.trim().toLowerCase();
        taskList.innerHTML = ''; // Clear the list before updating
        if (search.length > 0) {
            let data = await getFilteredData(search);
            listAlldata(data);
        } else {
            data = await getAllData();
            listAlldata(data);
        }
    });


    addTaskBtn.addEventListener('click', async () => {
        const newTask = taskSearchInput.value.trim(); // Obtiene el texto de la nueva tarea
        if (newTask) {
            await addNewData(newTask); // Invoca el hechizo para agregar una nueva tarea
            taskSearchInput.value = ''; // Limpia el campo de búsqueda después de agregar la tarea
            const updatedData = await getAllData(); // Obtén los datos actualizados
            taskList.innerHTML = ''; // Limpia la lista de tareas en el DOM
            listAlldata(updatedData); // Vuelve a renderizar la lista con los datos actualizados
        }
    });

});
