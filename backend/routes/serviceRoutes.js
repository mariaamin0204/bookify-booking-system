const express = require('express');
const router = express.Router();
const { getServices, createService } = require('../controllers/serviceController');
const auth = require('../middleware/authMiddleware');

// Note: Yahan pehla argument sirf '/' hoga, '/api/services' nahi
router.get('/', getServices);
router.post('/', auth, createService);

module.exports = router;