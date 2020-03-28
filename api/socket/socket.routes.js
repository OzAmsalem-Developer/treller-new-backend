
module.exports = connectSockets

function connectSockets(io) {
    io.on('connection', socket => {

        // Board connection
        socket.on('board topic', topic=>{
            if (socket.boardTopic) {
                socket.leave(socket.boardTopic)
            }
            socket.join(topic)
            socket.boardTopic = topic;
        })

        //Board updating
        socket.on('board boardChanged', board=>{
            socket.broadcast.to(socket.boardTopic).emit('board boardChanged', board)
        })
    })
}