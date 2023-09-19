// app.js
const express = require("express");
const app = express();
const listViewRouter = require("./list-view-router"); // Rutas para listar tareas
const listEditRouter = require("./list-edit-router"); // Rutas para editar tareas

// Middleware para el manejo de JSON en las solicitudes
app.use(express.json());

// Ruta principal para listar todas las tareas
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Implementa los routers de list-view y list-edit
app.use("/list-view", listViewRouter);
app.use("/list-edit", listEditRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});

