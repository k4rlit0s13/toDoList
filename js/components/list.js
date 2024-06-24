// Importa la variable taskList desde main.js para acceder a la lista de tareas
import { taskList } from "../main.js";
import { deleteData } from "../algoritms/formules.js";
import { updateTaskStatus } from "../algoritms/formules.js";

export const listAlldata = (data) => {
    if (!Array.isArray(data)) {
        data = [data]; // Convertir a array si no lo es
    }

    taskList.innerHTML = ''; // Limpiar la lista antes de agregar elementos

    data.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = /*html*/ `
            <span>${task.task}</span>
            <div class="task-actions">
            <button class="complete-btn" data-task-id="${task.id}" data-task-status="${task.status}">${task.status}</button>
            <button class="delete-btn" data-task-id="${task.id}">Delete</button>
            </div>
        `;

        // Agregar evento de click al botón "Complete"
        const completeButton = listItem.querySelector('.complete-btn');
        completeButton.addEventListener('click', async () => {
            const taskId = completeButton.dataset.taskId; // Obtener el ID de la tarea
            let currentStatus = completeButton.dataset.taskStatus; // Obtener el estado actual de la tarea

            if (currentStatus === 'On hold') {
                currentStatus = 'Ready'; // Cambiar el estado a "Ready" si está en "On hold"
            } else {
                currentStatus = 'On hold'; // Cambiar el estado a "On hold" si está en "Ready"
            }
            try {
                const updatedTask = await updateTaskStatus(taskId, currentStatus); // Actualizar estado en la API
                completeButton.dataset.taskStatus = currentStatus; // Actualizar el estado en el botón
                completeButton.textContent = currentStatus; // Actualizar texto del botón
            } catch (error) {
                console.error(`Error al actualizar el estado de la tarea con ID ${taskId}: ${error.message}`);
            }
        });

        // Agregar evento de click al botón "Delete"
        const deleteButton = listItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            const taskId = deleteButton.dataset.taskId; // Obtener el ID de la tarea a eliminar
            deleteData(data, taskId); // Llamar a la función deleteData para eliminar la tarea del arreglo
            taskList.innerHTML = ''; // Limpiar la lista de tareas en el DOM
            listAlldata(data); // Volver a renderizar la lista actualizada
        });

        taskList.appendChild(listItem);
    });

};
