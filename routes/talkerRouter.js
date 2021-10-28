const express = require('express');

const fs = require('fs').promises;

const rescue = require('express-rescue');

const router = express.Router();

const TALKER_FILE = './talker.json';

router.get('/', rescue(async (_req, res, _next) => {
    const talkersJson = await fs.readFile(TALKER_FILE);

    const talkers = await JSON.parse(talkersJson);
    
    return res.status(200).json(talkers);
}));

router.get('/:id', rescue(async (req, res, _next) => {
    const { id } = req.params;

    const talkersJson = await fs.readFile(TALKER_FILE);

    const talkers = JSON.parse(talkersJson);

    const talker = talkers.find((t) => t.id === +id);

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).json(talker);
}));

module.exports = router;