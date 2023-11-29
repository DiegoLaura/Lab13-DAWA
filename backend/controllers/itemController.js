const Game = require('../models/item');


// Obtener todos los elementos
exports.getItems = (req, res) => {
    Game.find()
        .then((items) => {
            res.json(items);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};


// Obtener un elemento por su ID
exports.getItemById = (req, res) => {
    Game.findById(req.params.id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json(item);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Crear un nuevo elemento
exports.createItem = (req, res) => {
    const newGame = new Game({
        title: req.body.title,
        developer: req.body.developer,
        releaseYear: req.body.releaseYear,
        genre: req.body.genre,
        platform: req.body.platform,
        rating: req.body.rating,
        imageUrl: req.body.imageUrl
    });
    newGame.save()
        .then(game => res.status(201).json(game))
        .catch(error => res.status(500).json({ error: error.message }));
};


// Actualizar un elemento existente
exports.updateItem = (req, res) => {
    Game.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json(item);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Eliminar un elemento existente
exports.deleteItem = (req, res) => {
    Game.findByIdAndDelete(req.params.id)
        .then((item) => {
            if (!item) {
                return res.status(404).json({ message: 'Elemento no encontrado' });
            }
            res.json({ message: 'Elemento eliminado correctamente' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Controlador para cargar una imagen
exports.uploadImage = (req, res) => {
    const imageUrl = req.body.imageUrl; // Obtén la URL de la imagen desde la solicitud
    // Guarda la URL de la imagen en la base de datos, asociándola al elemento correspondiente
    // Resto de la lógica para guardar la URL en la base de datos
    res.json({ message: 'Imagen cargada exitosamente', imageUrl: imageUrl });
};
