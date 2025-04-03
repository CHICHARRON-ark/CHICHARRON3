require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta para obtener datos de enfermedades de México (información filtrada)
app.get('/api/salud', async (req, res) => {
    try {
        // Hacer la solicitud solo para México
        const response = await axios.get('https://disease.sh/v3/covid-19/countries/Mexico');
        
        // Filtrar y devolver solo la información necesaria
        const data = {
            cases: response.data.cases,
            todayCases: response.data.todayCases,
            deaths: response.data.deaths,
            todayDeaths: response.data.todayDeaths,
            recovered: response.data.recovered,
            todayRecovered: response.data.todayRecovered,
            active: response.data.active,
            critical: response.data.critical,
            casesPerOneMillion: response.data.casesPerOneMillion,
            deathsPerOneMillion: response.data.deathsPerOneMillion,
            tests: response.data.tests,
            testsPerOneMillion: response.data.testsPerOneMillion,
            population: response.data.population,
        };

        // Devolver la respuesta con la información filtrada
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los datos' });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
