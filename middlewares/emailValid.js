const formatEmail = (email) => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(String(email).toLowerCase());
  };

const emailValid = (req, res, next) => {
    const { email } = req.body;

    if (!email || email === '') {
        return res.status(400).json({ message: 'O campo "email" é obrigatório' });
    }

    if (!formatEmail(email)) {
        return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }

    next();
};

module.exports = emailValid;