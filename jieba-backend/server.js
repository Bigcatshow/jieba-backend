import express from 'express';
import cors from 'cors';
import { Jieba } from '@node-rs/jieba';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Needed to get __dirname in ES module style
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from "public" directory
app.use(express.static(path.join(__dirname, 'public')));

const jieba = new Jieba();

app.get('/', (req, res) => {
  res.send('Jieba backend is running!');
});

app.post('/segment', (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: 'No text provided' });
  }
  const result = jieba.cut(text);
  res.json({ segments: result });
});

app.listen(port, () => {
  console.log(`Jieba API running on port ${port}`);
});
