const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentcontroller');
const authMiddleware = require('../middleware/auth');
const rolehandler = require('../middleware/rolehandler');

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Endpoints for managing comments
 */

/**
 * @swagger
 * /comments/{id}:
 *   put:
 *     tags: [Comments]
 *     summary: Update a comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the comment to update
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
 *       200:
 *         description: Comment updated successfully
 *       404:
 *         description: Comment not found
 *       403:
 *         description: Forbidden
 */
router.put('/:id', authMiddleware, rolehandler(['Admin', 'User']), commentController.updateComment);

/**
 * @swagger
 * /comments/{id}:
 *   delete:
 *     tags: [Comments]
 *     summary: Delete a comment by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the comment to delete
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *       404:
 *         description: Comment not found
 *       403:
 *         description: Forbidden
 */
router.delete('/:id', authMiddleware, rolehandler(['Admin', 'User']), commentController.deleteComment);

module.exports = router;
