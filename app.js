import express from 'express';
import { sequelize } from './src/config/database.js';
import dotenv from 'dotenv';

import './src/models/user.model.js';
import './src/models/task.model.js';

import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(userRoutes);
app.use(taskRoutes);

app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conectado a la base de datos MySQL con éxito.');

    await sequelize.sync();
    console.log('Modelos sincronizados correctamente.');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
};

startServer();
