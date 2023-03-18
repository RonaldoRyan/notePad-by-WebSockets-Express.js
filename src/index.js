import express from 'express'
import {Server as WebSocketServer} from 'socket.io'
import http from 'http'
import { v4 as uuid } from 'uuid'


// se crea una aplicación express, se conecta a un servidor HTTP y luego crea un servidor WebSocket utilizando el servidor HTTP. Esto permite al servidor escuchar y enviar mensajes a través de una conexión WebSocket, brindando una comunicación en tiempo real entre el cliente y el servidor.
const app = express()
const httpServer = http.createServer(app)
const io = new WebSocketServer(httpServer)


let notes = []

// definimos las vistas
app.use(express.static(__dirname + '/public'));


//  de esta forma capturamos el evento enviado por el cliente
io.on('connection', (socket)=>{
     console.log('new conection:', socket.id)
     
    //  Emitimos un evento desde el servidor
    socket.emit('server:loadNotes', notes)
    //  captura de el evento o escuha del evento emitido por el cliente
    // guardamos la notas
    socket.on('client:newNote', newNote => {
    const note = ({...newNote, id: uuid()})
    console.log(note)
    notes.push(note)
    io.emit('server:newNote', note)
    });

    //con este socket filtramos o eliminamos una nota    
    socket.on('client:deleteNote', (noteId) =>{
       notes =  notes.filter(note => note.id !== noteId);
       console.log(notes);

       io.emit('server:loadNotes', notes);
    });

    socket.on('client:getNote', noteId =>{
     const note = notes.find(note => note.id === noteId);
     socket.emit('server:selectedNote', note);
    });



    socket.on('client:updateNote', modal => {
        console.log('modal:', modal);
        notes = notes.map(note => {
            if(note.id === modal.id && modal.titleModal !== undefined && modal.descriptionModal !== undefined){
                note.title = modal.titleModal
                note.description = modal.descriptionModal
            }
            return note
        })
        io.emit('server:loadNotes', notes);
    })
    


})




const server = httpServer.listen(3000,()=>{
    console.log('server on board port 3000')
})