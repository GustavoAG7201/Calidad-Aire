const latitud = 27.4779;
const longitud = -99.5164;
const apiKey = '06670e9abb4c42b91819b6e7f0053eda';
const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitud}&lon=${longitud}&appid=${apiKey}`;

// Hacer la solicitud a la API
fetch(url)
    .then(response => response.json())
    .then(data => {
        const components = data.list[0].components;
        const airQualityIndex = data.list[0].main.aqi;

        // Obtener la categoría de calidad del aire
        const airQualityCategory = getAirQualityCategory(airQualityIndex);

        // Mostrar la categoría en el div
        const categoriaAireDiv = document.getElementById('categoriaAire');
        categoriaAireDiv.innerHTML = `Calidad del Aire Actual: <strong>${airQualityCategory}</strong>`;

        // Crear un gráfico de área polar
        const ctx = document.getElementById('chart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'polarArea',
            data: {
                labels: ['CO', 'NO', 'NO2', 'O3', 'SO2', 'PM2.5', 'PM10', 'NH3'],
                datasets: [{
                    label: 'Niveles de Calidad del Aire',
                    data: [
                        components.co,
                        components.no,
                        components.no2,
                        components.o3,
                        components.so2,
                        components.pm2_5,
                        components.pm10,
                        components.nh3
                    ],
                    backgroundColor: [
                        'rgba(148, 49, 38)', // CO
                        'rgba(99, 57, 116)', // NO
                        'rgba(0, 0, 255, 0.5)', // NO2
                        'rgba(17, 120, 100)', // O3
                        'rgba(128, 0, 128, 0.5) ', // SO2
                        'rgba(160, 64, 0)', // PM2.5
                        'rgba(183, 149, 11)', // PM10
                        'rgba(29, 131, 72)', // NH3
                    ],
                    borderColor: [
                        'rgba(255, 0, 0, 0.1)', // CO
                        'rgba(0, 128, 0, 0.1)', // NO
                        'rgba(0, 0, 255, 0.1)', // NO2
                        'rgba(255, 255, 0, 0.1)', // O3
                        'rgba(128, 0, 128, 0.1)', // SO2
                        'rgba(255, 165, 0, 0.1)', // PM2.5
                        'rgba(0, 255, 255, 0.1)', // PM10
                        'rgba(255, 192, 203, 0.1)', // NH3
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Niveles de Calidad del Aire'
                    },
                    legend: {
                        position: 'top',
                    },
                },
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 300,
                    }
                }
            },
        });
    })
    .catch(error => {
        console.error('Error al obtener datos:', error);
        const ctx = document.getElementById('chart').getContext('2d');
        ctx.font = "16px Arial";
        ctx.fillStyle = "red";
        ctx.fillText("Error al obtener datos de la API", 10, 50);
    });

// Función para categorizar la calidad del aire
function getAirQualityCategory(airQualityIndex) {
    let category;
    switch (airQualityIndex) {
        case 1:
            category = "Buena";
            break;
        case 2:
            category = "Moderada";
            break;
        case 3:
            category = "Regular";
            break;
        case 4:
            category = "Mala";
            break;
        case 5:
            category = "Muy Mala";
            break;
        default:
            category = "Desconocida";
    }
    return category;
}
