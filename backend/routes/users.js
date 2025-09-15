const express = require('express');
const router = express.Router();
const db = require('../database');

const validateUserPayload = (payload) => {
  const errors = [];
  if (!payload.name || payload.name.trim().length === 0) {
    errors.push('Name is required');
  }
  if (!payload.email || payload.email.trim().length === 0) {
    errors.push('Email is required');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    errors.push('Email format is invalid');
  }
  return errors;
};


router.get('/', async (req, res) => {
  const sql = 'SELECT * FROM users ORDER BY created_at DESC';
  db.all(sql,(err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ data: rows });

  });
});


router.get('/:id', (req, res) => {
  const id=req.params.id
  const sql = `SELECT * FROM users WHERE id = ?`;
  db.get(sql,[id],(err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else if (!row){
      return res.status(404).json({ error: 'User not found' });
    } 
    res.json({ data: row });
  });
});


router.post('/', (req, res) => {
  const payload = req.body;
  const errors = validateUserPayload(payload);

  if (errors.length) {
    return res.status(400).json({ error: errors.join(', ') });
  }
  const sql = 'INSERT INTO users (name, email, phone, role) VALUES (?, ?, ?, ?)';
  const params = [payload.name.trim(), payload.email.trim(), payload.phone || null, payload.role || null];
  db.run(sql, params, function (err) {
    if (err) {
      if (err.message && err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      return res.status(500).json({ error: err.message });
    }

    const createdId = this.lastID;
    const newuserquery='SELECT * FROM users WHERE id = ?'
    db.get(newuserquery, [createdId], (err2, row) => {
      if (err2) {
        return res.status(500).json({ error: err2.message });
      }
      res.status(201).json({ message: 'User created Successfully', data: row });
    });
  });
});


router.put('/:id', (req, res) => {
  const payload = req.body;

  const errors = validateUserPayload(payload);
  if (errors.length) {
    return res.status(400).json({ error: errors.join(', ') });
  }

  const sql = 'UPDATE users SET name = ?, email = ?, phone = ?, role = ? WHERE id = ?';
  const params = [payload.name.trim(), payload.email.trim(), payload.phone || null, payload.role || null, req.params.id];

  db.run(sql, params, function (err) {
    if (err) {
      if (err.message && err.message.includes('UNIQUE constraint failed')) {
        return res.status(400).json({ error: 'Email already in use' });
      }
      return res.status(500).json({ error: err.message });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    updatedusersql='SELECT * FROM users WHERE id = ?'
    db.get(updatedusersql,[req.params.id], (err2, row) => {
      if (err2){
        return res.status(500).json({ error: err2.message });
      }
      res.json({ message: 'User updated', data: row });
    });
  });
});

router.delete('/:id', (req, res) => {
  const sql = 'DELETE FROM users WHERE id = ?';
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0){
      return res.status(404).json({ error: 'User not found' });
    } 
    res.json({ message: 'User deleted' });
  });
});

module.exports = router;