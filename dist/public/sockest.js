"use strict";

var socket = io();

// guardar notas
var saveNotes = function saveNotes(title, description) {
  // emision del evento por parte del cliente
  socket.emit('client:newNote', {
    title: title,
    description: description
  });
};
var deleteNote = function deleteNote(id) {
  socket.emit('client:deleteNote', id);
};
var getNote = function getNote(id) {
  socket.emit('client:getNote', id);
};
var updateNote = function updateNote(id, titleModal, descriptionModal) {
  socket.emit('client:updateNote', {
    id: id,
    titleModal: titleModal,
    descriptionModal: descriptionModal
  });
};
socket.on('server:newNote', appendNotes);
socket.on('server:loadNotes', renderNotes);
socket.on('server:selectedNote', function (data) {
  var titleModal = document.querySelector('#modal-title');
  var descriptionModal = document.querySelector('#modal-description');
  titleModal.value = data.title;
  descriptionModal.value = data.description;
  saveId = data.id;
});