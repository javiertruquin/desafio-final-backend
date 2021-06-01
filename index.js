// Importación de módulos de versiones anteriores
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cors = require("cors");
const usuarioRoute = require("./routes/usuarioRoute");
const productoRoute = require("./routes/productoRoute");
const authRoute = require('./routes/authRoute');

// Conectar a mongodb
// mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
    .then(() => console.log("Conectado a mongo DB"))
    .catch((err) => console.log("No se conecto a la DB", err));

// crear el servidor
const app = express();

app.use(cors());

// Habilitar express.json
app.use(express.json({ extended: true }));
app.use(express.urlencoded());

// Configurar logs de morgan
app.use(morgan("tiny"));

//importar rutas
app.use("/api/usuarios", usuarioRoute);
app.use("/api/productos", productoRoute);
app.use("/api/auth", authRoute);

// puerto y arranque del servidor
app.listen(4000, () => {
    console.log("Servidor Funcionando");
});
