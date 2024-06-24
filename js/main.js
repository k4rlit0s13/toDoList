// Importamos las funciones mágicas necesarias para obtener y mostrar los datos
import { getAllData } from "./algoritms/formules.js"; // Importamos la función para obtener todos los datos
import { listAlldata } from "./components/list.js"; // Importamos la función para listar todos los datos en la lista

export const taskList = document.querySelector('#task-list'); // Definimos el elemento mágico donde mostraremos la lista de tareas
const taskSearchInput =document.querySelector('#task-search')

document.addEventListener('DOMContentLoaded', async () => { // Cuando el hechizo de carga del documento está listo (DOMContentLoaded), ejecutamos nuestra magia
    let data = await getAllData(); // Merlin invoca el poder para obtener todos los datos disponibles
    listAlldata(data);// Utilizamos el conocimiento obtenido para listar todos los datos en la lista mágica




});
