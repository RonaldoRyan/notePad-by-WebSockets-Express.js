const socket = io()

// guardar notas
const saveNotes = (title, description)=>{
     // emision del evento por parte del cliente
     socket.emit('client:newNote', {
        title,
        description
    });
};
    
const deleteNote = (id) =>{
    socket.emit('client:deleteNote', id);
}

const getNote = (id) =>{
    socket.emit('client:getNote', id);
}

const updateNote = (id, titleModal, descriptionModal) => {
    socket.emit('client:updateNote', {
       id,
       titleModal,
       descriptionModal
    })
}


socket.on('server:newNote', appendNotes)
    
socket.on('server:loadNotes', renderNotes)   

socket.on('server:selectedNote', data =>{
    const titleModal = document.querySelector('#modal-title');
    const descriptionModal = document.querySelector('#modal-description');

    titleModal.value = data.title
    descriptionModal.value = data.description

    saveId = data.id
})