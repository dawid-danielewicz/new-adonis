import Ws from 'App/Services/Ws'

Ws.boot()

Ws.io.on('connection', (socket) => {
  socket.on('test', (data) => {
    console.log(data)
  })
})
