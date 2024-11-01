//criação dos CRUD de tarefas.

const express = require('express');
const router = express.Router();
const db = require ('../db');

//Vamos listar todas as tarefas
router.get('/', (req, res) => {
    db.all("SELECT * FROM tasks", [], (err, rows) => {
        if (err) return res.status(400).json({ error: err.message });
        res.json({ data: rows });
    });
});

// Agora adicionar nova tarefa
router.post('/', (req, res) => {
    const { title, description, completed } = req.body;
    db.run(`INSERT INTO tasks (title, description, completed) VALUE (?, ?, ?)`,
        [title, description, completed || 0],
        function (err) {
            if (err) return res.status(400).json({ error: err.message });
            res.json({ id: this.lastID });
        });
});

module.exports = router;