const express = require('express');

const rescue = require('express-rescue');

const router = express.Router();

const randomToken = require('random-token');

const { emailValid, passwordValid } = require('../middlewares');

router.post('/login',
    rescue(emailValid),
    rescue(passwordValid),
    rescue((_req, res, _next) => {
    const token = randomToken(16);

    res.status(200).json({ token });
}));

module.exports = router;