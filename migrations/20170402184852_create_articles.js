
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('articles', (table) => {
      table.increments();
      table.string('name');
      table.integer('rating');
      table.integer('sentiment_score');
      table.integer('words');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE articles CASCADE')
  ])
};
