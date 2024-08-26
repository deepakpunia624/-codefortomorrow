const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task', 'postgres', 'Password_123', {
  host: 'localhost',
  dialect: 'postgres',
});

// sequelize.sync()
//   .then(() => {
//     console.log('Database & tables created!');
//   })
//   .catch(err => console.error('Unable to connect to the database:', err));


module.exports = { sequelize };
