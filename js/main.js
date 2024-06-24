
import { getAllData, getFilteredData } from "./algoritms/formules.js"; // Importa hechizos para obtener todos los datos y filtrar datos
import { listAlldata } from "./components/list.js";// Importa hechizo para listar todos los datos
import { addNewData } from "./algoritms/formules.js";// Importa hechizo para agregar nuevos datos
import { updateDateTime } from "./algoritms/formules.js";

export const taskList = document.querySelector('#task-list');// Encuentra el pergamino mágico que contiene la lista de tareas
export const taskSearchInput = document.querySelector('#task-search');// Encuentra el orbe mágico para buscar tareas
const addTaskBtn = document.querySelector('#add-task-btn');// Encuentra el botón para agregar nuevas tareas
const responsepage=document.querySelector('#response')// Encuentra la página de respuesta para comunicarse con los hechiceros
export const currentdatetime= document.querySelector('current-date-time')

//Este evento, conocido como DOMContentLoaded, se dispara cuando el pergamino mágico (documento HTML) ha sido completamente leído y 
// parseado por los hechiceros del navegador, pero antes de que todos los encantamientos adicionales (como imágenes y scripts externos) 
// se hayan cargado y ejecutado. Cuando se invoca este evento, el código dentro de la función asincrónica (async () => { ... }) espera 
// pacientemente, como un aprendiz de mago, a que todos los elementos esenciales estén listos antes de continuar con sus propios hechizos.
document.addEventListener('DOMContentLoaded', async () => { 
    
    updateDateTime();

    await new Promise(resolve => setTimeout(resolve, 1000));// Invoca el hechizo de retraso por un segundo para preparar la escena
    responsepage.style.display = 'none';// Desaparece la página de respuesta para revelar la magia entrante


        let data = await getAllData();// Invoca el hechizo para obtener todos los datos de las tareas
        listAlldata(data);// Lista todos los datos obtenidos en el pergamino de tareas

            // la función addEventListener permite que el orbe mágico de búsqueda (taskSearchInput) escuche el evento de entrada ('input'). Cuando 
            // el usuario ingresa texto en el orbe, se activa esta función asincrónica. El encantamiento (event) captura el valor de búsqueda del orbe, 
            // lo limpia de espacios innecesarios y lo convierte en minúsculas para una búsqueda insensible a mayúsculas. Luego, dependiendo de si hay 
            // texto de búsqueda (search.length > 0), se invoca el hechizo adecuado (getFilteredData o getAllData) para obtener datos filtrados o todos 
            // los datos de las tareas. Finalmente, los datos se listan en el pergamino mágico de tareas (taskList).        
            taskSearchInput.addEventListener('input', async (event) => {
                const search = event.target.value.trim().toLowerCase();// Extrae el encantamiento de búsqueda y lo convierte en minúsculas
                taskList.innerHTML = ''; // Borra la lista en el pergamino de tareas antes de actualizarla (taskList.innerHTML = '')
                // Si el hechizo de búsqueda tiene una longitud mayor que cero (search.length > 0),
                // significa que el orbe de búsqueda contiene texto para buscar.
                if (search.length > 0) {   
                    let data = await getFilteredData(search);// Invoca el hechizo para filtrar los datos según la búsqueda
                    listAlldata(data);// Lista los datos filtrados en el pergamino de tareas
                } else {
                    data = await getAllData();// Invoca nuevamente el hechizo 'getAllData' para obtener todos los datos de las tareas (await getAllData())
                    listAlldata(data);// Lista todos los datos obtenidos en el pergamino de tareas (listAlldata(data))
                }
            });
                addTaskBtn.addEventListener('click', async () => { // Al pulsar el botón mágico 'addTaskBtn', se activa una secuencia de hechizos para agregar una nueva tarea al pergamino mágico.
                    const newTask = taskSearchInput.value.trim();// Obtiene el texto de la nueva tarea del orbe de búsqueda (taskSearchInput.value.trim())
                    if (newTask) { //condicion para la nueva tarea
                        await addNewData(newTask);// Invoca el hechizo para agregar una nueva tarea al pergamino mágico (await addNewData(newTask))
                        taskSearchInput.value = '';// Limpia el orbe de búsqueda después de agregar la tarea (taskSearchInput.value = '')
                        const updatedData = await getAllData();// Invoca el hechizo para obtener todos los datos de las tareas actualizados (await getAllData())
                        taskList.innerHTML = '';// Limpia la lista de tareas en el pergamino mágico (taskList.innerHTML = '')
                        listAlldata(updatedData);// Lista nuevamente todos los datos de tareas actualizados en el pergamino mágico (listAlldata(updatedData))
                    }
                });

});

    