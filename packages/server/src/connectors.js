'use strict';
const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect('mongodb://localhost/todo');

const TodoSchema = Mongoose.Schema({
  task: String,
  Status: Number,
});

const Todo = Mongoose.model('todos', TodoSchema);

module.exports = {
  Todo
};
