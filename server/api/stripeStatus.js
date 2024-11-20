const fs = require('fs');
const path = require('path');

const updatePaymentStatus = (paymentId, newStatus) => {
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

        // Actualizar el estado
        paymentData.status = newStatus;

        // Escribir los cambios de nuevo en el archivo
        fs.writeFile(filePath, JSON.stringify(paymentData, null, 2), (err) => {
          if (err) {
            return reject('Error updating payment status');
          }

          resolve(paymentData); // Devolver los datos actualizados
        });
      } catch (error) {
        reject('Error parsing JSON data');
      }
    });
  });
};

module.exports = async(req, res) => {
    const { paymentId, status } = req.query;

    if (!paymentId || !status) {
      return res.status(400).json({ error: 'Payment ID and status are required' });
    }
  
    if (!['success', 'cancel'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status. Must be "success" or "cancel"' });
    }
  
    try {
      const updatedPayment = await updatePaymentStatus(paymentId, status);
      res.send(`
        <html>
          <head>
            <title>Espere...</title>
            <meta http-equiv="refresh" content="5; url=${process.env.REACT_APP_CANONICAL_ROOT_URL}">
          </head>
          <body>
            <p>Por favor espere...</p>
            <script>
              setTimeout(() => {
                window.close();
              }, 3000);
            </script>
          </body>
        </html>
      `);
    } catch (error) {
      console.error('Error updating payment status:', error);
      res.status(500).json({ error: error });
    }
}
