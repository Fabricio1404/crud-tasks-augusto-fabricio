import express from 'express';
import { sequelize } from './src/config/database.js';
import dotenv from 'dotenv';


import './src/models/user.js';
import './src/models/task.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

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
