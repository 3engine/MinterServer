import express from 'express';
import mintRoute from './routes/mintRoute';

const app = express();

app.use(express.json());
app.use('/api', mintRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
