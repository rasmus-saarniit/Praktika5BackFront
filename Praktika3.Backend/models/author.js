'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Author extends Model {
    static associate(models) {
      Author.belongsToMany(models.Book, {
        through: 'book_author',
        foreignKey: 'author_id',
        timestamps: false, // Disable timestamps for the join table
      });
    }
  }

  Author.init(
    {
      author_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Author',
      tableName: 'authors',
      timestamps: false,
    }
  );

  return Author;
};