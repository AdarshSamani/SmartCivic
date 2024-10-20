const express = require('express');
const router = express.Router();
const Utility = require('../models/Utility');
const auth = require('../middleware/auth');

// Get all utilities
router.get('/', auth, async (req, res) => {
  try {
    const utilities = await Utility.find().sort('name');
    res.json(utilities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new utility (admin only)
router.post('/', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized' });
  }
  try {
    const { name } = req.body;
    const newUtility = new Utility({ name });
    const utility = await newUtility.save();
    res.json(utility);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete a utility (admin only)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized' });
  }
  try {
    const utility = await Utility.findById(req.params.id);
    if (!utility) {
      return res.status(404).json({ msg: 'Utility not found' });
    }
    await Utility.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Utility removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;