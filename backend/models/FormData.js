const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const FormDataSchema = new mongoose.Schema({
    name : String,
    email: String,
    password: String
})

FormDataSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };
  const questionSchema = new mongoose.Schema({
    Topic: String,
    Problem: String,
    Done: Boolean,
    Bookmark: Boolean,
    Notes: String,
    URL: String,
  });
  
  const topicSchema = new mongoose.Schema({
    topicName: String,
    position: Number,
    started: Boolean,
    doneQuestions: Number,
    questions: [questionSchema],
  });
  
  const TopicModel = mongoose.model('450dsaArchive', topicSchema);
  
  
  const User = mongoose.model('log_reg_form', FormDataSchema);
  
  module.exports = {User,TopicModel};
