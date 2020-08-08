
exports.up = async function(knex) {
  await knex.schema.createTable('users', tbl=> {
      tbl.increments("id")
      .unsigned();
      tbl.text("username")
      .notNullable()
      .unique()
      tbl.text("password")
      .notNullable()
  } )
};

exports.down = async function(knex) {
	await knex.schema.dropTableIfExists('users')
}
