import express from 'express';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

interface Field {
  name: string;
  type: 'string' | 'num';
  offsetFrom: number;
  offsetTo: number;
  description: string;
}

// In-memory mock "database"
let fields: Field[] = [];

// GET /fields
app.get('/fields', (req, res) => {
  res.json(fields);
});

// POST /fields
app.post('/fields', (req, res) => {
  fields = req.body;
  res.json({ message: 'Fields saved successfully' });
});

app.listen(port, () => {
  console.log(`Mock API server running at http://localhost:${port}`);
});
