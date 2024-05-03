const express = require('express');
const app = express();
const PORT = 3000; // puede cambiar

//array 
let librosBiblicos = [
    {id: 1 , nombre: 'Genesis', autor: 'Moises'},
    {id: 2 , nombre: 'Exodo', autor: 'Moises'},
    {id: 3 , nombre: 'Levitico', autor: 'Moises'},
];
//manejo de JSON
app.use(express.json());
//endpoint 1 obtener todos los libros 
app.get('/libros',(req,res)=>{ //peticion de un recurso para ver los libros tambien emviando 2 parametros  request y response envia la peticion y responde 
    res.json(librosBiblicos);//json es un foramto de documento 
}); 

//endpoint 2 obtener los libros por ID 
app.get('/libros/:id',(req, res) => {
    const idCapturado = parseInt(req.params.id);
    console.log(idCapturado);
    const libroEncontrado = librosBiblicos.find((libro) => libro.id === idCapturado);
    if (libroEncontrado) {
        res.json(libroEncontrado);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});

//edpoint 3 agregar un libro 
app.post('/agregar-libro',(req, res) => {
    const nuevoLibro = req.body;
    console.log(nuevoLibro);
    librosBiblicos.push(nuevoLibro);
    res.status(201).json('este libro fue guardado exitosamente');
});

//edpoint 4 actualizar un libro
app.put('/actualizar-libro/:id', (req, res) => {
    const idCapturado = parseInt(req.params.id);
    const indexLibroLocalizado = librosBiblicos.findIndex((libro) => libro.id === idCapturado);
    console.log(indexLibroLocalizado)
    if (indexLibroLocalizado !== -1 ){
        librosBiblicos[indexLibroLocalizado] = req.body;
        res.json(librosBiblicos[indexLibroLocalizado]);
    } else {
        res.status(404).json({mensaje : 'Libro no encontrado'});
    }
});



app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto http://localhost:" + PORT);
});