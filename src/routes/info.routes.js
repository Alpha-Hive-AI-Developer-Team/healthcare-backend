const express = require('express');
const multer = require('multer');
const infoController = require('../controllers/info.controller.js');
const { authenticateToken } = require('../middleware/auth.middleware.js');
const router = express.Router();

// Use memory storage so we can upload buffer directly to Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Create (accepts optional file field 'picture') - protected
router.post('/', authenticateToken, upload.single('picture'), infoController.createInfo);

// List (optionally filter by type)
router.get('/', infoController.listInfos);

// Get by id
router.get('/:id', infoController.getInfo);

// Update (accepts optional file field 'picture') - protected
router.put('/:id', authenticateToken, upload.single('picture'), infoController.updateInfo);

// Delete - protected
router.delete('/:id', authenticateToken, infoController.deleteInfo);

module.exports = router;
