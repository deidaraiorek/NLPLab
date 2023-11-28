// routes/contractRoutes.js

const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract');
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload-signed-agreement', upload.single('file'), contractController.uploadSignedAgreement);

router.get('/contract-requests', contractController.getContractRequests);

router.post('/approve-contract', contractController.approveContract);

router.post('/deny-contract', contractController.denyContract);

module.exports = router;
