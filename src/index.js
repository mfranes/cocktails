const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server running in port : http://localhost:${PORT}`);
});

//conexion con la BD
async function getConnection() {
    //SE CREA LA CONEXION
    const conex = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    await conex.connect();
    console.log('conexion con la BD ' + conex.threadId);
    return conex;
}

// endpoint que busca todas los cocktails
app.get('/cocktails', async (req, res) => {
    try {
        const conn = await getConnection();
        const select = 'SELECT * FROM cocktails';
        const [result] = await conn.query(select);

        res.status(200).json({
            info: { count: result.length }, // número de elementos
            results: result, // listado
        });
        await conn.end();
    } catch (error) {
        res.status(400).json(error);
    }
});

// buscar un cocktail por id
app.get('/cocktails/:id', async (req, res) => {
    try {
        //const id  = req.params.id;
        const { id } = req.params;
        const conn = await getConnection();
        const select = 'select * from cocktails where id = ?';
        const [result] = await conn.query(select, [id]); // id lo obtuve del req.params

        if (result.length === 0) {
            res.status(400).json({ message: 'El id no existe en la BD' });
        } else {
            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});