// list-edit-router.js
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

// Ruta para crear una nueva tarea (POST)
router.post("/create", (req, res) => {
  const newTask = req.body; // Suponiendo que el cuerpo de la solicitud contiene los datos de la nueva tarea
  tasks.push(newTask);
  res.json(newTask);
});

// Ruta para eliminar una tarea por ID (DELETE)
router.delete("/delete/:id", (req, res) => {
  const taskId = req.params.id;
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    const deletedTask = tasks.splice(index, 1);
    res.json(deletedTask);
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
});

// Ruta para actualizar una tarea por ID (PUT)
router.put("/update/:id", (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body; // Suponiendo que el cuerpo de la solicitud contiene los datos actualizados
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTaskData };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
});

module.exports = router;

