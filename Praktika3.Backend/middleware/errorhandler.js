module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging

    // Handle specific error types
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({ message: 'Valideerimisviga', errors: err.errors });
    }

    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({ message: 'Võõrvõtme piirangu viga', errors: err.errors });
    }

    if (err.status === 401) {
        return res.status(401).json({ message: 'Volitamata juurdepääs' });
    }

    if (err.status === 403) {
        return res.status(403).json({ message: 'Keelatud: Teil puudub luba sellele ressursile juurdepääsuks' });
    }

    if (err.status === 404) {
        return res.status(404).json({ message: 'Ressurssi ei leitud' });
    }

    if (err.status === 429) {
        return res.status(429).json({ message: 'Liiga palju päringuid: Palun proovige hiljem uuesti' });
    }

    // Default to 500 Internal Server Error
    res.status(err.status || 500).json({
        message: err.message || 'Sisemine serveri viga',
    });
};