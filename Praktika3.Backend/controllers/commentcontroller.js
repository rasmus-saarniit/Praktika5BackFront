// filepath: controllers/commentcontroller.js
const { Book, Comment, ActivityLog } = require('../models');

// Add a comment to a book
exports.addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content cannot be empty.' });
    }
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    const comment = await Comment.create({
      book_id: id,
      user_id: req.user.id,
      content,
    });
    await ActivityLog.create({
      user_id: req.user.id,
      action: 'Add Comment',
      details: `${req.user.role} (${req.user.email}) added a comment to book ID ${id}.`,
    });
    res.status(201).json({ message: 'Comment added successfully.', comment });
  } catch (error) {
    next(error);
  }
};

// Update a comment
exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Comment content cannot be empty.' });
    }
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    // Only allow the owner or admin to update
    if (req.user.role !== 'Admin' && comment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden.' });
    }
    comment.content = content;
    await comment.save();
    await ActivityLog.create({
      user_id: req.user.id,
      action: 'Update Comment',
      details: `User updated comment ID ${id}.`,
    });
    res.json({ message: 'Comment updated successfully.', comment });
  } catch (error) {
    next(error);
  }
};

// Delete a comment
exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found.' });
    }
    // Only allow the owner or admin to delete
    if (req.user.role !== 'Admin' && comment.user_id !== req.user.id) {
      return res.status(403).json({ message: 'Forbidden.' });
    }
    await comment.destroy();
    await ActivityLog.create({
      user_id: req.user.id,
      action: 'Delete Comment',
      details: `User deleted comment ID ${id}.`,
    });
    res.json({ message: 'Comment deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
