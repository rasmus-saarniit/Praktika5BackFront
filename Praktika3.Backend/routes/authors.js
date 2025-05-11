const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorcontroller');
const authMiddleware = require('../middleware/auth');
const rolehandler = require('../middleware/rolehandler');

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Endpoints for managing authors
 */

/**
 * @swagger
 * /authors:
 *   get:
 *     tags: [Authors]
 *     summary: Get all authors
 *     responses:
 *       200:
 *         description: List of authors
 */
router.get('/', authMiddleware, rolehandler(['Admin']), authorController.getAllAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     tags: [Authors]
 *     summary: Update an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the author to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Author updated
 *       404:
 *         description: Author not found
 */
router.put('/:id', authMiddleware, rolehandler(['Admin']), authorController.updateAuthor);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     tags: [Authors]
 *     summary: Delete an author by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the author to delete
 *     responses:
 *       200:
 *         description: Author deleted
 *       404:
 *         description: Author not found
 */
router.delete('/:id', authMiddleware, rolehandler(['Admin']), authorController.deleteAuthor);

module.exports = router;
