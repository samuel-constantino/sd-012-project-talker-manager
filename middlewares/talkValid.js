const dateValid = (date) => {
    const re = /^\d{2}\/\d{2}\/\d{4}$/;
    return re.test(date);
};

const watchedAtAndRateValid = (watchedAt, rate) => {
    if (!watchedAt || watchedAt === '') return false;

    if (rate == null || rate === '') return false;

    return true;
};

const objTalkValid = (talk) => {
    if (!talk || talk === '') return false;

    if (!watchedAtAndRateValid(talk.watchedAt, talk.rate)) return false;

    return true;
};

const talkValid = (req, res, next) => {
    const { talk } = req.body;
    if (!objTalkValid(talk)) {
        return res.status(400).json({
            message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
    }
    if (!dateValid(talk.watchedAt)) {
        return res.status(400).json({
            message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
        });
    }
    if (talk.rate < 1 || talk.rate > 5) {
        return res.status(400).json({
            message: 'O campo "rate" deve ser um inteiro de 1 à 5',
        });
    }
    next();
};

module.exports = talkValid;