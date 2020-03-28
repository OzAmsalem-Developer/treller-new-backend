
const dbService = require('../../services/db.service')
const boardService = require('../board/board.service')
const ObjectId = require('mongodb').ObjectId
const utilService = require('../../services/util.service') 

module.exports = {
    query,
    getById,
    getByEmail,
    remove,
    update,
    add
}

async function query(searchStr) {
    const collection = await dbService.getCollection('user')
    const reg = new RegExp(searchStr, 'i')
    const searchFilter = {
        username: {$regex: reg},
        email: {$regex: reg}
    }
    try {
        const users = await collection.find(searchFilter).toArray();
        users.forEach(user => delete user.password);

        return users
    } catch (err) {
        console.log('ERROR: cannot find users')
        throw err;
    }
}

async function getById(userId) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ "_id": ObjectId(userId) })
        delete user.password

        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${userId}`)
        throw err;
    }
}
async function getByEmail(email) {
    const collection = await dbService.getCollection('user')
    try {
        const user = await collection.findOne({ email })
        return user
    } catch (err) {
        console.log(`ERROR: while finding user ${email}`)
        throw err;
    }
}

async function remove(userId) {
    const collection = await dbService.getCollection('user')
    try {
        await collection.deleteOne({ "_id": ObjectId(userId) })
    } catch (err) {
        console.log(`ERROR: cannot remove user ${userId}`)
        throw err;
    }
}

async function update(user) {
    const collection = await dbService.getCollection('user')
    user._id = ObjectId(user._id);

    try {
        await collection.replaceOne({ "_id": user._id }, { $set: user })
        return user
    } catch (err) {
        console.log(`ERROR: cannot update user ${user._id}`)
        throw err;
    }
}

async function add(user) {
    user.isGuest = (user.email === 'gus@guest.com')
    const publicBoard = await boardService.getById('5e7f5cb58be18a4b647dc9d3')
    user.boards = [{
        _id: publicBoard._id,
        name: publicBoard.name,
        style: publicBoard.style
    }]
    user.imgUrl = null
    user.avatarColor = utilService.getRandomColor()

    const collection = await dbService.getCollection('user')
    try {
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}



