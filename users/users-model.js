const db = require('../data/db-config')

function findUsers(){
    return db('users')
    .select('id', 'username')
}
function find(){
    return db('admin')
    .select('id', 'adminUserName')
}

module.exports = {
    find,
    findUsers
}