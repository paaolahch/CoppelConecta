const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const curpController = require('../controllers/curpController');

router.post('/detect', upload.single('image'), curpController.detectCURP);
router.post('/save', curpController.saveCURP);

module.exports = router;