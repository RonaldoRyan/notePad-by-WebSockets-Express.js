"use strict";

// capturamos los elementos del formulario

var form = document.querySelector('#noteForm');
var title = document.querySelector('#title');
var description = document.querySelector('#description');
var modal = document.querySelector('#modal');
var titleModal = document.querySelector('#modal-title');
var descriptionModal = document.querySelector('#modal-description');
var modalUpdate = document.querySelector('#modal-btn');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  saveNotes(title.value, description.value);
  title.value = '';
  description.value = '';
  title.focus();
});
modalUpdate.addEventListener('click', function (e) {
  e.preventDefault();
  if (saveId) {
    updateNote(saveId, titleModal.value, descriptionModal.value);
    $('#modal').modal('toggle');
  } else {
    saveNotes(title.value, description.value);
  }
});