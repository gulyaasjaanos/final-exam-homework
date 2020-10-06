import express from 'express';
import path from 'path';

import api from './routes';

const app = express();

app.use(express.static(path.join(__dirname, 'static/')));
app.use('/api', api);

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'static/index.html'));
});

export default app;
