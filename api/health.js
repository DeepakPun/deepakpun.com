const express = require('express');
const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'api-service',
    port: 3000,
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

module.exports = router;
