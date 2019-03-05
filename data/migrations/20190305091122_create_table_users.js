exports.up = function(knex, Promise) {
	return knex.schema.createTable('users', function(user) {
        user.increments();
        user.string('username', 128)
            .unique()
            .notNullable();
        user.string('password')
            .notNullable();
        user.string('department', 128);
	});
};
exports.down = function(knex, Promise) {
	return knex.schema.dropTableIfExists('users');
};