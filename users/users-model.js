const db = require('../data/db-config')

function find(){
    return db('users')
    .select('id', 'username')
}

module.exports = {
    find
}