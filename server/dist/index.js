"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Get all fields
app.get('/fields', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM fields ORDER BY id');
        res.json(result.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}));
// Save fields (replace all existing)
app.post('/fields', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fields = req.body;
    try {
        yield db_1.default.query('BEGIN');
        yield db_1.default.query('DELETE FROM fields');
        const insertText = `INSERT INTO fields (name, type, offset_from, offset_to, description) VALUES ($1, $2, $3, $4, $5)`;
        for (const f of fields) {
            yield db_1.default.query(insertText, [f.name, f.type, f.offsetFrom, f.offsetTo, f.description]);
        }
        yield db_1.default.query('COMMIT');
        res.json({ message: 'Fields saved' });
    }
    catch (err) {
        yield db_1.default.query('ROLLBACK');
        console.error(err);
        res.status(500).json({ error: 'Database error' });
    }
}));
const PORT = process.env.PORT || 4000;
exports.default = app;
