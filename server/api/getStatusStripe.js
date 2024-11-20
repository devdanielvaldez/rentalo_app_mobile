const fs = require('fs');
const path = require('path');

// Función para consultar el estado del pago
const getPaymentStatus = (paymentId) => {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, 'temp_payments', `${paymentId}.json`);

    // Verificar si el archivo existe
    fs.readFile(filePath, 'utf-8', (err, data) => {
      if (err) {
        return reject('Payment ID not found or file read error');
      }

      try {
        // Parsear el contenido del archivo JSON
        const paymentData = JSON.parse(data);
        resolve(paymentData); // Devolver los datos del pago
      } catch (error) {
        reject('Error parsing JSON data');
      }
    });
  });
};

module.exports = async (req, res) => {
    const { paymentId } = req.query;

    if (!paymentId) {
      return res.status(400).json({ error: 'Payment ID is required' });
    }
  
    try {
      const paymentData = await getPaymentStatus(paymentId);
      res.json(paymentData);
    } catch (error) {
      console.error('Error fetching payment status:', error);
      res.status(500).json({ error: error });
    }
}