import express from 'express';
import cors from 'cors';
import { Jieba } from '@node-rs/jieba';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// NEW /search route
app.post('/search', (req, res) => {
  const { query } = req.body;
  if (!query) {
    return res.status(400).json({ error: 'No query provided' });
  }

  // Segment the query text
  const segments = jieba.cut(query);

  // TODO: Replace with your real search implementation here,
  // for now just return the segments as dummy "search results"
  res.json({ results: segments });
});

app.listen(port, () => {
  console.log(`Jieba API running on port ${port}`);
});
