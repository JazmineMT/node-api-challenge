const express = require('express');
const server = express();

server.use(express.json())
const port = process.env.PORT || 5000;

const projectRouter = require('./routers/project-router')
const actionRouter = require('./routers/action-router')


server.get('/', (req,res)=>{
    res.send('Server is up and running!')
})

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)


server.listen(port, ()=>{
    console.log(`\n* Server Running on http://localhost:${port} *\n`)
})




