// Variables para los gráficos
let tempChart, humChart, pressureChart, combinedChart;
let tempGauge, humGauge;

// Datos simulados para los gráficos
const generateTimeLabels = (count) => {
    const labels = [];
    const now = new Date();
    
    for (let i = count - 1; i >= 0; i--) {
        const time = new Date(now);
        time.setMinutes(now.getMinutes() - i * 10);
        labels.push(time);
    }
    
    return labels;
};

const generateRandomData = (min, max, count) => {
    return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
};

// Inicializar dashboards
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    initGauges();
    
    // Actualizar datos cada 10 segundos
    setInterval(updateDashboardData, 10000);
    
    // Botón de actualización manual
    document.getElementById('refreshDashboard').addEventListener('click', function() {
        updateDashboardData();
        showNotification('Datos actualizados correctamente');
    });
});

// Inicializar gráficos
function initCharts() {
    const timeLabels = generateTimeLabels(12);
    
    // Gráfico de temperatura
    const tempCtx = document.getElementById('tempChart').getContext('2d');
    tempChart = new Chart(tempCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Temperatura (°C)',
                data: generateRandomData(20, 30, 12),
                borderColor: '#FF5722',
                backgroundColor: 'rgba(255, 87, 34, 0.1)',
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                },
                y: {
                    beginAtZero: false,
                    suggestedMin: 15,
                    suggestedMax: 35
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Gráfico de humedad
    const humCtx = document.getElementById('humChart').getContext('2d');
    humChart = new Chart(humCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Humedad (%)',
                data: generateRandomData(40, 70, 12),
                borderColor: '#2196F3',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                },
                y: {
                    beginAtZero: false,
                    suggestedMin: 30,
                    suggestedMax: 80
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Gráfico de presión
    const pressureCtx = document.getElementById('pressureChart').getContext('2d');
    pressureChart = new Chart(pressureCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [{
                label: 'Presión (hPa)',
                data: generateRandomData(1010, 1020, 12),
                borderColor: '#4CAF50',
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                tension: 0.4,
                pointRadius: 2,
                pointHoverRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    },
                    ticks: {
                        maxTicksLimit: 6
                    }
                },
                y: {
                    beginAtZero: false,
                    suggestedMin: 1000,
                    suggestedMax: 1030
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
    
    // Gráfico combinado
    const combinedCtx = document.getElementById('combinedChart').getContext('2d');
    combinedChart = new Chart(combinedCtx, {
        type: 'line',
        data: {
            labels: timeLabels,
            datasets: [
                {
                    label: 'Temperatura (°C)',
                    data: generateRandomData(20, 30, 12),
                    borderColor: '#FF5722',
                    backgroundColor: 'rgba(255, 87, 34, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Humedad (%)',
                    data: generateRandomData(40, 70, 12),
                    borderColor: '#2196F3',
                    backgroundColor: 'rgba(33, 150, 243, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y1'
                },
                {
                    label: 'Presión (hPa)',
                    data: generateRandomData(1010, 1020, 12),
                    borderColor: '#4CAF50',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    tension: 0.4,
                    yAxisID: 'y2',
                    hidden: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false
            },
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'minute',
                        displayFormats: {
                            minute: 'HH:mm'
                        }
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Temperatura (°C)'
                    },
                    suggestedMin: 15,
                    suggestedMax: 35
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Humedad (%)'
                    },
                    suggestedMin: 30,
                    suggestedMax: 80,
                    grid: {
                        drawOnChartArea: false
                    }
                },
                y2: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Presión (hPa)'
                    },
                    suggestedMin: 1000,
                    suggestedMax: 1030,
                    grid: {
                        drawOnChartArea: false
                    }
                }
            }
        }
    });
}

// Inicializar medidores
function initGauges() {
    // Medidor de temperatura
    const tempGaugeElement = document.getElementById('tempGauge');
    
    tempGauge = new Gauge(tempGaugeElement).setOptions({
        angle: 0,
        lineWidth: 0.3,
        radiusScale: 0.9,
        pointer: {
            length: 0.6,
            strokeWidth: 0.035,
            color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        colorStart: '#FF5722',
        colorStop: '#FF5722',
        strokeColor: '#E0E0E0',
        generateGradient: true,
        highDpiSupport: true,
        staticLabels: {
            font: "10px sans-serif",
            labels: [0, 10, 20, 30, 40, 50],
            color: "#000000",
            fractionDigits: 0
        },
        staticZones: [
            {strokeStyle: "#30B32D", min: 0, max: 15},
            {strokeStyle: "#FFDD00", min: 15, max: 25},
            {strokeStyle: "#F03E3E", min: 25, max: 50}
        ],
    });
    
    tempGauge.maxValue = 50;
    tempGauge.setMinValue(0);
    tempGauge.animationSpeed = 32;
    tempGauge.set(24.5);
    
    // Medidor de humedad
    const humGaugeElement = document.getElementById('humGauge');
    
    humGauge = new Gauge(humGaugeElement).setOptions({
        angle: 0,
        lineWidth: 0.3,
        radiusScale: 0.9,
        pointer: {
            length: 0.6,
            strokeWidth: 0.035,
            color: '#000000'
        },
        limitMax: false,
        limitMin: false,
        colorStart: '#2196F3',
        colorStop: '#2196F3',
        strokeColor: '#E0E0E0',
        generateGradient: true,
        highDpiSupport: true,
        staticLabels: {
            font: "10px sans-serif",
            labels: [0, 20, 40, 60, 80, 100],
            color: "#000000",
            fractionDigits: 0
        },
        staticZones: [
            {strokeStyle: "#F03E3E", min: 0, max: 30},
            {strokeStyle: "#FFDD00", min: 30, max: 50},
            {strokeStyle: "#30B32D", min: 50, max: 70},
            {strokeStyle: "#FFDD00", min: 70, max: 85},
            {strokeStyle: "#F03E3E", min: 85, max: 100}
        ],
    });
    
    humGauge.maxValue = 100;
    humGauge.setMinValue(0);
    humGauge.animationSpeed = 32;
    humGauge.set(58);
}

// Actualizar datos del dashboard
function updateDashboardData() {
    // Simular nuevos datos
    const newTemp = Math.random() * 10 + 20; // Entre 20 y 30
    const newHum = Math.random() * 30 + 40; // Entre 40 y 70
    const newPressure = Math.random() * 10 + 1010; // Entre 1010 y 1020
    
    // Actualizar valores mostrados
    document.getElementById('temp-value').textContent = newTemp.toFixed(1) + ' °C';
    document.getElementById('hum-value').textContent = Math.round(newHum) + ' %';
    document.getElementById('press-value').textContent = newPressure.toFixed(1) + ' hPa';
    
    // Actualizar estado del sistema
    document.getElementById('cpu-usage').textContent = Math.round(Math.random() * 50 + 20) + '%';
    document.getElementById('mem-usage').textContent = (Math.random() * 2 + 0.5).toFixed(1) + ' GB / 4 GB';
    document.getElementById('storage-usage').textContent = Math.round(Math.random() * 10 + 10) + ' GB / 32 GB';
    document.getElementById('last-update').textContent = new Date().toLocaleString();
    
    // Actualizar indicadores de estado
    updateStatusIndicator('temp-status', newTemp, 25, 30);
    updateStatusIndicator('hum-status', newHum, 60, 80);
    updateStatusIndicator('press-status', newPressure, 1015, 1020);
    
    // Actualizar gráficos
    updateCharts(newTemp, newHum, newPressure);
    
    // Actualizar medidores
    tempGauge.set(newTemp);
    humGauge.set(newHum);
}

// Actualizar indicadores de estado
function updateStatusIndicator(id, value, warningThreshold, alertThreshold) {
    const indicator = document.getElementById(id);
    
    if (value < warningThreshold) {
        indicator.className = 'status-indicator status-normal';
    } else if (value < alertThreshold) {
        indicator.className = 'status-indicator status-warning';
    } else {
        indicator.className = 'status-indicator status-alert';
    }
}

// Actualizar gráficos
function updateCharts(newTemp, newHum, newPressure) {
    // Obtener la hora actual
    const now = new Date();
    
    // Actualizar gráfico de temperatura
    tempChart.data.labels.push(now);
    tempChart.data.labels.shift();
    tempChart.data.datasets[0].data.push(newTemp);
    tempChart.data.datasets[0].data.shift();
    tempChart.update();
    
    // Actualizar gráfico de humedad
    humChart.data.labels.push(now);
    humChart.data.labels.shift();
    humChart.data.datasets[0].data.push(newHum);
    humChart.data.datasets[0].data.shift();
    humChart.update();
    
    // Actualizar gráfico de presión
    pressureChart.data.labels.push(now);
    pressureChart.data.labels.shift();
    pressureChart.data.datasets[0].data.push(newPressure);
    pressureChart.data.datasets[0].data.shift();
    pressureChart.update();
    
    // Actualizar gráfico combinado
    combinedChart.data.labels.push(now);
    combinedChart.data.labels.shift();
    combinedChart.data.datasets[0].data.push(newTemp);
    combinedChart.data.datasets[0].data.shift();
    combinedChart.data.datasets[1].data.push(newHum);
    combinedChart.data.datasets[1].data.shift();
    combinedChart.data.datasets[2].data.push(newPressure);
    combinedChart.data.datasets[2].data.shift();
    combinedChart.update();
}