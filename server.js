const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var history = require('connect-history-api-fallback');

app.use(history({
    rewrites: [
        { from: /\*/, to: '/index.html'}
      ],
      disableDotRule: true,
      verbose: true
  }));

app.use(express.static('public'))
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard treller',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))
const port = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// const authRoutes = require('./api/auth/auth.routes')
// const userRoutes = require('./api/user/user.routes')
const boardRoutes = require('./api/board/board.routes')

const connectSockets = require('./api/socket/socket.routes')

// routes
// app.use('/api/auth', authRoutes)
// app.use('/api/user', userRoutes)
app.use('/api/board', boardRoutes)

// app.get('/board/:id', (req, res) => {
//     console.log('WTFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')
//     res.status(505).send('WRONG ADDRESS')
// })
connectSockets(io)


http.listen(port, () => console.log(`Treller REST API listening on port ${port}!`))