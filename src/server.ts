import express from 'express';
import mintRoute from './routes/mintRoute';
import bodyParser from 'body-parser';
import { mongodbMiddleware } from './config/db';

const app = express();

app.use(mongodbMiddleware);
app.use(bodyParser.json()); 
app.use('/api', mintRoute);

app.get('/', (req, res) => {
  const message = {
    message: 'Hello World!',
  };
  res.send(message);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} url: http://localhost:${PORT}`);
});
