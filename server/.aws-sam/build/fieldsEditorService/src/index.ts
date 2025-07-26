import express from 'express';
import cors from 'cors';
import pool from './db';
import serverless from "serverless-http";


const app = express();
app.use(cors());
app.use(express.json());

// Get all fields
app.get('/fields', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM fields ORDER BY id');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Save fields (replace all existing)
app.post('/fields', async (req, res) => {
  const fields = req.body;

  try {
    await pool.query('BEGIN');
    await pool.query('DELETE FROM fields');

    const insertText = `INSERT INTO fields (name, type, offset_from, offset_to, description) VALUES ($1, $2, $3, $4, $5)`;
    for (const f of fields) {
      await pool.query(insertText, [f.name, f.type, f.offsetFrom, f.offsetTo, f.description]);
    }

    await pool.query('COMMIT');
    res.json({ message: 'Fields saved' });
  } catch (err) {
    await pool.query('ROLLBACK');
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 4000;

export default app;