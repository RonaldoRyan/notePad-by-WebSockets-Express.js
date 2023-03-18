"use strict";

var _express = _interopRequireDefault(require("express"));
var _socket = require("socket.io");
var _http = _interopRequireDefault(require("http"));
var _uuid = require("uuid");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
// se crea una aplicación express, se conecta a un servidor HTTP y luego crea un servidor WebSocket utilizando el servidor HTTP. Esto permite al servidor escuchar y enviar mensajes a través de una conexión WebSocket, brindando una comunicación en tiempo real entre el cliente y el servidor.
var app = (0, _express["default"])();
var httpServer = _http["default"].createServer(app);
var io = new _socket.Server(httpServer);
var notes = [];

// definimos las vistas
app.use(_express["default"]["static"](__dirname + '/public'));

//  de esta forma capturamos el evento enviado por el cliente
io.on('connection', function (socket) {
  console.log('new conection:', socket.id);

  //  Emitimos un evento desde el servidor
  socket.emit('server:loadNotes', notes);
  //  captura de el evento o escuha del evento emitido por el cliente
  // guardamos la notas
  socket.on('client:newNote', function (newNote) {
    var note = _objectSpread(_objectSpread({}, newNote), {}, {
      id: (0, _uuid.v4)()
    });
    console.log(note);
    notes.push(note);
    io.emit('server:newNote', note);
  });

  //con este socket filtramos o eliminamos una nota    
  socket.on('client:deleteNote', function (noteId) {
    notes = notes.filter(function (note) {
      return note.id !== noteId;
    });
    console.log(notes);
    io.emit('server:loadNotes', notes);
  });
  socket.on('client:getNote', function (noteId) {
    var note = notes.find(function (note) {
      return note.id === noteId;
    });
    socket.emit('server:selectedNote', note);
  });
  socket.on('client:updateNote', function (modal) {
    console.log('modal:', modal);
    notes = notes.map(function (note) {
      if (note.id === modal.id && modal.titleModal !== undefined && modal.descriptionModal !== undefined) {
        note.title = modal.titleModal;
        note.description = modal.descriptionModal;
      }
      return note;
    });
    io.emit('server:loadNotes', notes);
  });
});
var server = httpServer.listen(3000, function () {
  console.log('server on board port 3000');
});