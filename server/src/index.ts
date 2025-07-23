import express from "express";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

let fields: any[] = []; // 🧠 simple in-memory store for now

app.get("/fields", (req, res) => {
  res.json(fields);
});

app.post("/fields", (req, res) => {
  fields = req.body;
  res.json({ message: "Fields saved successfully" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
