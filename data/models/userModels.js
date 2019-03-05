const db = require('../dbConfig');

module.exports = {
    add: async function(user) {
        const [id] = await db('users').insert(user);
        const users = await this.get({ id });
        return users[0];
    },
    get: function(filter) {
        return db('users').where(filter);
    }
};