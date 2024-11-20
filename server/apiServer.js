// NOTE: this server is purely a dev-mode server. In production, the
// server/index.js server also serves the API routes.

// Configure process.env with .env.* files
require('./env').configureEnv();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require('./apiRouter');
const wellKnownRouter = require('./wellKnownRouter');
const  { H } = require('@highlight-run/node')
const radix = 10;
const PORT = parseInt(process.env.REACT_APP_DEV_API_SERVER_PORT, radix);
const app = express();

app.use(bodyParser.json());

// NOTE: CORS is only needed in this dev API server because it's
// running in a different port than the main app.
app.use(
  cors({
    origin: process.env.REACT_APP_CANONICAL_ROOT_URL,
    credentials: true,
  })
);
app.use(cookieParser());
app.use('/.well-known', wellKnownRouter);
app.use('/api', apiRouter);
app.post('/download-pdf', (req, res) => {
  const pdfData = req.body.pdfData; // Assuming pdfData contains the base64 encoded PDF

  // Convert base64 to buffer
  const pdfBuffer = Buffer.from(pdfData, 'base64');
  // Write buffer to a file
  fs.writeFile('downloaded.pdf', pdfBuffer, (err) => {
    if (err) {
      console.error('Error writing PDF file:', err);
      res.status(500).send('Error writing PDF file');
      return;
    }
    console.log('PDF file saved');
    res.send('PDF file saved');
  });
});

app.listen(PORT, () => {
  console.log(`API server listening on ${PORT}`);
});
