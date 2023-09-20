const express = require("express");
const router = express.Router();
const { validateTaskData } = require("./list-edit-middleware"); 

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
];

router.post("/create", validateTaskData, (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.json(newTask);
});

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

router.put("/update/:id", validateTaskData, (req, res) => {
  const taskId = req.params.id;
  const updatedTaskData = req.body;
  const index = tasks.findIndex((task) => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...updatedTaskData };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ message: "Tarea no encontrada" });
  }
});

module.exports = router;

