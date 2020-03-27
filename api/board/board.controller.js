const boardService = require('./board.service')

async function addBoard(req, res) {
    // console.log('EEREE' , req.body);
    
     const board = await boardService.add(req.body)
     res.send(board)
}

async function getBoard(req, res) {
    console.log('BOARD ID!!!!!!!!!!!!:', req.params.id);
    
    const board = await boardService.getById(req.params.id)
    try {
        res.send(board)
    } catch {
        res.status(401).send()
    }
}
  
async function getBoards(req, res) {
    const userId = req.query.data

    const boards = await boardService.query(userId)
    try {
        res.json(boards)
    }
    catch(err) {
        console.log(err);
    }
    
}

async function deleteBoard(req, res) {
    await boardService.remove(req.params.id)
    res.end()
}

async function updateBoard(req, res) {
    const board = req.body;
    await boardService.update(board)
    try {
        res.json(board)
    }
    catch(err) {
        console.log(err);
    }
}

module.exports = {
    addBoard,
    getBoard,
    getBoards,
    deleteBoard,
    updateBoard
}