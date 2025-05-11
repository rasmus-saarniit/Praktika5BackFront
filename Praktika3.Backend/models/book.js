'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {
    static associate(models) {
      // Existing associations
      Book.belongsTo(models.Category, { foreignKey: 'category_id' });
      Book.belongsToMany(models.Author, {
        through: 'book_author',
        foreignKey: 'book_id',
        timestamps: false, // Disable timestamps for the join table
      });

      // New association with Comment
      Book.hasMany(models.Comment, { foreignKey: 'book_id' });
    }
  }

  Book.init(
    {
      book_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publication_year: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Book',
      tableName: 'books',
      timestamps: false,
    }
  );

  return Book;
};