const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/pagos-recibidos', async (req, res) => {
  try {
    const response = await axios.get('https://www.flow.cl/api/payment/getPayments', {
      headers: {
        'Authorization': 'Bearer 5737EF2A-C228-4AA7-AAAE-8F69FC86LF19'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error al obtener los pagos recibidos:', error);
    res.status(500).json({ error: 'Error al obtener los pagos recibidos' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});