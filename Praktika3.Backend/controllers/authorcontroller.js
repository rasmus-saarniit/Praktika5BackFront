const { Author } = require('../models');

// Get all authors
exports.getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.findAll();
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch authors' });
    }
};


// Update an author (single definition)
exports.updateAuthor = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== 'string' || !name.trim()) {
        return res.status(400).json({ message: 'Autorinimi (name) on kohustuslik ja peab olema tekst.' });
    }

    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        author.name = name;
        await author.save();
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update author' });
    }
};

// Delete an author
exports.deleteAuthor = async (req, res) => {
    const { id } = req.params;

    try {
        const author = await Author.findByPk(id);
        if (!author) {
            return res.status(404).json({ error: 'Author not found' });
        }

        await author.destroy();
        res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete author' });
    }
};