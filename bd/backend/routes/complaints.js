const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Create a new complaint
router.post('/', auth, upload.single('image'), async (req, res) => {
  console.log('Received complaint submission request');
  console.log('Request body:', req.body);
  console.log('File:', req.file);

  try {
    if (!req.body) {
      throw new Error('Request body is empty');
    }

    const { utility, wing, roomNo, description, phoneNumber } = req.body;

    if (!utility || !wing || !roomNo || !description || !phoneNumber) {
      throw new Error('Missing required fields');
    }

    const newComplaint = new Complaint({
      user: req.user.id,
      utility,
      wing,
      roomNo,
      description,
      phoneNumber,
      imageUrl: req.file ? `/uploads/${req.file.filename}` : null,
    });

    console.log('New complaint object:', newComplaint);

    const complaint = await newComplaint.save();
    console.log('Complaint saved successfully:', complaint);

    res.json(complaint);
  } catch (err) {
    console.error('Error in complaint submission:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server Error', details: err.message });
  }
});

// Get all complaints for a user
router.get('/', auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get complaints by status (for admin)
router.get('/status/:status', auth, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Not authorized' });
  }
  try {
    const { status } = req.params;
    if (!['pending', 'in_progress', 'solved'].includes(status)) {
      return res.status(400).json({ msg: 'Invalid status parameter' });
    }
    const complaints = await Complaint.find({ status })
      .sort({ createdAt: -1 })
      .populate('user', 'email')
      .populate('worker', 'email');
    res.json(complaints);
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
});

// Update complaint status (for admin)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'worker') {
    return res.status(403).json({ msg: 'Not authorized' });
  }
  try {
    const { status, worker } = req.body;
    const updateData = { status };
    if (worker) {
      updateData.worker = worker;
    }
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    if (!complaint) {
      return res.status(404).json({ msg: 'Complaint not found' });
    }
    res.json(complaint);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get complaint statistics for user dashboard
router.get('/stats', auth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const stats = await Complaint.aggregate([
      { $match: { user: new ObjectId(`${req.user.id}`) } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    // console.log(stats);
    const result = {
      pending: 0,
      in_progress: 0,
      solved: 0
    };
    stats.forEach(stat => {
      result[stat._id] = stat.count;
    });
    res.json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/worker', auth, async (req, res) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ msg: 'Not authorized' });
  }
  try {
    const complaints = await Complaint.find({ worker: req.user.id, status: 'in_progress' }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/worker/solved', auth, async (req, res) => {
  if (req.user.role !== 'worker') {
    return res.status(403).json({ msg: 'Not authorized' });
  }
  try {
    const complaints = await Complaint.find({ worker: req.user.id, status: 'solved' }).sort({ updatedAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;