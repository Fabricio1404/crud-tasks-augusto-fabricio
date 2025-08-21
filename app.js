import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './src/config/database.js';


import './src/models/user.model.js';
<<<<<<< HEAD
import './src/models/task.model.js';         
import './src/models/course.model.js';       
import './src/models/usercourse.model.js';   


import './src/models/associations.js';

// === Rutas ===
import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import courseRoutes from './src/routes/course.routes.js';           // <- NUEVO
import userCourseRoutes from './src/routes/usercourse.routes.js';   // <- NUEVO
=======
import './src/models/task.model.js';
import './src/models/course.model.js';
import './src/models/userCourse.model.js';
import './src/models/associations.js';

import userRoutes from './src/routes/user.routes.js';
import taskRoutes from './src/routes/task.routes.js';
import courseRoutes from './src/routes/course.routes.js';
import userCourseRoutes from './src/routes/userCourse.routes.js';  
>>>>>>> develop

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

<<<<<<< HEAD
// Montar rutas
app.use(userRoutes);
app.use(taskRoutes);
app.use(courseRoutes);
app.use(userCourseRoutes);
=======
// Rutas
app.use(userRoutes);
app.use(taskRoutes);
app.use(courseRoutes);
app.use(userCourseRoutes);   


app.get('/', (req, res) => {
  res.send('Servidor funcionando');
});
>>>>>>> develop

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
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();
