const { ActivityLog, User } = require('../models');

exports.getAllActivityLogs = async (req, res, next) => {
  try {
    const logs = await ActivityLog.findAll({
      include: [
        {
          model: User,
          attributes: ['user_id', 'email', 'role'],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    res.json(logs);
  } catch (error) {
    next(error);
  }
};