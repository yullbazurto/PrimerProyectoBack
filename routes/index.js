const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/', function (req, res) {
  res.render('index', { title: 'Inicio' });
});

router.get('/photos', async function (req, res) {
  const URL = 'https://dawm-fiec-espol-default-rtdb.firebaseio.com/photos.json';

  try {
    const response = await axios.get(URL);

    const data = response.data || {}; // evita error si está vacío

    const fotos = Object.keys(data).map(key => ({
      ...data[key],
      id: key
    }));

    // 🔥 AQUÍ es donde estás pasando 'fotos' a la vista 'fotos.ejs'
    res.render('fotos', {
      title: 'Fotos',
      fotos: fotos // 👈 esto es lo que estabas olvidando antes
    });

  } catch (error) {
    console.error('Error al obtener fotos:', error.message);
    res.render('fotos', {
      title: 'Fotos',
      fotos: [] // ✅ aun si falla, definimos fotos
    });
  }
});

module.exports = router;
