import express from 'express';

import api from './routes';

const app = express();

app.use('/api', api);

app.get('/*', function (req, res) {
  res.status(200).send('running');
});

export default app;
