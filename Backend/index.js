import express from 'express';
import mongoose from 'mongoose';
import UrlModel from './models/MoUrl.js';
import path from 'path';
import { fileURLToPath } from 'url'; // Import fileURLToPath
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.URL_MONGO)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', 'ejs');
app.use('/styles', express.static(path.join(__dirname, '../frontend/styles')));


app.get('/', async (req, res) => {
  try {
      const shortUrls = await UrlModel.find();
      res.render('index', { shortUrls: shortUrls });
  } catch (error) {
      console.error('Error fetching short URLs:', error);
      res.status(500).send('Internal Server Error');
  }
});

app.post('/shortUrls', async (req, res) => {
  try {
      await UrlModel.create({ originalUrl: req.body.fullUrl });
      res.redirect('/');
  } catch (error) {
      res.status(500).send('Internal Server Error '+error);
  }
});

app.get('/:shortUrl', async (req, res) => {
  try {
      const shortUrl = await UrlModel.findOne({ shortUrl: req.params.shortUrl });
      if (!shortUrl) return res.sendStatus(404);
      res.redirect(shortUrl.originalUrl);
  } catch (error) {
      res.status(500).send('Internal Server Error '+error);
  }
});
