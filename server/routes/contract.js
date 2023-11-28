const express = require('express');
const multer = require('multer');
const contractsController = require('../controllers/contract');

const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 }, // keep images size < 5 MB
});

// Defining the routes and associating them with controller functions
router.post('/upload-signed-agreement', upload.single('file'), contractsController.uploadSignedAgreement);
router.get('/contract-requests', contractsController.getContractRequests);
router.post('/approve-contract', contractsController.approveContract);
router.post('/deny-contract', contractsController.denyContract);

module.exports = router;
