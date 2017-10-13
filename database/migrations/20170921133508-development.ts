import { QueryInterface, Sequelize } from 'sequelize';

export async function up(queryInterface: QueryInterface, sequelize: Sequelize) {
  /*
    Add altering commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.createTable('users', { id: Sequelize.INTEGER });
  */

  await queryInterface.renameColumn("topic", "description", "description2")
};

export async function down(queryInterface: QueryInterface, Sequelize) {
  /*
    Add reverting commands here.
    Return a promise to correctly handle asynchronicity.

    Example:
    return queryInterface.dropTable('users');
  */
  await queryInterface.renameColumn("topic", "description2", "description")
};
