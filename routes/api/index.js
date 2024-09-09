const express = require('express');
const router = express.Router();
const geoip = require('geoip-lite');

// @route   GET api/detect-agent
// @desc    Detect agent
// @access  Public
router.get('/detect-agent', async (req, res) => {
  try {
    console.log("this is backend👌👌👌")
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

router.post('/deviceInfo', async (req, res) => {
  try {
    const ip = req.body.ip; // Assuming the IP address is sent in the request body under "ip" key
    if (!ip) {
      return res.status(400).send('IP address is required.');
    }

    const geo = await geoip.lookup(ip);
    console.log('geo ==>', geo);

    // If geo information is found, send it back in the response
    if (geo) {
      return res.json({geo:geo}); // Send the geo object as JSON
    } else {
      return res.status(404).send('Geographical information not found.');
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Server Error');
  }
});

module.exports = router;
