// Función para cargar datos desde InfluxDB a través de Node-RED
async function loadData(filters = {}) {
    try {
        // Mostrar indicador de carga
        document.getElementById('dataTableBody').innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center;">
                    <div class="loader"></div> Cargando datos...
                </td>
            </tr>
        `;
        
        // Construir URL con parámetros de filtro
        const baseUrl = 'http://';
        const params = new URLSearchParams();
        
        if (filters.sensor && filters.sensor !== 'all') {
            params.append('sensor', filters.sensor);
        }
        
        if (filters.from) {
            params.append('from', filters.from);
        }
        
        if (filters.to) {
            params.appen
            ('to', filters.to);
        }
        
        const url = `${baseUrl}?${params.toString()}`;
        
        // Realizar la petición a la API
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        
        // Convertir la respuesta a JSON
        const data = await response.json();
        
        // Guardar los datos para uso posterior (por ejemplo, para descargar CSV)
        sensorData = data;
        
        // Actualizar la tabla con los datos
        updateDataTable(data);
        
        // Actualizar el gráfico
        updateChart(data);
        
        return data;
    } catch (error) {
        console.error('Error al cargar datos:', error);
        showNotification('Error al cargar los datos. Intenta de nuevo.', 'error');
        
        document.getElementById('dataTableBody').innerHTML = `
            <tr>
                <td colspan="4" style="text-align: center;">
                    Error al cargar datos. <button id="retryLoad" class="btn">Reintentar</button>
                </td>
            </tr>
        `;
        
        document.getElementById('retryLoad').addEventListener('click', () => loadData(filters));
        
        return [];
    }
}