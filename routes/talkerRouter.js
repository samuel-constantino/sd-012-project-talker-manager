const express = require('express');

const fs = require('fs').promises;

const rescue = require('express-rescue');

const router = express.Router();

router.get('/', rescue(async (_res, res, _next) => {
    const talkersJson = await fs.readFile('./talker.json');

    const talkers = await JSON.parse(talkersJson);
    
    return res.status(200).json(talkers);
}));

module.exports = router;