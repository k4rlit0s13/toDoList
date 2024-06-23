

const taskList = document.querySelector('#task-list');




// El mago Merlin se prepara para realizar su hechizo mágico cuando el documento está listo
document.addEventListener('DOMContentLoaded', async function() {
    try {
        // Merlin lanza su encantamiento para buscar el pergamino mágico llamado 'data.json'
        const response = await fetch('data.json');
        
        // Si el encantamiento no tiene éxito, Merlin lanza una excepción
        if (!response.ok) {throw new Error('Failed to get the data');}

        // Merlin convierte el pergamino recibido a un formato entendible (JSON)
        const data = await response.json();

        // Merlin muestra el contenido mágico del pergamino en la consola
        console.log(data); 

        // Merlin recorre cada tarea en el pergamino y las inserta en la lista mágica
        data.forEach(task => {
            // Creamos un elemento <li> para cada tarea
            const listItem = document.createElement('li');
            
            // Creamos una plantilla HTML con el título de la tarea y botones para cambiar el estado y eliminar
            listItem.innerHTML = `
                <span>${task.task}</span>
                <div class="task-actions">
                    <button class="complete-btn">${task.status === 'ready' ? 'Uncomplete' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
            
            // Insertamos el elemento <li> en el <ul> de tareas
            taskList.appendChild(listItem);
        });

























        
    } catch (error) {
        // Si algo sale mal, Merlin invoca un conjuro de error y lo muestra en la consola
        console.error('Error fetching data:', error.message);
    }
});


