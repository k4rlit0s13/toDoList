// Importa la variable taskList desde main.js para acceder a la lista de tareas
import { taskList } from "../main.js";// Invoca el hechizo para obtener la lista de tareas desde main.js (import { taskList })
import { deleteData } from "../algoritms/formules.js";// Invoca el hechizo para eliminar datos desde formules.js (import { deleteData })
import { updateTaskStatus } from "../algoritms/formules.js";// Invoca el hechizo para actualizar el estado de la tarea desde formules.js (import { updateTaskStatus })

export const listAlldata = (data) => {
    if (!Array.isArray(data)) {
        data = [data]; // Convierte a array si no lo es para garantizar consistencia (data = [data])
    }
    taskList.innerHTML = '';// Prepara el pergamino para recibir nuevos elementos (taskList.innerHTML = '')

    data.forEach(task => {
        const listItem = document.createElement('li');// Crea un nuevo pergamino para cada tarea (document.createElement('li'))
        listItem.innerHTML = /*html*/ `
            <span>${task.task}</span>
            <div class="task-actions">
            <button class="complete-btn" data-task-id="${task.id}" data-task-status="${task.status}">${task.status}</button>
            <button class="delete-btn" data-task-id="${task.id}">Delete</button>
            </div>
        `;

        // Agrega evento de click al botón "Complete"
        const completeButton = listItem.querySelector('.complete-btn');// Encuentra el botón de completar en el pergamino (listItem.querySelector('.complete-btn'))
        completeButton.addEventListener('click', async () => {
            const taskId = completeButton.dataset.taskId; // Obtiene el ID de la tarea del botón (completeButton.dataset.taskId)
            let currentStatus = completeButton.dataset.taskStatus;// Obtiene el estado actual de la tarea (completeButton.dataset.taskStatus)

            if (currentStatus === 'On hold') {
                currentStatus = 'Ready';// Cambia el estado a "Ready" si está en "On hold" (currentStatus = 'Ready')
            } else {
                currentStatus = 'On hold';// Cambia el estado a "On hold" si está en "Ready" (currentStatus = 'On hold')
            }
            try {
                const updatedTask = await updateTaskStatus(taskId, currentStatus);// Invoca el hechizo para actualizar el estado en la API (await updateTaskStatus(taskId, currentStatus))
                completeButton.dataset.taskStatus = currentStatus;// Actualiza el estado en el botón (completeButton.dataset.taskStatus)
                completeButton.textContent = currentStatus;// Actualiza el texto del botón (completeButton.textContent)
            } catch (error) {
                console.error(`Error al actualizar el estado de la tarea con ID ${taskId}: ${error.message}`);// Lanza una advertencia si hay un error (console.error)
            }
        });

        // Agrega evento de click al botón "Delete"
        const deleteButton = listItem.querySelector('.delete-btn');// Encuentra el botón de eliminar en el pergamino (listItem.querySelector('.delete-btn'))
        deleteButton.addEventListener('click', () => {
            const taskId = deleteButton.dataset.taskId;// Obtiene el ID de la tarea a eliminar (deleteButton.dataset.taskId)
            deleteData(data, taskId);// Invoca el hechizo para eliminar la tarea del arreglo (deleteData(data, taskId))
            taskList.innerHTML = '';// Limpia la lista de tareas en el DOM (taskList.innerHTML = '')
            listAlldata(data);// Vuelve a renderizar la lista actualizada (listAlldata(data))
        });
        taskList.appendChild(listItem);// Adjunta el pergamino con la tarea a la lista principal (taskList.appendChild(listItem))
    });

};
