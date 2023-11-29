const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const itemController = require('./controllers/itemController');
const multer = require('multer');
const path = require('path');



const app = express();
const port = 3000;


// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());


// Conexión a la base de datos de MongoDB
mongoose.connect('mongodb://0.0.0.0:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conexión exitosa a MongoDB');
    })
    .catch((error) => {
        console.log('Error al conectar a MongoDB:', error);
    });

// Configuración de multer para la carga de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directorio donde se guardarán las imágenes
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Renombrar el archivo para evitar duplicados
    }
});

const upload = multer({ storage: storage });

// Definir rutas para CRUD
app.get('/api/items', itemController.getItems);
app.get('/api/items/:id', itemController.getItemById);
app.post('/api/items', itemController.createItem);
app.put('/api/items/:id', itemController.updateItem);
app.delete('/api/items/:id', itemController.deleteItem);

// Ruta para cargar imágenes
app.post('/api/upload', upload.single('image'), (req, res) => {
    // Aquí puedes guardar la URL de la imagen en tu base de datos
    const imageUrl = 'http://localhost:3000/uploads/' + req.file.filename; // Cambia la URL según tu configuración
    res.json({ imageUrl });
});

// Ruta para servir las imágenes
app.use('/uploads', express.static('uploads'));


// Iniciar el servidor
app.listen(port, () => {
    console.log('Servidor backend en funcionamiento en el puerto', port);
});
