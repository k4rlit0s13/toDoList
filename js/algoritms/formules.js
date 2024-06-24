// Importa la variable taskList desde main.js para acceder a la lista de tareas
import { taskList } from "../main.js";// Importa la variable mágica 'taskList' desde main.js para manipular la lista de tareas
import { listAlldata } from "../components/list.js";// Importa el hechizo 'listAlldata' desde list.js para renderizar los datos en la lista
import { currentdatetime } from "../main.js";

// Encantamiento para obtener todos los datos de las tareas desde la API
export const getAllData = async () => {// Crea un hechizo asincrónico llamado 'getAllData' para obtener todos los datos de las tareas
    const response = await fetch('https://6677385c145714a1bd742329.mockapi.io/task');// Lanza un hechizo para buscar el pergamino mágico (JSON) llamado 'data.json'
    const data = await response.json();// Espera la respuesta del hechizo; si todo va bien, obtiene el pergamino
    return data;// Entrega el contenido mágico del pergamino para que otros lo usen
};
// Hechizo para filtrar los datos de las tareas basado en una tarea específica
export const getFilteredData = async (task) => {// Crea un hechizo asincrónico llamado 'getFilteredData' que recibe una tarea como parámetro
    const response = await fetch('https://6677385c145714a1bd742329.mockapi.io/task');// Lanza un hechizo para buscar el pergamino mágico (JSON)
    const data = await response.json();// Espera la respuesta del hechizo y obtiene todos los datos de las tareas
    return data.filter(item => item.task.toLowerCase().includes(task.toLowerCase()));// Utiliza un hechizo de filtro para encontrar datos que contengan la tarea específica (toLowerCase())
};
// Hechizo para agregar una nueva tarea usando el método POST a la API
export const addNewData = async (newTask) => {// Crea un hechizo asincrónico llamado 'addNewData' que recibe una nueva tarea como parámetro
    const newData = {// Crea un nuevo hechizo llamado 'newData' que contiene la nueva tarea y el estado
        task: newTask,// Asigna la nueva tarea al hechizo 'newData'
        status: "On hold"// Establece el estado de la tarea como "On hold"
    };
    try {
        const response = await fetch('https://6677385c145714a1bd742329.mockapi.io/task', {// Lanza un hechizo para agregar una nueva tarea a la API
            method: 'POST',// Utiliza el método mágico 'POST' para añadir la nueva tarea
            headers: {
                'Content-Type': 'application/json'// Establece el tipo de contenido del hechizo como JSON
            },
            body: JSON.stringify(newData)// Convierte el hechizo 'newData' a un formato comprensible para la API (JSON.stringify())
        });
        if (!response.ok) {// Verifica si la respuesta del hechizo no es exitosa
            throw new Error(`Error al agregar nueva tarea: ${response.status} - ${response.statusText}`);// Lanza un hechizo de error con un mensaje específico
        }
        const updatedData = await response.json();// Espera la respuesta del hechizo y obtiene los datos actualizados
        listAlldata(updatedData);// Renderiza la lista actualizada usando el hechizo 'listAlldata'
    } catch (error) {// Captura cualquier error que ocurra durante el hechizo
        console.error(error);// Lanza un hechizo de consola para mostrar el error
    }
};

// Hechizo para actualizar el estado de una tarea específica usando el método PUT a la API
export const updateTaskStatus = async (taskId, newStatus) => {// Crea un hechizo asincrónico llamado 'updateTaskStatus' que recibe un ID de tarea y un nuevo estado como parámetros
    const currentTask = await fetch(`https://6677385c145714a1bd742329.mockapi.io/task/${taskId}`)// Lanza un hechizo para obtener la tarea actual con el ID proporcionado
        .then(response => {// Utiliza una promesa mágica para manejar la respuesta del hechizo
            if (!response.ok) {// Verifica si la respuesta del hechizo no es exitosa
                throw new Error(`No se encontró la tarea con ID ${taskId}`);// Lanza un hechizo de error si la tarea no se encuentra
            }
            return response.json();// Espera la respuesta del hechizo y convierte los datos mágicos a formato JSON
        });
    const updatedTask = {// Crea un nuevo hechizo llamado 'updatedTask' que contiene la tarea actualizada
        ...currentTask,// Utiliza el hechizo de expansión para copiar todos los atributos de la tarea actual
        status: newStatus// Actualiza el estado de la tarea con el nuevo estado proporcionado
    };
    const response = await fetch(`https://6677385c145714a1bd742329.mockapi.io/task/${taskId}`, {// Lanza un hechizo para actualizar la tarea con el ID proporcionado
        method: 'PUT',// Utiliza el método mágico 'PUT' para actualizar la tarea
        headers: {
            'Content-Type': 'application/json'// Establece el tipo de contenido del hechizo como JSON
        },
        body: JSON.stringify(updatedTask)// Convierte el hechizo 'updatedTask' a un formato comprensible para la API
    });
    if (!response.ok) {// Verifica si la respuesta del hechizo no es exitosa
        throw new Error(`Error al actualizar el estado de la tarea con ID ${taskId}: ${response.status} - ${response.statusText}`);// Lanza un hechizo de error con un mensaje específico
    }
    return updatedTask;// Retorna la tarea actualizada después de completar el hechizo
};

// Función asincrónica para eliminar un dato específico del JSON usando el método DELETE a la API
export const deleteData = async (data, taskId) => {// Crea una función asincrónica llamada 'deleteData' que recibe datos y un ID de tarea como parámetros
    try {
        const response = await fetch(`https://6677385c145714a1bd742329.mockapi.io/task/${taskId}`, {// Lanza un hechizo para eliminar la tarea con el ID proporcionado
            method: 'DELETE',// Utiliza el método mágico 'DELETE' para eliminar la tarea
            headers: {'Content-Type':'application/json'}// Establece el tipo de contenido del hechizo como JSON
        });
        if (response.ok) {// Verifica si la eliminación fue exitosa (código de respuesta 200)
            data = data.filter(item => item.id !== taskId);// Filtra los datos para mantener solo los elementos que no tienen el ID de tarea eliminado
            taskList.innerHTML = ''; // Limpia la lista de tareas en el DOM
            listAlldata(data);// Vuelve a renderizar la lista actualizada usando el hechizo 'listAlldata'
        } else {
            console.error(`Error al eliminar el dato con ID ${taskId}: ${response.status} - ${response.statusText}`);// Lanza un hechizo de consola con un mensaje de error específico
        }
    } catch (error) {// Captura cualquier error que ocurra durante el hechizo
        console.error(`Error al eliminar el dato con ID ${taskId}: ${error.message}`);// Lanza un hechizo de consola para mostrar el error
    }
};

// Hechizo para obtener la fecha y hora actuales
export const updateDateTime = () => {
    const now = new Date();// Formules invoca el poder del tiempo para capturar el momento actual
    const formattedDate = now.toLocaleDateString();//Transforma el momento capturado en una cadena mágica que representa la fecha en un formato legible
    const formattedTime = now.toLocaleTimeString();//Transforma el momento capturado en una cadena mágica que representa la hora en un formato legible
    document.getElementById('current-date-time').textContent = `${formattedDate} ${formattedTime}`;//Escribe el encantamiento de fecha y hora en el pergamino mágico del elemento con el id 'current-date-time'
};
document.addEventListener('DOMContentLoaded', (event) => {//Formules lanza un hechizo que se ejecutará cuando el pergamino del documento esté completamente cargado
    updateDateTime();// Invoca el hechizo para actualizar la fecha y hora inmediatamente después de cargar el pergamino
    setInterval(updateDateTime, 1000);// Configura un encantamiento para invocar el hechizo de actualización de fecha y hora cada 1000 milisegundos (1 segundo)
});


