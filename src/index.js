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

async function getConnection() {
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

app.get('/cocktails', async (req, res) => {
    try {
        const conn = await getConnection();

        const nombreFilterParams = req.query.nombre;
        console.log(nombreFilterParams);

        let selectCocktails = 'SELECT * FROM cocktails';

        if (nombreFilterParams) {
            selectCocktails += ' WHERE nombre like ?';
        }

        console.log(selectCocktails);
        const [result] = await conn.query(selectCocktails, ['%' + nombreFilterParams + '%']);

        res.status(200).json({
            info: { count: result.length }, 
            results: result, 
        });
        await conn.end();
    } catch (error) {
        res.status(400).json(error);
    }
});


app.get('/cocktails/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const conn = await getConnection();
        const select = 'select * from cocktails where id = ?';
        const [result] = await conn.query(select, [id]); 

        if (result.length === 0) {
            res.status(400).json({ message: 'El id no existe en la BD' });
        } else {
            res.status(200).json(result[0]);
        }
    } catch (error) {
        res.status(400).json(error);
    }
});


app.post('/cocktails', async (req, res) => {
    const conn = await getConnection();
    const { nombre, ingredientes, autor, precio } = req.body;

    const sqlInsert =
        'insert into cocktails (nombre, ingredientes, autor, precio) values(?,?,?,?)';
    const [nuevoCocktail] = await conn.query(sqlInsert, [
        nombre,
        ingredientes,
        autor,
        precio
    ]);
    res.status(200).json({
        success: true,
        id: nuevoCocktail.insertId, 
    });

    await conn.end();
});


app.put('/cocktails/:id', async (req, res) => {
    const conn = await getConnection();
    const idCocktail = req.params.id;
    const nuevaData = req.body;
    const modificarSql =
        'UPDATE cocktails SET nombre=?, ingredientes=?, autor=?, precio=? WHERE id = ?';
    const [result] = await conn.query(modificarSql, [
        nuevaData.nombre,
        nuevaData.ingredientes,
        nuevaData.autor,
        nuevaData.precio,
        idCocktail,
    ]);
    if (result.affectedRows > 0) {
        res.status(200).json({ success: true });
    } else {
        res.status(200).json({ success: false, message: 'No existe el id ' });
    }
    console.log(result);
});



app.delete('/cocktails/:id', async (req, res) => {
    const conn = await getConnection();
    const idCocktail = req.params.id;
    const deleteSql = 'delete from cocktails WHERE id = ?';
    const [result] = await conn.query(deleteSql, [idCocktail]);
    if (result.affectedRows > 0) {
        res.status(200).json({ success: true });
    } else {
        res.status(200).json({ success: false, message: 'No existe el id ' });
    }
    console.log(result);
});
