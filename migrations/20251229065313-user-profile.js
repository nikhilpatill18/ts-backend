'use strict';

const { UUIDV4 } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Users_Profile', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: UUIDV4,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.UUID,
        references: {
          model: "users",
          key: 'id'
        }
      },
      underGraduation: {
        type: Sequelize.STRING,
        allowNull: false
      },
      underGraduationYear: {
        type: Sequelize.STRING,
        allowNull: false
      },
      postGraduation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      postGraduationYear: {
        type: Sequelize.STRING,
        allowNull: true
      },
      resume: {
        type: Sequelize.STRING,
        allowNull: false
      },
      previousExperiece: {
        type: Sequelize.JSON,
        allowNull: true
      },
      state: {
        type: Sequelize.UUID,
        allowNull: false
      },
      city: {
        type: Sequelize.UUID,
        allowNull: false
      },
      skills: {
        type: Sequelize.JSON,
        allowNull: false
      },
      isStudying: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Users_Profile')
  }
};
