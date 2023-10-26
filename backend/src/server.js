require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api/gomoku', require('./routes/gomoku_routes.js'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`http server listening on port ${PORT}`);
});


// GENOMGÅNGSKOD
// const express = require('express');

// const app = express();
// app.use(express.json())

// const PORT = process.env.PORT || 3000;


// app.use(express.static('public'));

// app.use('/api/gomoku',require('./routes/gomoku_routes.js'))

// app.use((req, res)=>{
//     console.log({query: req.query})
//     console.log({body: req.body})
//     console.log({params: req.params})
//     console.log({header: req.headers})
//     res.send({status: "success at root"})
// })
// app.get('/create-game', (req, res)=>{
//     res.send({status: "success at create-game"})
// })
// app.get('/add-player', (req, res)=>{
//     res.send({status: "success at add-player"})
// })
// app.get('/play', (req, res)=>{
//     res.send({status: "success at play"})
// })

// app.listen(PORT, ()=>{
//     console.log(`Server is listening port ${PORT}`)
// });


// OG - KOD
// const express = require('express');
// const app = express();
// app.use(express.json());
// app.use('/api/gomoku', require('./routes/gomoku_routes.js'))
// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log(`http server listening on port ${PORT}`)
// });
