// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type} show`;
    
    setTimeout(() => {
        notification.className = 'notification';
    }, 3000);
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Botón volver arriba
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Formulario de contacto
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulación de envío de formulario
    const formData = new FormData(this);
    const formValues = Object.fromEntries(formData.entries());
    
    // Aquí normalmente enviarías los datos a un servidor
    console.log('Datos del formulario:', formValues);
    
    // Simulamos una respuesta exitosa
    setTimeout(() => {
        showNotification('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    }, 1000);
});

// Formulario de suscripción
const subscribeForm = document.getElementById('subscribeForm');

subscribeForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulación de suscripción
    setTimeout(() => {
        showNotification('¡Te has suscrito correctamente!');
        subscribeForm.reset();
    }, 500);
});

// Cambiar URL del dashboard de Node-RED
document.getElementById('changeNodeRedUrl').addEventListener('click', function() {
    const newUrl = prompt('Introduce la URL del dashboard de Node-RED:', '');
    
    if (newUrl) {
        document.getElementById('nodeRedFrame').src = newUrl;
        showNotification('URL del dashboard actualizada correctamente.');
    }
});

// Inicializar la fecha actual en los campos de fecha
document.addEventListener('DOMContentLoaded', function() {
    // Establecer la fecha de hoy como valor predeterminado para dateFrom
    const today = new Date();
    const oneWeekAgo = new Date(today);
    oneWeekAgo.setDate(today.getDate() - 7);
    
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    
    const dateFromInput = document.getElementById('dateFrom');
    const dateToInput = document.getElementById('dateTo');
    
    if (dateFromInput) dateFromInput.value = formatDate(oneWeekAgo);
    if (dateToInput) dateToInput.value = formatDate(today);
    
    // Actualizar la última actualización
    document.getElementById('last-update').textContent = new Date().toLocaleString();
});

// Controles del panel de control
document.addEventListener('DOMContentLoaded', function() {
    // Sliders
    const sampleRateSlider = document.getElementById('sample-rate');
    const sampleRateValue = document.getElementById('sample-rate-value');
    const tempThresholdSlider = document.getElementById('temp-threshold');
    const tempThresholdValue = document.getElementById('temp-threshold-value');
    const humThresholdSlider = document.getElementById('hum-threshold');
    const humThresholdValue = document.getElementById('hum-threshold-value');
    
    if (sampleRateSlider && sampleRateValue) {
        sampleRateSlider.addEventListener('input', function() {
            sampleRateValue.textContent = this.value + ' segundos';
        });
    }
    
    if (tempThresholdSlider && tempThresholdValue) {
        tempThresholdSlider.addEventListener('input', function() {
            tempThresholdValue.textContent = this.value + ' °C';
        });
    }
    
    if (humThresholdSlider && humThresholdValue) {
        humThresholdSlider.addEventListener('input', function() {
            humThresholdValue.textContent = this.value + ' %';
        });
    }
    
    // Switches
    const switches = [
        { id: 'switch1', statusId: 'switch1Status', name: 'Bomba de Agua' },
        { id: 'switch2', statusId: 'switch2Status', name: 'Ventilación' },
        { id: 'switch3', statusId: 'switch3Status', name: 'Iluminación' },
        { id: 'switch4', statusId: 'switch4Status', name: 'Calefacción' }
    ];
    
    switches.forEach(sw => {
        const switchElement = document.getElementById(sw.id);
        const statusElement = document.getElementById(sw.statusId);
        
        if (switchElement && statusElement) {
            switchElement.addEventListener('change', function() {
                const status = this.checked ? 'Encendido' : 'Apagado';
                statusElement.textContent = `Estado: ${status}`;
                
                // Aquí normalmente enviarías el comando al dispositivo a través de Node-RED
                showNotification(`${sw.name} ${status.toLowerCase()}`);
            });
        }
    });
    
    // Botones de configuración
    const saveConfigBtn = document.getElementById('saveConfig');
    const resetConfigBtn = document.getElementById('resetConfig');
    
    if (saveConfigBtn) {
        saveConfigBtn.addEventListener('click', function() {
            // Aquí normalmente guardarías la configuración en la Raspberry Pi
            showNotification('Configuración guardada correctamente');
        });
    }
    
    if (resetConfigBtn) {
        resetConfigBtn.addEventListener('click', function() {
            // Restablecer valores predeterminados
            if (sampleRateSlider) sampleRateSlider.value = 30;
            if (sampleRateValue) sampleRateValue.textContent = '30 segundos';
            
            if (tempThresholdSlider) tempThresholdSlider.value = 25;
            if (tempThresholdValue) tempThresholdValue.textContent = '25 °C';
            
            if (humThresholdSlider) humThresholdSlider.value = 60;
            if (humThresholdValue) humThresholdValue.textContent = '60 %';
            
            showNotification('Configuración restablecida a valores predeterminados');
        });
    }
});

// Tabs de dashboard
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.dashboard-tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover clase active de todas las tabs y contenidos
            document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.dashboard-content').forEach(c => c.classList.remove('active'));
            
            // Agregar clase active a la tab seleccionada
            this.classList.add('active');
            
            // Mostrar el contenido correspondiente
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});