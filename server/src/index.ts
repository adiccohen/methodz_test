import express from 'express';
import cors from 'cors';
import pool from './db';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

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
  const fields = req.body; // expect array of fields

  try {
    // Start transaction
    await pool.query('BEGIN');

    // Clear existing data
    await pool.query('DELETE FROM fields');

    // Insert new data
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
