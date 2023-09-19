// list-view-router.js
const express = require("express");
const router = express.Router();

// Datos de ejemplo para tareas
const tasks = [
  {
    id: "1",
    isCompleted: false,
    description: "Ir al gimnasio",
  },
  {
    id: "2",
    isCompleted: true,
    description: "Comprar víveres",
  },
  // Agrega más tareas si es necesario
];

// Ruta para listar tareas completas
router.get("/completed", (req, res) => {
  const completedTasks = tasks.filter((task) => task.isCompleted);
  res.json(completedTasks);
});

// Ruta para listar tareas incompletas
router.get("/incomplete", (req, res) => {
  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  res.json(incompleteTasks);
});

module.exports = router;

