
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query() {
    const collection = await dbService.getCollection('board')
  
    try {
        const boards = await collection.find().toArray();
        return boards
    } catch (err) {
        console.log('ERROR: cannot find boards')
        throw err;
    }
}

async function getById(boardId) {
    console.log(boardId);
    
    const collection = await dbService.getCollection('board')
    try {
        const board = await collection.findOne({ "_id": ObjectId(boardId) })
        return board
    } catch (err) {
        console.log(`ERROR: cannot find board ${boardId}`)
        throw err;
    }
}

async function remove(boardId) {
    const collection = await dbService.getCollection('board')
    try {
        return await collection.deleteOne({ "_id": ObjectId(boardId) })
    } catch (err) {
        console.log(`ERROR: cannot remove board ${boardId}`)
        throw err;
    }
}

async function update(board) {
    try {
        const collection = await dbService.getCollection('board')
        board._id = ObjectId(board._id);
        board.updatedAt = Date.now()
        await collection.replaceOne({ "_id": board._id }, { $set: board })
        return board
    } catch (err) {
        console.log(`ERROR: cannot update board ${board._id}`)
        throw err;
    }
}

async function add(board) {
    const collection = await dbService.getCollection('board')
    try {
        board.createdAt = Date.now()
        await collection.insertOne(board);
        return board;
    } catch (err) {
        console.log(`ERROR: cannot insert board`)
        throw err;
    }
}
