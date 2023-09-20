const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const app = express();

dotenv.config();


const users = [
  {
    username: "usuario1",
    password: "contrasena1",
  },
  {
    username: "usuario2",
    password: "contrasena2",
  },
];

app.use(express.json());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ token });
});

function authenticateToken(req, res, next) {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Token de autorización no proporcionado" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token no válido" });
    }
    req.user = user;
    next();
  });
}

app.get("/protegida", authenticateToken, (req, res) => {
  res.json({ message: "Ruta protegida. Usuario autenticado: " + req.user.username });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor Express en funcionamiento en el puerto ${port}`);
});
