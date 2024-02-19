const express = require('express');
const router = express.Router();

// @route   GET api/detect-agent
// @desc    Detect agent
// @access  Public
router.get('/detect-agent', async (req, res) => {
  try {
    const userAgent = req.headers['user-agent'];

    // Check if the User-Agent indicates a mobile device
    if (/Mobi/i.test(userAgent)) {
      console.log('API called from a mobile device.');
      return res.json('mobile');
    } else {
      console.log('API called from a desktop device.');
      return res.json('web');
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
