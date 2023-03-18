"use strict";

var notesList = document.querySelector('#notes');
var saveId = '';
var btnClose = document.querySelector('.close');
var btnModalUpdate = document.querySelector('.update');
var noteUI = function noteUI(note) {
  var div = document.createElement('div');
  console.log(note);
  div.innerHTML = "\n        <div class=\"card card-body rounded-0 mb-2 mt-2 animate__animated animate__fadeInLeftBig\">\n        <div class=\"d-flex justify-content-between\">\n            <h1 class=\"h3 card-title\">Title: ".concat(note.title, "</h1>\n            <div>\n            <button class=\"btn btn-danger delete\" data-id=\"").concat(note.id, "\">Delete</button>\n            <button class=\"btn btn-outline-success update\" data-id=\"").concat(note.id, "\">Update</button>\n\n            </div>\n        </div>\n            <p class=\"card-description\">Description: ").concat(note.description, "</p>\n        </div>\n    \n        \n        ");
  var btnDelete = div.querySelector('.delete');
  var btnUpdate = div.querySelector('.update');
  btnDelete.addEventListener('click', function () {
    deleteNote(btnDelete.dataset.id);
  });
  btnUpdate.addEventListener('click', function () {
    getNote(btnUpdate.dataset.id);
    $('#modal').modal('toggle');
  });
  btnClose.addEventListener('click', function () {
    $('#modal').modal('toggle');
  });
  return div;
};
var renderNotes = function renderNotes(notes) {
  notesList.innerHTML = "";
  notes.forEach(function (note) {
    notesList.append(noteUI(note));
  });
};
var appendNotes = function appendNotes(note) {
  notesList.append(noteUI(note));
};