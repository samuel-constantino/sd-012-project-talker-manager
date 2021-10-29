const express = require('express');

const fs = require('fs').promises;

const rescue = require('express-rescue');

const { tokenValid, nameValid, ageValid, talkValid } = require('../middlewares');

const router = express.Router();

const TALKER_FILE = './talker.json';

const { readJsonFile } = require('../utilities');

router.get('/', rescue(async (_req, res, _next) => {
    const talkers = await readJsonFile(TALKER_FILE);

    return res.status(200).json(talkers);
}));

router.get('/search',
    rescue(tokenValid),
    rescue(async (req, res, _next) => {
        const { q: name } = req.query;

        const talkers = await readJsonFile(TALKER_FILE);

        const targetTalkers = talkers
            .filter((t) => t.name.toLowerCase().includes(name.toLowerCase()));

        res.status(200).json(targetTalkers);
    }));

router.post('/', 
    rescue(tokenValid),
    rescue(nameValid),
    rescue(ageValid),
    rescue(talkValid),
    rescue(async (req, res, _next) => {
        const { name, age, talk } = req.body;

        const talkers = await readJsonFile(TALKER_FILE);

        const newTalker = { id: talkers.length + 1, name, age, talk };

        const newTalkers = [...talkers, newTalker];

        await fs.writeFile(TALKER_FILE, JSON.stringify(newTalkers));
        
        return res.status(201).json(newTalker);
}));

router.put('/:id',
    rescue(tokenValid),
    rescue(nameValid),
    rescue(ageValid),
    rescue(talkValid),
    rescue(async (req, res, _next) => {
        const { id } = req.params;
        const { name, age, talk } = req.body;

        const talkers = await readJsonFile(TALKER_FILE);

        const talkerIndex = talkers.findIndex((t) => t.id === +id);

        if (talkerIndex === -1) return res.status(404).json({ message: 'Page not found' });

        talkers[talkerIndex] = { ...talkers[talkerIndex], name, age, talk };

        await fs.writeFile('./talker.json', JSON.stringify(talkers));

        res.status(200).json(talkers[talkerIndex]);
    }));

router.delete('/:id',
    rescue(tokenValid),
    rescue(async (req, res, _next) => {
        const { id } = req.params;

        const talkers = await readJsonFile(TALKER_FILE);

        const newTalkers = talkers.filter((t) => t.id !== +id);

        await fs.writeFile(TALKER_FILE, JSON.stringify(newTalkers));

        res.status(200).json({ message: 'Pessoa palestrante deletada com sucesso' });
    }));

router.get('/:id', rescue(async (req, res, _next) => {
    const { id } = req.params;

    const talkers = await readJsonFile(TALKER_FILE);

    const talker = talkers.find((t) => t.id === +id);

    if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

    return res.status(200).json(talker);
}));

module.exports = router;