// Importa la variable taskList desde main.js para acceder a la lista de tareas
import { taskList } from "../main.js";
import { listAlldata } from "../components/list.js";


export const getAllData = async () => {
    const response = await fetch('https://6677385c145714a1bd742329.mockapi.io/task'); //formules lanza su encantamiento para buscar el pergamino mágico(json) llamado 'data.json'
    const data = await response.json();  // formules espera la respuesta del encantamiento; si todo va bien, obtiene el pergamino
    return data;// formules entrega el contenido mágico del pergamino para que otros lo usen
};

export const getFilteredData = async (task) => {
    const response = await fetch('https://6677385c145714a1bd742329.mockapi.io/task');
    const data = await response.json();
    return data.filter(item => item.task.toLowerCase().includes(task.toLowerCase()));
};


export const addNewData = async (newTask) => {
    const newData = {
        task: newTask,
        status: "On hold"
    };
    try {
        const response = await fetch('https://6677385c145714a1bd742329.mockapi.io/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        });
        if (!response.ok) {
            throw new Error(`Error al agregar nueva tarea: ${response.status} - ${response.statusText}`);
        }
        const updatedData = await response.json();
        listAlldata(updatedData); // Renderiza la lista actualizada
    } catch (error) {
        console.error(error);
    }
};


export const deleteData = async (data, taskId) => { // Función asincrónica para eliminar un dato específico del JSON
    try {
        const response = await fetch(`https://6677385c145714a1bd742329.mockapi.io/task/${taskId}`, { // Intenta eliminar el dato con el ID proporcionado
            method: 'DELETE',
            headers: {'Content-Type':'application/json'}
        });
        if (response.ok) {// Verifica si la eliminación fue exitosa (código de respuesta 200)
            data = data.filter(item => item.id !== taskId);// Filtra los datos para mantener solo los elementos que no tienen el ID de tarea eliminado
            taskList.innerHTML = ''; // Limpia la lista de tareas en el DOM
            listAlldata(data); // Vuelve a renderizar la lista actualizada
        } else {
            console.error(`Error al eliminar el dato con ID ${taskId}: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {console.error(`Error al eliminar el dato con ID ${taskId}: ${error.message}`);}
};


