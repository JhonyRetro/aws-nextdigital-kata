const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static('public')); 

const pool = new Pool({
    user: 'RDS_USER',
    host: 'AWS_ENDPOINT', 
    database: 'postgres',
    password: 'POSTGRESS_PASSWD',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get('/api/cards', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM balatro_jokers');
        res.json(result.rows);
    } catch (err) {
        console.error('Error ejecutando la query', err.stack);
        res.status(500).send('Error interno del servidor al conectar con la base de datos');
    }
});

app.listen(port, () => {
    console.log(`Servidor de Balatro corriendo en http://localhost:${port}`);
});
