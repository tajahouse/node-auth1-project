
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Lalah', password: 'daughter1'},
        {username: 'Jade', password: 'daughter2'},
        {username: 'Amina', password: 'daughter3'}
      ]);
    });
};
