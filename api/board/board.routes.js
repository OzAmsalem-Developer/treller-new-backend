const express = require('express')
const router = express.Router()
// const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const { getBoard, getBoards, deleteBoard, updateBoard, addBoard } = require('./board.controller')

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.post('/', addBoard)
router.get('/:id', getBoard)
router.put('/:id', updateBoard)
router.delete('/:id', deleteBoard)

module.exports = router