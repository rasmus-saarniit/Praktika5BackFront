const { Book, Author, Category, Comment, ActivityLog, User } = require('../models');



// Helper function for validation
function validateBookInput({ title, publicationYear, categoryName, authorNames }) {
  if (!title || typeof title !== 'string' || !title.trim()) {
    return 'Pealkiri (title) on kohustuslik ja peab olema tekst.';
  }
  if (!publicationYear || isNaN(Number(publicationYear)) || Number(publicationYear) < 1000 || Number(publicationYear) > new Date().getFullYear() + 1) {
    return 'Ilmumisaasta (publicationYear) peab olema korrektne aasta.';
  }
  if (!categoryName || typeof categoryName !== 'string' || !categoryName.trim()) {
    return 'Žanr (categoryName) on kohustuslik ja peab olema tekst.';
  }
  if (!Array.isArray(authorNames) || authorNames.length === 0 || authorNames.some(a => typeof a !== 'string' || !a.trim())) {
    return 'Autorid (authorNames) peavad olema mitte-tühjad stringid massiivis.';
  }
  return null;
}


exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll({
      attributes: ['book_id', 'title', 'publication_year'],
      include: [
        { model: Author, through: { attributes: [] }, attributes: ['name'] },
        { model: Category, attributes: ['name'] },
        {
          model: Comment,
          attributes: ['content', 'createdAt'],
          include: [{ model: User, attributes: ['email', 'role'] }],
        },
      ],
    });

    // // Log the action (Hetkel pole vaja)
    // await ActivityLog.create({
    //   user_id: req.user.id,
    //   action: 'View Books',
    //   details: `User viewed all books.`,
    // });

    res.json(books);
  } catch (error) {
    next(error);
  }
};

exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id, {
      include: [
        { model: Author, through: { attributes: [] } },
        { model: Category },
        {
          model: Comment,
          include: [{ model: User, attributes: ['email', 'role'] }],
          order: [['createdAt', 'DESC']],
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    res.json(book);
  } catch (error) {
    next(error);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    const { title, publicationYear, categoryName, authorNames } = req.body;
    const validationError = validateBookInput({ title, publicationYear, categoryName, authorNames });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    // Find or create category
    let category = null;
    if (categoryName) {
      category = await Category.findOne({ where: { name: categoryName } });
      if (!category) {
        category = await Category.create({ name: categoryName });
      }
    }

    const book = await Book.create({
      title,
      publication_year: publicationYear,
      category_id: category ? category.category_id : null,
    });

    // Find or create authors
    if (authorNames && authorNames.length > 0) {
      const authors = [];
      for (const name of authorNames) {
        let author = await Author.findOne({ where: { name } });
        if (!author) {
          author = await Author.create({ name });
        }
        authors.push(author);
      }
      await book.setAuthors(authors);
    }

    // Log the action with user role
    await ActivityLog.create({
      user_id: req.user.id,
      action: 'Add Book',
      details: `${req.user.role} (${req.user.email}) added book "${title}" with ID ${book.book_id}`,
    });

    res.status(201).json({ message: 'Book added successfully.', book });
  } catch (error) {
    next(error);
  }
};

exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, publicationYear, categoryName, authorNames } = req.body;
    const validationError = validateBookInput({ title, publicationYear, categoryName, authorNames });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }
    const book = await Book.findByPk(id, {
      include: [
        { model: Author, through: { attributes: [] } },
        { model: Category },
      ],
    });

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    await book.update({ title, publication_year: publicationYear });

    if (categoryName) {
      let category = await Category.findOne({ where: { name: categoryName } });
      if (!category) {
        category = await Category.create({ name: categoryName });
      }
      await book.update({ category_id: category.category_id });
    }

    if (authorNames && authorNames.length > 0) {
      const authors = [];
      for (const name of authorNames) {
        let author = await Author.findOne({ where: { name } });
        if (!author) {
          author = await Author.create({ name });
        }
        authors.push(author);
      }
      await book.setAuthors(authors);
    }

    // Log the action with user role
    await ActivityLog.create({
      user_id: req.user.id,
      action: 'Update Book',
      details: `${req.user.role} (${req.user.email}) updated book ID ${id}: title="${title}", publicationYear=${publicationYear}, category="${categoryName}", authors="${authorNames.join(', ')}"`,
    });

    res.json({ message: 'Book updated successfully.', book });
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }

    await book.destroy();

    // Log the action with user role
    await ActivityLog.create({
      user_id: req.user.id,
      action: 'Delete Book',
      details: `${req.user.role} (${req.user.email}) deleted book ID ${req.params.id}`,
    });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
