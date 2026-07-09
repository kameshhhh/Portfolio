const express = require('express');
const fs = require('fs');
const path = require('path');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'portfolio.json');

function readData() {
  const raw = fs.readFileSync(DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function writeData(data) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

// Public: get full portfolio content
router.get('/', (req, res) => {
  try {
    const data = readData();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Could not load portfolio data.' });
  }
});

// Protected: replace full portfolio content
router.put('/', requireAuth, (req, res) => {
  try {
    const incoming = req.body;
    if (!incoming || typeof incoming !== 'object') {
      return res.status(400).json({ error: 'Invalid portfolio payload.' });
    }
    writeData(incoming);
    res.json({ ok: true, data: incoming });
  } catch (err) {
    res.status(500).json({ error: 'Could not save portfolio data.' });
  }
});

module.exports = router;
