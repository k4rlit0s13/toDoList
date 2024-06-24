import { taskList } from "../main.js";
import { deleteData, updateTaskStatus } from "../algoritms/formules.js";

export const listAlldata = (data) => {
    if (!Array.isArray(data)) {
        data = [data]; // Convierte a array si no lo es para garantizar consistencia
    }
    
    taskList.innerHTML = ''; // Limpia el contenido actual de taskList

    // Separar datos por status
    const onHoldTasks = [];
    const readyTasks = [];

    data.forEach(task => {
        if (task.status === 'Ready') {
            readyTasks.push(task);
        } else {
            onHoldTasks.push(task);
        }
    });

    // Ordenar readyTasks al final de la lista
    const sortedData = [...onHoldTasks, ...readyTasks];

    sortedData.forEach(task => {
        const listItem = document.createElement('li');
        updateListItem(task, listItem);
        taskList.appendChild(listItem);
    });

    function updateListItem(task, listItem) {
        const spanStyle = task.status === 'Ready' ? 'text-decoration: line-through;' : '';
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

        const completeButton = listItem.querySelector('.complete-btn');
        completeButton.addEventListener('click', async () => {
            const taskId = completeButton.dataset.taskId;
            const currentStatus = task.status === 'On hold' ? 'Ready' : 'On hold';

            try {
                const updatedTask = await updateTaskStatus(taskId, currentStatus);
                // Actualizar el estado y reordenar la lista en tiempo real
                if (currentStatus === 'Ready') {
                    // Mover la tarea a la lista de readyTasks
                    const index = sortedData.findIndex(t => t.id === taskId);
                    sortedData.splice(index, 1); // Remover de la posición actual
                    sortedData.push(updatedTask); // Agregar al final de readyTasks
                } else {
                    // Mover la tarea de readyTasks a onHoldTasks
                    const index = sortedData.findIndex(t => t.id === taskId);
                    sortedData.splice(index, 1); // Remover de la posición actual
                    sortedData.unshift(updatedTask); // Agregar al inicio de onHoldTasks
                }

                taskList.innerHTML = ''; // Limpiar y volver a renderizar
                listAlldata(sortedData);

            } catch (error) {
                console.error(`Error al actualizar el estado de la tarea con ID ${taskId}: ${error.message}`);
            }
        });

        const deleteButton = listItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', () => {
            const taskId = deleteButton.dataset.taskId;
            deleteData(sortedData, taskId);
            taskList.innerHTML = '';
            listAlldata(sortedData);
        });
    }
};
