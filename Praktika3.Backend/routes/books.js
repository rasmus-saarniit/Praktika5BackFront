const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookcontroller');
const commentController = require('../controllers/commentcontroller');
const authMiddleware = require('../middleware/auth');
const rolehandler = require('../middleware/rolehandler');

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Retrieve all books
 *     responses:
 *       200:
 *         description: A list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 */

/**
 * @swagger
 * /books:
 *   post:
 *     tags: [Books]
 *     summary: Add a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               authorIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags: [Books]
 *     summary: Retrieve a specific book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to retrieve
 *     responses:
 *       200:
 *         description: Book retrieved successfully
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags: [Books]
 *     summary: Update a specific book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               publicationYear:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *               authorIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags: [Books]
 *     summary: Delete a specific book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to delete
 *     responses:
 *       204:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */

/**
 * @swagger
 * /books/{id}/comments:
 *   post:
 *     tags: [Comments]
 *     summary: Add a comment to a specific book by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to add a comment to
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Book not found
 */

// Retrieve all books
router.get('/', authMiddleware, rolehandler(['Admin', 'User']), bookController.getAllBooks);

// Retrieve a specific book by ID
router.get('/:id', bookController.getBookById);

// Add a new book
router.post('/', authMiddleware, rolehandler(['Admin']), bookController.addBook);

// Edit a book
router.put('/:id', authMiddleware, rolehandler(['Admin']), bookController.updateBook);

// Delete a book
router.delete('/:id', authMiddleware, rolehandler(['Admin']), bookController.deleteBook);

// Add a comment to a book
router.post('/:id/comments', authMiddleware, rolehandler(['Admin', 'User']), commentController.addComment);

module.exports = router;