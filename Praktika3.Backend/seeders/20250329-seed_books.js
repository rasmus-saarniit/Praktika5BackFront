const { faker } = require('@faker-js/faker');
const { Book, Author, Category } = require('../models'); // Import models from index.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Create example categories
    const categories = [];
    for (let i = 0; i < 5; i++) {
      const category = await Category.create({
        name: faker.commerce.department(),
      });
      categories.push(category);
    }

    // Create example authors
    const authors = [];
    for (let i = 0; i < 10; i++) {
      const author = await Author.create({
        name: faker.person.fullName(), // Updated to use faker.person
      });
      authors.push(author);
    }

    // Create example books
    for (let i = 0; i < 20; i++) {
      const book = await Book.create({
        title: faker.lorem.words(3),
        publicationYear: faker.date.past(20).getFullYear(),
        categoryId: faker.helpers.arrayElement(categories).categoryId,
      });

      // Associate random authors with the book
      const randomAuthors = faker.helpers.arrayElements(authors, faker.number.int({ min: 1, max: 3 })); // Updated to use faker.number.int
      await book.addAuthors(randomAuthors);
    }
  },

  down: async (queryInterface, Sequelize) => {
    // Remove all seeded data
    await queryInterface.bulkDelete('books', null, {});
    await queryInterface.bulkDelete('authors', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  },
};