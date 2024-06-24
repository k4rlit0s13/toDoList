import { taskList } from "../main.js";// Importa la variable taskList desde main.js para acceder a la lista de tareas
import { deleteData, updateTaskStatus } from "../algoritms/formules.js";// Importa las funciones de eliminación y actualización desde formules.js

export const listAlldata = (data) => { // Define una función mágica llamada listAlldata que recibe datos para mostrar
    if (!Array.isArray(data)) {// Verifica si los datos no son un array
        data = [data];// Convierte los datos en un array para mantener la consistencia mágica
    }
    
    taskList.innerHTML = '';// Borra el contenido actual de taskList en el pergamino mágico

    // Prepara recipientes para las tareas separadas por su estado mágico
    const onHoldTasks = [];// Crea un cofre para tareas en espera
    const readyTasks = [];// Crea un cofre para tareas listas

    data.forEach(task => {// Por cada tarea en los datos recibidos
        if (task.status === 'Ready') {// Si la tarea está lista
            readyTasks.push(task);// Guarda la tarea en el cofre de tareas listas
        } else { // De lo contrario
            onHoldTasks.push(task);// Guarda la tarea en el cofre de tareas en espera
        }
    });

    // El código crea una lista visual de tareas ordenadas y organizadas mágicamente. Primero, combina las tareas en espera 
    // y listas en un conjunto ordenado llamado sortedData. Luego, por cada tarea en este conjunto, crea un nuevo pergamino 
    // mágico (<li>) y lo actualiza con la información de la tarea usando updateListItem(). Finalmente, añade cada pergamino 
    // mágico a la lista de tareas taskList para mostrarlas visualmente.
    const sortedData = [...onHoldTasks, ...readyTasks];// Prepara una combinación mágica de tareas en espera y listas

    sortedData.forEach(task => {// Por cada tarea en la lista mágicamente combinada
        const listItem = document.createElement('li');// Crea un nuevo pergamino mágico para la tarea
        updateListItem(task, listItem);// Actualiza el pergamino mágico con la información de la tarea
        taskList.appendChild(listItem);// Adjunta el pergamino mágico a la lista de tareas
    });


        function updateListItem(task, listItem) {// Aquí comienza la función encantada para actualizar un pergamino mágico con información de tarea
            const spanStyle = task.status === 'Ready' ? 'text-decoration: line-through;' : '';// Preparando el estilo del hechizo según el estado de la tarea
            listItem.innerHTML = `
                <div class="task-text">                                                   
                    <span style="${spanStyle}">${task.task}</span>                        
                </div>                                                                    
                <div class="task-actions">                                                
                    <button class="complete-btn ${task.status === 'Ready' ? 'ready' : 'on-hold'}" 
                        data-task-id="${task.id}" data-task-status="${task.status}">
                        ${task.status}
                    </button>
                    <button class="delete-btn" data-task-id="${task.id}">Delete</button>
                </div>
            `;

                // EXPLICACION "updateListItem":
                    // listItem.innerHTML = `
                    // <div class="task-text">                                                                  // Crea una sección en el pergamino mágico para el texto de la tarea
                    //     <span style="${spanStyle}">${task.task}</span>                                       // Escribe el texto de la tarea en la sección, aplicando el estilo preparado
                    // </div>
                    // <div class="task-actions">                                                               // Prepara una sección para las acciones mágicas de la tarea
                    //     <button class="complete-btn ${task.status === 'Ready' ? 'ready' : 'on-hold'}"        // Crea un botón encantado para completar la tarea, con clases según el estado de la tarea
                    //         data-task-id="${task.id}" data-task-status="${task.status}">                     // Coloca atributos mágicos en el botón para identificar la tarea
                    //         ${task.status}                                                                   // Escribe el estado actual de la tarea en el botón
                    //     </button>
                    //     <button class="delete-btn" data-task-id="${task.id}">Delete</button>                 // Crea un botón mágico para eliminar la tarea, con atributo para identificación
                    // </div>


                    const completeButton = listItem.querySelector('.complete-btn');//invoca su hechizo para encontrar el botón mágico de completar dentro del pergamino
                    completeButton.addEventListener('click', async () => {// list añade un evento mágico al botón para escuchar el clic y actuar en consecuencia
                        const taskId = completeButton.dataset.taskId;// Extrae el ID de la tarea del atributo mágico del botón
                        const currentStatus = task.status === 'On hold' ? 'Ready' : 'On hold';// Determina el estado actual de la tarea para actualizarlo

                        try {
                            const updatedTask = await updateTaskStatus(taskId, currentStatus);// list espera la actualización del estado de la tarea mediante otro hechizo
                            // Actualizar el estado y reordenar la lista en tiempo real
                            if (currentStatus === 'Ready') {// Si la tarea es Ready
                                const index = sortedData.findIndex(t => t.id === taskId);// Encuentra la posición de la tarea en la lista de datos ordenados
                                sortedData.splice(index, 1);// Remueve la tarea de su posición actual
                                sortedData.push(updatedTask);// Agrega la tarea actualizada al final de readyTasks
                            } else {// Si la tarea está en espera
                                // Mover la tarea de readyTasks a onHoldTasks
                                const index = sortedData.findIndex(t => t.id === taskId);// Encuentra la posición de la tarea en la lista de datos ordenados
                                sortedData.splice(index, 1);// Remueve la tarea de su posición actual
                                sortedData.unshift(updatedTask);// Agrega la tarea actualizada al inicio de onHoldTasks
                            }

                            taskList.innerHTML = '';// Limpia y prepara el pergamino para ser nuevamente escrito
                            listAlldata(sortedData);// Vuelve a escribir los datos ordenados en el pergamino

                                } catch (error) {
                                    console.error(`Error al actualizar el estado de la tarea con ID ${taskId}: ${error.message}`);// En caso de error, Formules registra el problema
                                }
                    });


                    const deleteButton = listItem.querySelector('.delete-btn');// Formules invoca su hechizo para encontrar el botón mágico de eliminación dentro del pergamino
                    deleteButton.addEventListener('click', () => {// Formules añade un evento mágico al botón para escuchar el clic y actuar en consecuencia
                        const taskId = deleteButton.dataset.taskId;// Extrae el ID de la tarea del atributo mágico del botón
                        deleteData(sortedData, taskId);// Invoca el hechizo de eliminación, eliminando la tarea con el ID proporcionado de los datos ordenados
                        taskList.innerHTML = '';// Limpia y prepara el pergamino para ser nuevamente escrito
                        listAlldata(sortedData);// Vuelve a escribir los datos ordenados en el pergamino
            });
        }
};
