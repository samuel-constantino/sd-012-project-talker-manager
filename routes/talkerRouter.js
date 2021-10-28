const express = require('express');

const fs = require('fs').promises;

const rescue = require('express-rescue');

const { tokenValid, nameValid, ageValid, talkValid } = require('../middlewares');

const router = express.Router();

const TALKER_FILE = './talker.json';

router.get('/', rescue(async (_req, res, _next) => {
    const talkersJson = await fs.readFile(TALKER_FILE);

    const talkers = await JSON.parse(talkersJson);
    
    return res.status(200).json(talkers);
}));

router.post('/', 
    rescue(tokenValid),
    rescue(nameValid),
    rescue(ageValid),
    rescue(talkValid),
    rescue(async (req, res, _next) => {
        const { name, age, talk } = req.body;

        const talkersJson = await fs.readFile(TALKER_FILE);

        const talkers = await JSON.parse(talkersJson);

        const newTalker = { id: talkers.length + 1, name, age, talk };

        const newTalkers = [...talkers, newTalker];

        await fs.writeFile(TALKER_FILE, JSON.stringify(newTalkers));
        
        return res.status(201).json(newTalker);
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